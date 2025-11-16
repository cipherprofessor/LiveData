/**
 * Dispute Resolution Service
 * Handles user disputes with AI-powered analysis and human mediation
 */

import { prisma } from '../config/database';
import { DisputeCategory, DisputeStatus } from '@prisma/client';
import logger from '../utils/logger';
import notificationService from './notification.service';

export class DisputeService {
  /**
   * Create a new dispute
   */
  async createDispute(data: {
    swapId: string;
    reporterId: string;
    reportedUserId: string;
    category: DisputeCategory;
    description: string;
    evidence?: any;
  }): Promise<any> {
    try {
      // Check if swap exists
      const swap = await prisma.swap.findUnique({
        where: { swapId: data.swapId },
        include: {
          initiator: true,
          receiver: true,
        },
      });

      if (!swap) {
        throw new Error('Swap not found');
      }

      // Create dispute
      const dispute = await prisma.dispute.create({
        data: {
          ...data,
          status: DisputeStatus.OPEN,
        },
      });

      logger.info(`Dispute created: ${dispute.disputeId} for swap ${data.swapId}`);

      // Trigger AI analysis
      await this.analyzeDisputeWithAI(dispute.disputeId);

      // Notify both parties
      await notificationService.createNotification({
        userId: data.reportedUserId,
        type: 'SYSTEM',
        title: 'Dispute Filed',
        message: `A dispute has been filed regarding swap #${swap.swapId}. Our team will review it shortly.`,
        data: { disputeId: dispute.disputeId },
      });

      return dispute;
    } catch (error) {
      logger.error('Error creating dispute:', error);
      throw new Error('Failed to create dispute');
    }
  }

  /**
   * AI-Powered Dispute Analysis
   * Analyzes swap data, chat history, session duration to make a recommendation
   */
  async analyzeDisputeWithAI(disputeId: string): Promise<any> {
    try {
      const dispute = await prisma.dispute.findUnique({
        where: { disputeId },
        include: {
          swapId: true,
        },
      });

      if (!dispute) {
        throw new Error('Dispute not found');
      }

      // Get swap details
      const swap = await prisma.swap.findUnique({
        where: { swapId: dispute.swapId },
        include: {
          sessions: true,
        },
      });

      if (!swap) {
        throw new Error('Swap not found');
      }

      // Analyze different aspects
      const analysis = {
        category: dispute.category,
        swapCompleted: swap.status === 'COMPLETED',
        sessionCount: swap.sessions.length,
        totalDuration: swap.sessions.reduce((sum, s) => sum + (s.duration || 0), 0),
        scheduledDuration: swap.duration || 0,
      };

      // AI Decision Logic
      let recommendation: any = {
        decision: 'REQUIRE_HUMAN_REVIEW',
        confidence: 50,
        reasoning: 'Insufficient data for automated resolution',
        suggestedAction: 'MEDIATION',
        refundAmount: 0,
      };

      // Clear-cut cases for auto-resolution
      if (dispute.category === 'NO_SHOW' && swap.sessions.length === 0) {
        recommendation = {
          decision: 'REFUND_REPORTER',
          confidence: 95,
          reasoning: 'No session was conducted, clear no-show case',
          suggestedAction: 'REFUND',
          refundAmount: 100, // Full coin refund
        };
      } else if (
        dispute.category === 'POOR_QUALITY' &&
        analysis.totalDuration < analysis.scheduledDuration * 0.5
      ) {
        recommendation = {
          decision: 'PARTIAL_REFUND',
          confidence: 80,
          reasoning: 'Session was significantly shorter than scheduled',
          suggestedAction: 'PARTIAL_REFUND',
          refundAmount: 50,
        };
      }

      // Update dispute with AI recommendation
      const updated = await prisma.dispute.update({
        where: { disputeId },
        data: {
          aiRecommendation: recommendation,
          aiConfidence: recommendation.confidence,
          status:
            recommendation.confidence >= 90
              ? DisputeStatus.AI_RESOLVED
              : DisputeStatus.UNDER_REVIEW,
        },
      });

      // If high confidence, auto-resolve
      if (recommendation.confidence >= 90) {
        await this.resolveDispute(disputeId, 'SYSTEM', recommendation.decision);
      }

      logger.info(`AI analysis completed for dispute ${disputeId}`);

      return updated;
    } catch (error) {
      logger.error('Error analyzing dispute with AI:', error);
      throw new Error('Failed to analyze dispute');
    }
  }

  /**
   * Resolve dispute (by moderator or system)
   */
  async resolveDispute(
    disputeId: string,
    resolvedBy: string,
    resolution: string
  ): Promise<any> {
    try {
      const dispute = await prisma.dispute.findUnique({
        where: { disputeId },
      });

      if (!dispute) {
        throw new Error('Dispute not found');
      }

      // Process refund if applicable
      let coinsRefunded = 0;
      if (resolution.includes('REFUND')) {
        const refundAmount =
          (dispute.aiRecommendation as any)?.refundAmount || 100;
        coinsRefunded = refundAmount;

        // Refund coins to reporter
        await prisma.user.update({
          where: { userId: dispute.reporterId },
          data: {
            coins: {
              increment: refundAmount,
            },
          },
        });

        // Create coin transaction
        await prisma.coinTransaction.create({
          data: {
            userId: dispute.reporterId,
            amount: refundAmount,
            transactionType: 'REFUND',
            description: `Refund for dispute #${disputeId}`,
            balanceBefore: 0, // TODO: Get actual balance
            balanceAfter: refundAmount,
            metadata: { disputeId },
          },
        });
      }

      // Update dispute
      const updated = await prisma.dispute.update({
        where: { disputeId },
        data: {
          status: DisputeStatus.RESOLVED,
          resolution,
          resolvedBy,
          resolvedAt: new Date(),
          coinsRefunded,
        },
      });

      // Notify both parties
      await notificationService.createNotification({
        userId: dispute.reporterId,
        type: 'SYSTEM',
        title: 'Dispute Resolved',
        message: `Your dispute #${disputeId} has been resolved. ${
          coinsRefunded > 0 ? `${coinsRefunded} coins have been refunded.` : ''
        }`,
        data: { disputeId },
      });

      await notificationService.createNotification({
        userId: dispute.reportedUserId,
        type: 'SYSTEM',
        title: 'Dispute Resolved',
        message: `A dispute filed against you has been resolved.`,
        data: { disputeId },
      });

      logger.info(`Dispute resolved: ${disputeId} by ${resolvedBy}`);

      return updated;
    } catch (error) {
      logger.error('Error resolving dispute:', error);
      throw new Error('Failed to resolve dispute');
    }
  }

  /**
   * Escalate dispute to human mediation
   */
  async escalateToMediation(disputeId: string): Promise<any> {
    try {
      const updated = await prisma.dispute.update({
        where: { disputeId },
        data: {
          status: DisputeStatus.HUMAN_MEDIATION,
        },
      });

      logger.info(`Dispute escalated to mediation: ${disputeId}`);

      return updated;
    } catch (error) {
      logger.error('Error escalating dispute:', error);
      throw new Error('Failed to escalate dispute');
    }
  }

  /**
   * File an appeal
   */
  async fileAppeal(disputeId: string, userId: string, reason: string): Promise<any> {
    try {
      const dispute = await prisma.dispute.findUnique({
        where: { disputeId },
      });

      if (!dispute) {
        throw new Error('Dispute not found');
      }

      if (dispute.status !== DisputeStatus.RESOLVED) {
        throw new Error('Can only appeal resolved disputes');
      }

      // Check if user is involved in the dispute
      if (
        userId !== dispute.reporterId &&
        userId !== dispute.reportedUserId
      ) {
        throw new Error('You are not involved in this dispute');
      }

      const updated = await prisma.dispute.update({
        where: { disputeId },
        data: {
          status: DisputeStatus.APPEALED,
          appealedAt: new Date(),
          appealReason: reason,
        },
      });

      logger.info(`Appeal filed for dispute ${disputeId} by user ${userId}`);

      return updated;
    } catch (error) {
      logger.error('Error filing appeal:', error);
      throw error;
    }
  }

  /**
   * Get dispute details
   */
  async getDispute(disputeId: string): Promise<any> {
    try {
      const dispute = await prisma.dispute.findUnique({
        where: { disputeId },
      });

      return dispute;
    } catch (error) {
      logger.error('Error fetching dispute:', error);
      throw new Error('Failed to fetch dispute');
    }
  }

  /**
   * Get user's disputes
   */
  async getUserDisputes(userId: string): Promise<any[]> {
    try {
      const disputes = await prisma.dispute.findMany({
        where: {
          OR: [{ reporterId: userId }, { reportedUserId: userId }],
        },
        orderBy: { createdAt: 'desc' },
      });

      return disputes;
    } catch (error) {
      logger.error('Error fetching user disputes:', error);
      throw new Error('Failed to fetch disputes');
    }
  }

  /**
   * Get pending disputes (for moderators)
   */
  async getPendingDisputes(): Promise<any[]> {
    try {
      const disputes = await prisma.dispute.findMany({
        where: {
          status: {
            in: [
              DisputeStatus.UNDER_REVIEW,
              DisputeStatus.HUMAN_MEDIATION,
              DisputeStatus.APPEALED,
            ],
          },
        },
        orderBy: { createdAt: 'asc' },
      });

      return disputes;
    } catch (error) {
      logger.error('Error fetching pending disputes:', error);
      throw new Error('Failed to fetch pending disputes');
    }
  }
}

export default new DisputeService();

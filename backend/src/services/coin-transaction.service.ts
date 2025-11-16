/**
 * SkillCoin Transaction Service
 * Handles coin purchases, spending, earning, and transaction history
 */

import { prisma } from '../config/database';
import { CoinTransactionType } from '@prisma/client';
import logger from '../utils/logger';
import razorpayService from './razorpay.service';

export class CoinTransactionService {
  // Coin pricing (in INR)
  private readonly COIN_PACKAGES = [
    { coins: 100, price: 100, discount: 0 },
    { coins: 500, price: 450, discount: 10 },
    { coins: 1000, price: 800, discount: 20 },
    { coins: 5000, price: 3500, discount: 30 },
  ];

  /**
   * Get available coin packages
   */
  getCoinPackages(): any[] {
    return this.COIN_PACKAGES;
  }

  /**
   * Purchase coins with Razorpay
   */
  async purchaseCoins(userId: string, packageIndex: number): Promise<any> {
    try {
      const coinPackage = this.COIN_PACKAGES[packageIndex];

      if (!coinPackage) {
        throw new Error('Invalid package selected');
      }

      // Create Razorpay order
      const razorpayOrder = await razorpayService.createOrder({
        amount: coinPackage.price * 100, // Convert to paise
        currency: 'INR',
        receipt: `coins_${userId}_${Date.now()}`,
        notes: {
          userId,
          coins: coinPackage.coins,
          type: 'COIN_PURCHASE',
        },
      });

      logger.info(
        `Coin purchase initiated for user ${userId}: ${coinPackage.coins} coins`
      );

      return {
        razorpayOrder,
        coinPackage,
      };
    } catch (error) {
      logger.error('Error purchasing coins:', error);
      throw new Error('Failed to purchase coins');
    }
  }

  /**
   * Confirm coin purchase after payment
   */
  async confirmCoinPurchase(
    userId: string,
    razorpayPaymentId: string,
    razorpayOrderId: string,
    coinsAmount: number
  ): Promise<any> {
    try {
      // Verify payment
      const isValid = await razorpayService.verifyPayment(
        razorpayOrderId,
        razorpayPaymentId
      );

      if (!isValid) {
        throw new Error('Payment verification failed');
      }

      // Get user's current balance
      const user = await prisma.user.findUnique({
        where: { userId },
        select: { coins: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const balanceBefore = user.coins;
      const balanceAfter = balanceBefore + coinsAmount;

      // Update user's coin balance
      await prisma.user.update({
        where: { userId },
        data: {
          coins: balanceAfter,
        },
      });

      // Create transaction record
      const transaction = await prisma.coinTransaction.create({
        data: {
          userId,
          amount: coinsAmount,
          transactionType: CoinTransactionType.PURCHASE,
          description: `Purchased ${coinsAmount} SkillCoins`,
          balanceBefore,
          balanceAfter,
          razorpayPaymentId,
        },
      });

      logger.info(
        `Coin purchase confirmed for user ${userId}: ${coinsAmount} coins`
      );

      return {
        transaction,
        newBalance: balanceAfter,
      };
    } catch (error) {
      logger.error('Error confirming coin purchase:', error);
      throw error;
    }
  }

  /**
   * Spend coins (for boosts, priority matching, etc.)
   */
  async spendCoins(
    userId: string,
    amount: number,
    description: string,
    metadata?: any
  ): Promise<any> {
    try {
      // Get user's current balance
      const user = await prisma.user.findUnique({
        where: { userId },
        select: { coins: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (user.coins < amount) {
        throw new Error('Insufficient coins');
      }

      const balanceBefore = user.coins;
      const balanceAfter = balanceBefore - amount;

      // Update user's coin balance
      await prisma.user.update({
        where: { userId },
        data: {
          coins: balanceAfter,
        },
      });

      // Create transaction record
      const transaction = await prisma.coinTransaction.create({
        data: {
          userId,
          amount: -amount, // Negative for spending
          transactionType: CoinTransactionType.SPENT,
          description,
          balanceBefore,
          balanceAfter,
          metadata,
        },
      });

      logger.info(`User ${userId} spent ${amount} coins: ${description}`);

      return {
        transaction,
        newBalance: balanceAfter,
      };
    } catch (error) {
      logger.error('Error spending coins:', error);
      throw error;
    }
  }

  /**
   * Award coins (for completing swaps, referrals, etc.)
   */
  async awardCoins(
    userId: string,
    amount: number,
    description: string,
    metadata?: any
  ): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: { userId },
        select: { coins: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const balanceBefore = user.coins;
      const balanceAfter = balanceBefore + amount;

      // Update user's coin balance
      await prisma.user.update({
        where: { userId },
        data: {
          coins: balanceAfter,
        },
      });

      // Create transaction record
      const transaction = await prisma.coinTransaction.create({
        data: {
          userId,
          amount,
          transactionType: CoinTransactionType.EARNED,
          description,
          balanceBefore,
          balanceAfter,
          metadata,
        },
      });

      logger.info(`User ${userId} earned ${amount} coins: ${description}`);

      return {
        transaction,
        newBalance: balanceAfter,
      };
    } catch (error) {
      logger.error('Error awarding coins:', error);
      throw error;
    }
  }

  /**
   * Refund coins
   */
  async refundCoins(
    userId: string,
    amount: number,
    description: string,
    metadata?: any
  ): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: { userId },
        select: { coins: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const balanceBefore = user.coins;
      const balanceAfter = balanceBefore + amount;

      // Update user's coin balance
      await prisma.user.update({
        where: { userId },
        data: {
          coins: balanceAfter,
        },
      });

      // Create transaction record
      const transaction = await prisma.coinTransaction.create({
        data: {
          userId,
          amount,
          transactionType: CoinTransactionType.REFUND,
          description,
          balanceBefore,
          balanceAfter,
          metadata,
        },
      });

      logger.info(`User ${userId} refunded ${amount} coins: ${description}`);

      return {
        transaction,
        newBalance: balanceAfter,
      };
    } catch (error) {
      logger.error('Error refunding coins:', error);
      throw error;
    }
  }

  /**
   * Get user's coin balance
   */
  async getCoinBalance(userId: string): Promise<number> {
    try {
      const user = await prisma.user.findUnique({
        where: { userId },
        select: { coins: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user.coins;
    } catch (error) {
      logger.error('Error fetching coin balance:', error);
      throw new Error('Failed to fetch balance');
    }
  }

  /**
   * Get user's transaction history
   */
  async getTransactionHistory(
    userId: string,
    filters?: {
      type?: CoinTransactionType;
      limit?: number;
      offset?: number;
    }
  ): Promise<any[]> {
    try {
      const where: any = { userId };

      if (filters?.type) {
        where.transactionType = filters.type;
      }

      const transactions = await prisma.coinTransaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: filters?.limit || 50,
        skip: filters?.offset || 0,
      });

      return transactions;
    } catch (error) {
      logger.error('Error fetching transaction history:', error);
      throw new Error('Failed to fetch transaction history');
    }
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(transactionId: string): Promise<any> {
    try {
      const transaction = await prisma.coinTransaction.findUnique({
        where: { transactionId },
      });

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      return transaction;
    } catch (error) {
      logger.error('Error fetching transaction:', error);
      throw new Error('Failed to fetch transaction');
    }
  }

  /**
   * Coin usage features (from roadmap)
   */
  async useCoinsForFeature(
    userId: string,
    feature: 'BOOST_PROFILE' | 'PRIORITY_MATCHING' | 'UNLOCK_TEST' | 'SKIP_COOLDOWN'
  ): Promise<any> {
    try {
      const featureCosts: Record<string, { coins: number; description: string }> = {
        BOOST_PROFILE: { coins: 500, description: 'Profile boost for 24 hours' },
        PRIORITY_MATCHING: { coins: 300, description: 'Priority matching for 1 month' },
        UNLOCK_TEST: { coins: 200, description: 'Unlock skill test' },
        SKIP_COOLDOWN: { coins: 100, description: 'Skip swap cooldown' },
      };

      const cost = featureCosts[feature];

      if (!cost) {
        throw new Error('Invalid feature');
      }

      // Spend coins
      const result = await this.spendCoins(userId, cost.coins, cost.description, {
        feature,
      });

      // TODO: Activate the feature
      // This would involve updating user settings, creating boost records, etc.

      logger.info(`User ${userId} activated feature: ${feature}`);

      return result;
    } catch (error) {
      logger.error('Error using coins for feature:', error);
      throw error;
    }
  }
}

export default new CoinTransactionService();

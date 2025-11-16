/**
 * Verification Service
 * Handles Aadhaar verification, video selfie verification, and skill verification
 */

import { prisma } from '../config/database';
import { VerificationStatus, VerificationType } from '@prisma/client';
import logger from '../utils/logger';

export class VerificationService {
  /**
   * Initiate Aadhaar Verification
   * Integrates with third-party Aadhaar verification providers (Surepass, IDfy)
   */
  async initiateAadhaarVerification(userId: string, aadhaarNumber: string): Promise<any> {
    try {
      // Store only last 4 digits for security
      const aadhaarLastFour = aadhaarNumber.slice(-4);

      // TODO: Integrate with actual Aadhaar API (Surepass/IDfy)
      // For now, create a pending verification request
      const requestId = `REQ_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      const verification = await prisma.aadhaarVerification.create({
        data: {
          userId,
          aadhaarLastFour,
          requestId,
          status: VerificationStatus.PENDING,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      });

      logger.info(`Aadhaar verification initiated for user ${userId}`);

      // In production, call the actual API:
      // const apiResponse = await this.callAadhaarAPI(aadhaarNumber);
      // return this.processAadhaarResponse(userId, apiResponse);

      return {
        success: true,
        verificationId: verification.verificationId,
        requestId: verification.requestId,
        status: verification.status,
        message: 'Aadhaar verification initiated. You will receive a confirmation shortly.',
      };
    } catch (error) {
      logger.error('Error initiating Aadhaar verification:', error);
      throw new Error('Failed to initiate Aadhaar verification');
    }
  }

  /**
   * Verify Aadhaar OTP (callback from Aadhaar API)
   */
  async verifyAadhaarOTP(userId: string, otp: string, requestId: string): Promise<any> {
    try {
      const verification = await prisma.aadhaarVerification.findFirst({
        where: { userId, requestId },
      });

      if (!verification) {
        throw new Error('Verification request not found');
      }

      // TODO: Call Aadhaar API to verify OTP
      // const apiResponse = await this.verifyAadhaarOTPAPI(requestId, otp);

      // For demo purposes, simulate verification
      const updated = await prisma.aadhaarVerification.update({
        where: { verificationId: verification.verificationId },
        data: {
          status: VerificationStatus.VERIFIED,
          verifiedAt: new Date(),
          name: 'Demo User', // From Aadhaar API response
          address: {
            street: 'Demo Street',
            city: 'Demo City',
            state: 'Demo State',
            pincode: '123456',
          },
        },
      });

      logger.info(`Aadhaar verified successfully for user ${userId}`);

      return {
        success: true,
        status: updated.status,
        message: 'Aadhaar verification successful',
      };
    } catch (error) {
      logger.error('Error verifying Aadhaar OTP:', error);
      throw new Error('Failed to verify Aadhaar OTP');
    }
  }

  /**
   * Get Aadhaar Verification Status
   */
  async getAadhaarVerificationStatus(userId: string): Promise<any> {
    try {
      const verification = await prisma.aadhaarVerification.findUnique({
        where: { userId },
        select: {
          verificationId: true,
          status: true,
          verifiedAt: true,
          expiresAt: true,
          failureReason: true,
        },
      });

      return verification;
    } catch (error) {
      logger.error('Error fetching Aadhaar verification status:', error);
      throw new Error('Failed to fetch verification status');
    }
  }

  /**
   * Initiate Video Selfie Verification
   * User uploads video saying their name + "I am joining SkillSwap India"
   */
  async initiateVideoSelfieVerification(
    userId: string,
    videoUrl: string,
    thumbnailUrl?: string
  ): Promise<any> {
    try {
      // Create verification record
      const verification = await prisma.videoSelfieVerification.create({
        data: {
          userId,
          videoUrl,
          thumbnailUrl,
          status: VerificationStatus.PENDING,
        },
      });

      logger.info(`Video selfie verification initiated for user ${userId}`);

      // TODO: Queue job for AI face comparison
      // await this.queueFaceVerificationJob(userId, videoUrl);

      return {
        success: true,
        verificationId: verification.verificationId,
        status: verification.status,
        message: 'Video selfie uploaded. Verification in progress.',
      };
    } catch (error) {
      logger.error('Error initiating video selfie verification:', error);
      throw new Error('Failed to initiate video selfie verification');
    }
  }

  /**
   * Process Video Face Verification (AWS Rekognition / Azure Face API)
   */
  async processVideoFaceVerification(verificationId: string): Promise<any> {
    try {
      const verification = await prisma.videoSelfieVerification.findUnique({
        where: { verificationId },
      });

      if (!verification) {
        throw new Error('Verification not found');
      }

      // TODO: Integrate with AWS Rekognition or Azure Face API
      // 1. Extract frame from video
      // 2. Compare with profile photo
      // 3. Get confidence score

      // For demo, simulate verification
      const faceMatchScore = 95.5; // 0-100 confidence

      const updated = await prisma.videoSelfieVerification.update({
        where: { verificationId },
        data: {
          faceMatchScore,
          status:
            faceMatchScore >= 85
              ? VerificationStatus.VERIFIED
              : VerificationStatus.FAILED,
          verifiedAt: faceMatchScore >= 85 ? new Date() : undefined,
          failureReason:
            faceMatchScore < 85 ? 'Face match confidence too low' : undefined,
        },
      });

      logger.info(`Video face verification processed: ${updated.status}`);

      return updated;
    } catch (error) {
      logger.error('Error processing video face verification:', error);
      throw new Error('Failed to process video verification');
    }
  }

  /**
   * Create Skill Verification
   */
  async createSkillVerification(data: {
    userSkillId: string;
    verificationType: VerificationType;
    verificationProof?: any;
    verifiedBy?: string;
  }): Promise<any> {
    try {
      const verification = await prisma.skillVerification.create({
        data: {
          ...data,
          verificationStatus: VerificationStatus.PENDING,
          verificationDate: new Date(),
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        },
      });

      logger.info(`Skill verification created: ${verification.verificationId}`);

      return verification;
    } catch (error) {
      logger.error('Error creating skill verification:', error);
      throw new Error('Failed to create skill verification');
    }
  }

  /**
   * Endorse a skill (peer endorsement)
   */
  async endorseSkill(data: {
    endorserId: string;
    userSkillId: string;
    endorsementStrength: number;
    relationship: string;
    endorsementText?: string;
  }): Promise<any> {
    try {
      // Check if endorsement already exists
      const existing = await prisma.skillEndorsement.findUnique({
        where: {
          endorserId_userSkillId: {
            endorserId: data.endorserId,
            userSkillId: data.userSkillId,
          },
        },
      });

      if (existing) {
        throw new Error('You have already endorsed this skill');
      }

      const endorsement = await prisma.skillEndorsement.create({
        data: {
          ...data,
          isVerified: true, // Can add graph analysis to detect fake rings
        },
      });

      logger.info(`Skill endorsed: ${endorsement.endorsementId}`);

      return endorsement;
    } catch (error) {
      logger.error('Error endorsing skill:', error);
      throw error;
    }
  }

  /**
   * Get all endorsements for a user skill
   */
  async getSkillEndorsements(userSkillId: string): Promise<any[]> {
    try {
      const endorsements = await prisma.skillEndorsement.findMany({
        where: { userSkillId },
        orderBy: { createdAt: 'desc' },
      });

      return endorsements;
    } catch (error) {
      logger.error('Error fetching skill endorsements:', error);
      throw new Error('Failed to fetch endorsements');
    }
  }

  /**
   * Get verification badge status for user
   */
  async getUserVerificationStatus(userId: string): Promise<any> {
    try {
      const [aadhaar, videoSelfie] = await Promise.all([
        prisma.aadhaarVerification.findUnique({ where: { userId } }),
        prisma.videoSelfieVerification.findFirst({
          where: { userId, status: VerificationStatus.VERIFIED },
          orderBy: { createdAt: 'desc' },
        }),
      ]);

      return {
        aadhaarVerified: aadhaar?.status === VerificationStatus.VERIFIED,
        videoSelfieVerified: videoSelfie !== null,
        verificationLevel:
          aadhaar?.status === VerificationStatus.VERIFIED && videoSelfie
            ? 'FULLY_VERIFIED'
            : aadhaar?.status === VerificationStatus.VERIFIED
            ? 'AADHAAR_VERIFIED'
            : videoSelfie
            ? 'SELFIE_VERIFIED'
            : 'UNVERIFIED',
      };
    } catch (error) {
      logger.error('Error fetching user verification status:', error);
      throw new Error('Failed to fetch verification status');
    }
  }
}

export default new VerificationService();

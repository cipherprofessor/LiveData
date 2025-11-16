/**
 * Premium Skills Marketplace Service
 * Users can offer skills for money (₹200-1,000/hour)
 * Platform takes 20% commission
 */

import { prisma } from '../config/database';
import { BookingStatus } from '@prisma/client';
import logger from '../utils/logger';
import notificationService from './notification.service';
import razorpayService from './razorpay.service';

export class PremiumSkillService {
  /**
   * Create a premium skill listing
   */
  async createPremiumSkill(data: {
    userId: string;
    skillId: string;
    hourlyRate: number;
    minDuration: number;
    maxDuration: number;
    availability: any;
    description?: string;
  }): Promise<any> {
    try {
      // Validate hourly rate
      if (data.hourlyRate < 200 || data.hourlyRate > 10000) {
        throw new Error('Hourly rate must be between ₹200 and ₹10,000');
      }

      const premiumSkill = await prisma.premiumSkill.create({
        data: {
          ...data,
          isActive: true,
        },
      });

      logger.info(`Premium skill created: ${premiumSkill.premiumSkillId}`);

      return premiumSkill;
    } catch (error) {
      logger.error('Error creating premium skill:', error);
      throw error;
    }
  }

  /**
   * Get premium skill by ID
   */
  async getPremiumSkill(premiumSkillId: string): Promise<any> {
    try {
      const premiumSkill = await prisma.premiumSkill.findUnique({
        where: { premiumSkillId },
      });

      if (!premiumSkill) {
        throw new Error('Premium skill not found');
      }

      return premiumSkill;
    } catch (error) {
      logger.error('Error fetching premium skill:', error);
      throw new Error('Failed to fetch premium skill');
    }
  }

  /**
   * Search premium skills
   */
  async searchPremiumSkills(filters: {
    skillId?: string;
    minRate?: number;
    maxRate?: number;
    sortBy?: 'rating' | 'price' | 'earnings';
    limit?: number;
  }): Promise<any[]> {
    try {
      const where: any = { isActive: true };

      if (filters.skillId) {
        where.skillId = filters.skillId;
      }

      if (filters.minRate || filters.maxRate) {
        where.hourlyRate = {};
        if (filters.minRate) where.hourlyRate.gte = filters.minRate;
        if (filters.maxRate) where.hourlyRate.lte = filters.maxRate;
      }

      const orderBy: any = {};
      if (filters.sortBy === 'rating') {
        orderBy.rating = 'desc';
      } else if (filters.sortBy === 'price') {
        orderBy.hourlyRate = 'asc';
      } else if (filters.sortBy === 'earnings') {
        orderBy.totalEarnings = 'desc';
      }

      const premiumSkills = await prisma.premiumSkill.findMany({
        where,
        orderBy,
        take: filters.limit || 20,
      });

      return premiumSkills;
    } catch (error) {
      logger.error('Error searching premium skills:', error);
      throw new Error('Failed to search premium skills');
    }
  }

  /**
   * Create a premium booking
   */
  async createBooking(data: {
    studentId: string;
    premiumSkillId: string;
    scheduledAt: Date;
    duration: number; // in minutes
  }): Promise<any> {
    try {
      const premiumSkill = await prisma.premiumSkill.findUnique({
        where: { premiumSkillId: data.premiumSkillId },
      });

      if (!premiumSkill) {
        throw new Error('Premium skill not found');
      }

      if (!premiumSkill.isActive) {
        throw new Error('This premium skill is no longer available');
      }

      // Calculate amounts
      const hourlyRate = premiumSkill.hourlyRate;
      const hours = data.duration / 60;
      const amount = hourlyRate * hours;
      const platformFee = amount * 0.2; // 20% commission
      const teacherEarnings = amount * 0.8; // 80% to teacher

      // Create Razorpay order
      const razorpayOrder = await razorpayService.createOrder({
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        receipt: `booking_${Date.now()}`,
        notes: {
          premiumSkillId: data.premiumSkillId,
          studentId: data.studentId,
          duration: data.duration,
        },
      });

      // Create booking
      const booking = await prisma.premiumBooking.create({
        data: {
          studentId: data.studentId,
          premiumSkillId: data.premiumSkillId,
          scheduledAt: data.scheduledAt,
          duration: data.duration,
          amount,
          platformFee,
          teacherEarnings,
          status: BookingStatus.PENDING,
          razorpayOrderId: razorpayOrder.id,
        },
      });

      logger.info(`Premium booking created: ${booking.bookingId}`);

      return {
        booking,
        razorpayOrder,
      };
    } catch (error) {
      logger.error('Error creating booking:', error);
      throw error;
    }
  }

  /**
   * Confirm booking after payment
   */
  async confirmBooking(
    bookingId: string,
    razorpayPaymentId: string
  ): Promise<any> {
    try {
      const booking = await prisma.premiumBooking.findUnique({
        where: { bookingId },
        include: {
          premiumSkill: true,
        },
      });

      if (!booking) {
        throw new Error('Booking not found');
      }

      // Verify payment with Razorpay
      const isValid = await razorpayService.verifyPayment(
        booking.razorpayOrderId!,
        razorpayPaymentId
      );

      if (!isValid) {
        throw new Error('Payment verification failed');
      }

      // Update booking
      const updated = await prisma.premiumBooking.update({
        where: { bookingId },
        data: {
          status: BookingStatus.CONFIRMED,
          razorpayPaymentId,
        },
      });

      // Update premium skill stats
      await prisma.premiumSkill.update({
        where: { premiumSkillId: booking.premiumSkillId },
        data: {
          totalBookings: {
            increment: 1,
          },
        },
      });

      // Notify teacher
      await notificationService.createNotification({
        userId: booking.premiumSkill.userId,
        type: 'SYSTEM',
        title: 'New Premium Booking',
        message: `You have a new booking for ${booking.duration} minutes. Check your dashboard for details.`,
        data: { bookingId },
      });

      logger.info(`Premium booking confirmed: ${bookingId}`);

      return updated;
    } catch (error) {
      logger.error('Error confirming booking:', error);
      throw error;
    }
  }

  /**
   * Complete booking and transfer earnings
   */
  async completeBooking(bookingId: string): Promise<any> {
    try {
      const booking = await prisma.premiumBooking.findUnique({
        where: { bookingId },
        include: {
          premiumSkill: true,
        },
      });

      if (!booking) {
        throw new Error('Booking not found');
      }

      if (booking.status !== BookingStatus.CONFIRMED) {
        throw new Error('Booking must be confirmed first');
      }

      // Update booking
      const updated = await prisma.premiumBooking.update({
        where: { bookingId },
        data: {
          status: BookingStatus.COMPLETED,
          completedAt: new Date(),
        },
      });

      // Update premium skill earnings
      await prisma.premiumSkill.update({
        where: { premiumSkillId: booking.premiumSkillId },
        data: {
          totalEarnings: {
            increment: booking.teacherEarnings,
          },
        },
      });

      // TODO: Transfer earnings to teacher's account
      // This would involve Razorpay Transfer API or settlement

      logger.info(`Premium booking completed: ${bookingId}`);

      return updated;
    } catch (error) {
      logger.error('Error completing booking:', error);
      throw error;
    }
  }

  /**
   * Cancel booking
   */
  async cancelBooking(
    bookingId: string,
    cancellationReason: string
  ): Promise<any> {
    try {
      const booking = await prisma.premiumBooking.findUnique({
        where: { bookingId },
      });

      if (!booking) {
        throw new Error('Booking not found');
      }

      // Calculate refund (100% if >24 hours before, 50% if >2 hours, 0% otherwise)
      const hoursUntilSession =
        (booking.scheduledAt.getTime() - Date.now()) / (1000 * 60 * 60);
      let refundAmount = 0;

      if (hoursUntilSession > 24) {
        refundAmount = booking.amount;
      } else if (hoursUntilSession > 2) {
        refundAmount = booking.amount * 0.5;
      }

      // Process refund via Razorpay if applicable
      if (refundAmount > 0 && booking.razorpayPaymentId) {
        await razorpayService.refundPayment(
          booking.razorpayPaymentId,
          refundAmount * 100 // Convert to paise
        );
      }

      // Update booking
      const updated = await prisma.premiumBooking.update({
        where: { bookingId },
        data: {
          status: BookingStatus.CANCELLED,
          cancelledAt: new Date(),
          cancellationReason,
          refundAmount,
          refundedAt: refundAmount > 0 ? new Date() : undefined,
        },
      });

      logger.info(
        `Premium booking cancelled: ${bookingId}, Refund: ₹${refundAmount}`
      );

      return updated;
    } catch (error) {
      logger.error('Error cancelling booking:', error);
      throw error;
    }
  }

  /**
   * Get user's premium bookings
   */
  async getUserBookings(
    userId: string,
    asStudent: boolean = true
  ): Promise<any[]> {
    try {
      const where: any = asStudent ? { studentId: userId } : {};

      if (!asStudent) {
        // Get as teacher - need to join through premiumSkill
        const bookings = await prisma.premiumBooking.findMany({
          where: {
            premiumSkill: {
              userId,
            },
          },
          include: {
            premiumSkill: true,
          },
          orderBy: { scheduledAt: 'desc' },
        });

        return bookings;
      }

      const bookings = await prisma.premiumBooking.findMany({
        where,
        include: {
          premiumSkill: true,
        },
        orderBy: { scheduledAt: 'desc' },
      });

      return bookings;
    } catch (error) {
      logger.error('Error fetching user bookings:', error);
      throw new Error('Failed to fetch bookings');
    }
  }

  /**
   * Update premium skill
   */
  async updatePremiumSkill(
    premiumSkillId: string,
    updates: Partial<{
      hourlyRate: number;
      minDuration: number;
      maxDuration: number;
      availability: any;
      description: string;
      isActive: boolean;
    }>
  ): Promise<any> {
    try {
      const updated = await prisma.premiumSkill.update({
        where: { premiumSkillId },
        data: updates,
      });

      logger.info(`Premium skill updated: ${premiumSkillId}`);

      return updated;
    } catch (error) {
      logger.error('Error updating premium skill:', error);
      throw new Error('Failed to update premium skill');
    }
  }
}

export default new PremiumSkillService();

import { z } from 'zod';

export const createSwapSchema = z.object({
  body: z.object({
    user2Id: z.string().uuid(),
    user1TeachSkill: z.string().min(1).max(100),
    user1LearnSkill: z.string().min(1).max(100),
    user2TeachSkill: z.string().min(1).max(100),
    user2LearnSkill: z.string().min(1).max(100),
    description: z.string().max(1000).optional(),
    learningGoals: z.string().max(1000).optional(),
    startDate: z.string().datetime(),
    sessionsPlanned: z.number().int().min(1).max(20).default(4),
    hoursPerSession: z.number().int().min(1).max(8).default(2),
    meetingType: z.enum(['ONLINE', 'OFFLINE', 'HYBRID']),
    meetingLocation: z.string().max(200).optional(),
    meetingLink: z.string().url().optional(),
  }),
});

export const updateSwapSchema = z.object({
  body: z.object({
    status: z.enum(['ACCEPTED', 'CANCELLED', 'DISPUTED']).optional(),
    statusReason: z.string().max(500).optional(),
    sessionsCompleted: z.number().int().min(0).optional(),
    user1Progress: z.number().int().min(0).max(100).optional(),
    user2Progress: z.number().int().min(0).max(100).optional(),
  }),
});

export const completeSessionSchema = z.object({
  body: z.object({
    sessionNumber: z.number().int().min(1),
    notes: z.string().max(1000).optional(),
    rating: z.number().int().min(1).max(5).optional(),
  }),
});

export const reviewSwapSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5),
    comment: z.string().max(1000).optional(),
    tags: z.array(z.string()).max(10).optional(),
  }),
});

import { z } from 'zod';

export const addSkillSchema = z.object({
  body: z.object({
    skillId: z.string().uuid(),
    proficiencyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
    yearsOfExperience: z.number().int().min(0).max(50),
    canTeach: z.boolean(),
    wantsToLearn: z.boolean(),
  }),
});

export const updateSkillSchema = z.object({
  body: z.object({
    proficiencyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).optional(),
    yearsOfExperience: z.number().int().min(0).max(50).optional(),
    canTeach: z.boolean().optional(),
    wantsToLearn: z.boolean().optional(),
  }),
});

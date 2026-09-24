import { z } from 'zod';

export const UserProgressSchema = z.object({
  id: z.string(),
  lessonId: z.string(),
  status: z.enum(['completed', 'in-progress', 'not-started']),
  xpEarned: z.number().min(0),
  timestamp: z.number(),
});

export const UserTelemetrySchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  actions: z.array(z.string()),
  duration: z.number().min(0),
  timestamp: z.number(),
});

export const UserProfileSchema = z.object({
  userId: z.string(),
  level: z.number().min(1),
  xp: z.number().min(0),
  streak: z.number().min(0),
  lastActive: z.number(),
});

export type UserProgress = z.infer<typeof UserProgressSchema>;
export type UserTelemetry = z.infer<typeof UserTelemetrySchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;

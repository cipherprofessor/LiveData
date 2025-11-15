import { prisma } from '../db/prisma';
import { calculateDistance } from '../lib/utils';

interface MatchScore {
  userId: string;
  score: number;
  breakdown: {
    skillMatch: number;
    locationProximity: number;
    rating: number;
    activityLevel: number;
    availability: number;
  };
  matchedSkills: {
    theyTeach: any[];
    youNeed: any[];
    youTeach: any[];
    theyNeed: any[];
  };
}

export class SkillMatcher {
  /**
   * Find best matches for a user based on complementary skills
   */
  async findMatches(userId: string, limit: number = 10): Promise<any[]> {
    // 1. Get current user's profile
    const currentUser = await prisma.user.findUnique({
      where: { userId },
      include: {
        userSkills: {
          where: {
            OR: [{ canTeach: true }, { wantsToLearn: true }],
          },
          include: { skill: true },
        },
      },
    });

    if (!currentUser) throw new Error('User not found');

    const teachSkillIds = currentUser.userSkills
      .filter((us) => us.canTeach)
      .map((us) => us.skillId);
    const learnSkillIds = currentUser.userSkills
      .filter((us) => us.wantsToLearn)
      .map((us) => us.skillId);

    // 2. Find potential matches
    const potentialMatches = await prisma.user.findMany({
      where: {
        AND: [
          { userId: { not: userId } },
          { isActive: true },
          {
            userSkills: {
              some: {
                canTeach: true,
                skillId: { in: learnSkillIds },
              },
            },
          },
        ],
      },
      include: {
        userSkills: {
          where: {
            OR: [{ canTeach: true }, { wantsToLearn: true }],
          },
          include: { skill: true },
        },
      },
      take: 100,
    });

    // 3. Calculate match scores
    const scoredMatches: any[] = [];

    for (const match of potentialMatches) {
      const score = this.calculateMatchScore(currentUser, match);

      if (score.score > 30) {
        scoredMatches.push({
          ...match,
          matchScore: score.score,
          breakdown: score.breakdown,
          matchedSkills: score.matchedSkills,
        });
      }
    }

    // 4. Sort by score and return top matches
    return scoredMatches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  }

  /**
   * Calculate comprehensive match score between two users
   */
  private calculateMatchScore(user1: any, user2: any): MatchScore {
    const breakdown = {
      skillMatch: 0,
      locationProximity: 0,
      rating: 0,
      activityLevel: 0,
      availability: 0,
    };

    // 1. SKILL MATCH (40% weight)
    const user1TeachSkills = user1.userSkills
      .filter((us: any) => us.canTeach)
      .map((us: any) => us.skillId);
    const user1LearnSkills = user1.userSkills
      .filter((us: any) => us.wantsToLearn)
      .map((us: any) => us.skillId);
    const user2TeachSkills = user2.userSkills
      .filter((us: any) => us.canTeach)
      .map((us: any) => us.skillId);
    const user2LearnSkills = user2.userSkills
      .filter((us: any) => us.wantsToLearn)
      .map((us: any) => us.skillId);

    const skillsTheyTeach = user2.userSkills.filter(
      (us: any) => us.canTeach && user1LearnSkills.includes(us.skillId)
    );
    const skillsTheyNeed = user2.userSkills.filter(
      (us: any) => us.wantsToLearn && user1TeachSkills.includes(us.skillId)
    );

    const complementarySkills = skillsTheyTeach.length + skillsTheyNeed.length;
    breakdown.skillMatch = Math.min(complementarySkills * 10, 40);

    // 2. LOCATION PROXIMITY (20% weight)
    if (user1.latitude && user1.longitude && user2.latitude && user2.longitude) {
      const distance = calculateDistance(
        user1.latitude,
        user1.longitude,
        user2.latitude,
        user2.longitude
      );

      if (distance < 5) breakdown.locationProximity = 20;
      else if (distance < 10) breakdown.locationProximity = 15;
      else if (distance < 20) breakdown.locationProximity = 10;
      else if (distance < 50) breakdown.locationProximity = 5;
    } else if (user1.city === user2.city) {
      breakdown.locationProximity = 15;
    } else if (user1.state === user2.state) {
      breakdown.locationProximity = 5;
    }

    // 3. RATING/REPUTATION (20% weight)
    const averageRating = (user2.rating / 5) * 20;
    breakdown.rating = Math.round(averageRating);

    // 4. ACTIVITY LEVEL (15% weight)
    const swapSuccessRate =
      user2.totalSwaps > 0 ? (user2.completedSwaps / user2.totalSwaps) * 15 : 0;
    breakdown.activityLevel = Math.round(swapSuccessRate);

    // 5. AVAILABILITY (5% weight)
    const daysSinceActive = Math.floor(
      (Date.now() - user2.lastActive.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceActive <= 7) breakdown.availability = 5;
    else if (daysSinceActive <= 30) breakdown.availability = 3;
    else breakdown.availability = 1;

    const totalScore =
      breakdown.skillMatch +
      breakdown.locationProximity +
      breakdown.rating +
      breakdown.activityLevel +
      breakdown.availability;

    return {
      userId: user2.userId,
      score: totalScore,
      breakdown,
      matchedSkills: {
        theyTeach: skillsTheyTeach.map((us: any) => us.skill),
        youNeed: user1.userSkills
          .filter((us: any) =>
            skillsTheyTeach.some((st: any) => st.skillId === us.skillId)
          )
          .map((us: any) => us.skill),
        youTeach: user1.userSkills
          .filter((us: any) =>
            skillsTheyNeed.some((sn: any) => sn.skillId === us.skillId)
          )
          .map((us: any) => us.skill),
        theyNeed: skillsTheyNeed.map((us: any) => us.skill),
      },
    };
  }

  /**
   * Get skill recommendations based on user's current skills
   */
  async getSkillRecommendations(userId: string, limit: number = 10): Promise<any[]> {
    const user = await prisma.user.findUnique({
      where: { userId },
      include: {
        userSkills: { include: { skill: { include: { category: true } } } },
      },
    });

    if (!user) throw new Error('User not found');

    const existingSkillIds = user.userSkills.map((us) => us.skillId);

    const userCategories = user.userSkills.map((us) => us.skill.category.categoryId);

    const recommendations = await prisma.skill.findMany({
      where: {
        AND: [
          { skillId: { notIn: existingSkillIds } },
          { categoryId: { in: userCategories } },
          { isActive: true },
        ],
      },
      orderBy: { popularity: 'desc' },
      take: limit,
      include: { category: true },
    });

    return recommendations;
  }
}

export const skillMatcher = new SkillMatcher();

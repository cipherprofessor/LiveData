/**
 * Skill Test Service
 * AI-Generated Skill Tests using OpenAI GPT-4
 */

import { prisma } from '../config/database';
import { SkillTestDifficulty } from '@prisma/client';
import logger from '../utils/logger';

export class SkillTestService {
  /**
   * Generate AI Skill Test using OpenAI GPT-4
   * Creates 20 MCQ questions + 2 practical tasks
   */
  async generateSkillTest(
    skillId: string,
    difficulty: SkillTestDifficulty
  ): Promise<any> {
    try {
      const skill = await prisma.skill.findUnique({
        where: { skillId },
        include: { category: true },
      });

      if (!skill) {
        throw new Error('Skill not found');
      }

      // TODO: Integrate with OpenAI GPT-4 API to generate questions
      // const questions = await this.generateQuestionsWithAI(skill.name, difficulty);

      // Demo questions structure
      const questions = this.getDemoQuestions(skill.name, difficulty);

      const test = await prisma.skillTest.create({
        data: {
          skillId,
          title: `${skill.name} - ${difficulty} Level Test`,
          description: `Test your ${skill.name} skills with this AI-generated assessment`,
          difficulty,
          questions,
          passingScore: difficulty === 'EXPERT' ? 90 : difficulty === 'ADVANCED' ? 75 : 70,
          timeLimit: 30, // 30 minutes
        },
      });

      logger.info(`Skill test generated: ${test.testId} for skill ${skill.name}`);

      return test;
    } catch (error) {
      logger.error('Error generating skill test:', error);
      throw new Error('Failed to generate skill test');
    }
  }

  /**
   * Get skill test by ID
   */
  async getSkillTest(testId: string): Promise<any> {
    try {
      const test = await prisma.skillTest.findUnique({
        where: { testId },
      });

      if (!test) {
        throw new Error('Test not found');
      }

      return test;
    } catch (error) {
      logger.error('Error fetching skill test:', error);
      throw new Error('Failed to fetch skill test');
    }
  }

  /**
   * Get all tests for a skill
   */
  async getTestsForSkill(skillId: string): Promise<any[]> {
    try {
      const tests = await prisma.skillTest.findMany({
        where: { skillId, isActive: true },
        orderBy: { difficulty: 'asc' },
      });

      return tests;
    } catch (error) {
      logger.error('Error fetching skill tests:', error);
      throw new Error('Failed to fetch tests');
    }
  }

  /**
   * Start a skill test attempt
   */
  async startTestAttempt(
    userId: string,
    testId: string,
    userSkillId: string
  ): Promise<any> {
    try {
      const test = await prisma.skillTest.findUnique({
        where: { testId },
      });

      if (!test) {
        throw new Error('Test not found');
      }

      const attempt = await prisma.skillTestAttempt.create({
        data: {
          testId,
          userId,
          userSkillId,
          answers: {},
          score: 0,
          passed: false,
          timeSpent: 0,
        },
      });

      logger.info(`Test attempt started: ${attempt.attemptId} by user ${userId}`);

      return {
        attemptId: attempt.attemptId,
        questions: test.questions,
        timeLimit: test.timeLimit,
        startedAt: attempt.createdAt,
      };
    } catch (error) {
      logger.error('Error starting test attempt:', error);
      throw new Error('Failed to start test');
    }
  }

  /**
   * Submit test attempt and calculate score
   */
  async submitTestAttempt(
    attemptId: string,
    answers: any,
    timeSpent: number
  ): Promise<any> {
    try {
      const attempt = await prisma.skillTestAttempt.findUnique({
        where: { attemptId },
        include: { test: true },
      });

      if (!attempt) {
        throw new Error('Attempt not found');
      }

      // Calculate score
      const score = this.calculateScore(attempt.test.questions, answers);
      const passed = score >= attempt.test.passingScore;

      // Generate certificate if passed
      let certificateUrl = null;
      if (passed) {
        certificateUrl = await this.generateCertificate(
          attemptId,
          attempt.userId,
          attempt.test.title,
          score
        );
      }

      // Update attempt
      const updated = await prisma.skillTestAttempt.update({
        where: { attemptId },
        data: {
          answers,
          score,
          passed,
          timeSpent,
          certificateUrl,
        },
      });

      // If passed, create skill verification
      if (passed) {
        await prisma.skillVerification.create({
          data: {
            userSkillId: attempt.userSkillId,
            verificationType: 'SKILL_TEST',
            verificationStatus: 'VERIFIED',
            verificationScore: score,
            verifiedBy: 'SYSTEM',
            verificationDate: new Date(),
            verificationProof: {
              testId: attempt.testId,
              attemptId,
              certificateUrl,
            },
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
          },
        });
      }

      logger.info(
        `Test attempt submitted: ${attemptId}, Score: ${score}, Passed: ${passed}`
      );

      return {
        score,
        passed,
        certificateUrl,
        message: passed
          ? 'Congratulations! You passed the test.'
          : 'You did not pass. Keep learning and try again!',
      };
    } catch (error) {
      logger.error('Error submitting test attempt:', error);
      throw new Error('Failed to submit test');
    }
  }

  /**
   * Calculate test score
   */
  private calculateScore(questions: any, answers: any): number {
    const totalQuestions = questions.mcq.length;
    let correctAnswers = 0;

    questions.mcq.forEach((question: any, index: number) => {
      if (answers[`q${index}`] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    return Math.round((correctAnswers / totalQuestions) * 100);
  }

  /**
   * Generate PDF certificate
   */
  private async generateCertificate(
    attemptId: string,
    userId: string,
    testTitle: string,
    score: number
  ): Promise<string> {
    try {
      // TODO: Generate actual PDF certificate using a library like pdfkit or puppeteer
      // Upload to S3 and return URL

      // For demo, return placeholder URL
      const certificateUrl = `https://skillswap-certificates.s3.amazonaws.com/${userId}/${attemptId}.pdf`;

      logger.info(`Certificate generated: ${certificateUrl}`);

      return certificateUrl;
    } catch (error) {
      logger.error('Error generating certificate:', error);
      throw new Error('Failed to generate certificate');
    }
  }

  /**
   * Get user's test attempts
   */
  async getUserTestAttempts(userId: string, skillId?: string): Promise<any[]> {
    try {
      const where: any = { userId };

      if (skillId) {
        where.test = { skillId };
      }

      const attempts = await prisma.skillTestAttempt.findMany({
        where,
        include: {
          test: {
            select: {
              title: true,
              difficulty: true,
              passingScore: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return attempts;
    } catch (error) {
      logger.error('Error fetching user test attempts:', error);
      throw new Error('Failed to fetch test attempts');
    }
  }

  /**
   * Demo questions generator (replace with OpenAI in production)
   */
  private getDemoQuestions(skillName: string, difficulty: SkillTestDifficulty): any {
    return {
      mcq: [
        {
          question: `What is the most important concept in ${skillName}?`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'A',
          explanation: 'This is the correct answer because...',
        },
        // ... 19 more questions
      ],
      practical: [
        {
          task: `Complete this ${skillName} task`,
          description: 'Task description here',
          timeEstimate: 10, // minutes
        },
        {
          task: `Build a ${skillName} project`,
          description: 'Project description here',
          timeEstimate: 15, // minutes
        },
      ],
    };
  }

  /**
   * Call OpenAI API to generate questions (production implementation)
   */
  private async generateQuestionsWithAI(
    skillName: string,
    difficulty: SkillTestDifficulty
  ): Promise<any> {
    try {
      // TODO: Implement OpenAI GPT-4 API call
      /*
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert skill assessment creator.',
          },
          {
            role: 'user',
            content: `Generate 20 multiple choice questions and 2 practical tasks for testing ${skillName} at ${difficulty} level.`,
          },
        ],
        temperature: 0.7,
      });

      return JSON.parse(response.choices[0].message.content);
      */

      return this.getDemoQuestions(skillName, difficulty);
    } catch (error) {
      logger.error('Error generating questions with AI:', error);
      throw new Error('Failed to generate questions');
    }
  }
}

export default new SkillTestService();

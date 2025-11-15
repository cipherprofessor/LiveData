import api from './api';

export interface Skill {
  skillId: string;
  name: string;
  description: string;
  categoryId: string;
  category?: {
    categoryId: string;
    name: string;
    description: string;
  };
  createdAt: string;
}

export interface UserSkill {
  userSkillId: string;
  userId: string;
  skillId: string;
  type: 'TEACHING' | 'LEARNING';
  proficiencyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  yearsOfExperience: number | null;
  description: string | null;
  skill: Skill;
}

export interface AddUserSkillData {
  skillId: string;
  type: 'TEACHING' | 'LEARNING';
  proficiencyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  yearsOfExperience?: number;
  description?: string;
}

export const skillsService = {
  // Get all skills
  async getAllSkills(params?: { categoryId?: string; search?: string }) {
    const response = await api.get('/skills', { params });
    return response.data;
  },

  // Get skill by ID
  async getSkillById(skillId: string) {
    const response = await api.get(`/skills/${skillId}`);
    return response.data;
  },

  // Get all categories
  async getAllCategories() {
    const response = await api.get('/skills/categories');
    return response.data;
  },

  // Get user's skills
  async getUserSkills(type?: 'TEACHING' | 'LEARNING') {
    const params = type ? { type } : {};
    const response = await api.get('/skills/my-skills', { params });
    return response.data;
  },

  // Add skill to user profile
  async addUserSkill(data: AddUserSkillData) {
    const response = await api.post('/skills/my-skills', data);
    return response.data;
  },

  // Update user skill
  async updateUserSkill(userSkillId: string, data: Partial<AddUserSkillData>) {
    const response = await api.put(`/skills/my-skills/${userSkillId}`, data);
    return response.data;
  },

  // Remove user skill
  async removeUserSkill(userSkillId: string) {
    const response = await api.delete(`/skills/my-skills/${userSkillId}`);
    return response.data;
  },

  // Get skill statistics
  async getSkillStats(skillId: string) {
    const response = await api.get(`/skills/${skillId}/stats`);
    return response.data;
  },
};

export default skillsService;

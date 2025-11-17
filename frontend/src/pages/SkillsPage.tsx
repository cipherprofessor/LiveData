import { useEffect, useState } from 'react';
import skillsService from '../services/skills.service';
import toast from 'react-hot-toast';
import type { UserSkill, Skill } from '../services/skills.service';

export default function SkillsPage() {
  const [mySkills, setMySkills] = useState<UserSkill[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const [mySkillsRes, allSkillsRes] = await Promise.all([
        skillsService.getUserSkills(),
        skillsService.getAllSkills(),
      ]);

      if (mySkillsRes.success) {
        setMySkills(mySkillsRes.data.skills);
      }
      if (allSkillsRes.success) {
        setAllSkills(allSkillsRes.data.skills);
      }
    } catch (error) {
      toast.error('Failed to load skills');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSkill = async (userSkillId: string) => {
    try {
      await skillsService.removeUserSkill(userSkillId);
      toast.success('Skill removed successfully');
      loadSkills();
    } catch (error) {
      toast.error('Failed to remove skill');
    }
  };

  const teachingSkills = mySkills.filter((s) => s.type === 'TEACHING');
  const learningSkills = mySkills.filter((s) => s.type === 'LEARNING');

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading skills...</p>
      </div>
    );
  }

  return (
    <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Skills</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Teaching Skills */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              I Can Teach ({teachingSkills.length})
            </h2>
            {teachingSkills.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-gray-600">No teaching skills added yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {teachingSkills.map((userSkill) => (
                  <div
                    key={userSkill.userSkillId}
                    className="bg-white rounded-lg shadow-sm p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {userSkill.skill.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {userSkill.proficiencyLevel}
                          {userSkill.yearsOfExperience && ` • ${userSkill.yearsOfExperience} years`}
                        </p>
                        {userSkill.description && (
                          <p className="text-sm text-gray-500 mt-2">
                            {userSkill.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveSkill(userSkill.userSkillId)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Learning Skills */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              I Want to Learn ({learningSkills.length})
            </h2>
            {learningSkills.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-gray-600">No learning skills added yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {learningSkills.map((userSkill) => (
                  <div
                    key={userSkill.userSkillId}
                    className="bg-white rounded-lg shadow-sm p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {userSkill.skill.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {userSkill.proficiencyLevel}
                        </p>
                        {userSkill.description && (
                          <p className="text-sm text-gray-500 mt-2">
                            {userSkill.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveSkill(userSkill.userSkillId)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Available Skills */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Browse All Skills ({allSkills.length})
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {allSkills.slice(0, 20).map((skill) => (
                <div
                  key={skill.skillId}
                  className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 cursor-pointer transition-colors"
                >
                  <p className="font-medium text-gray-900 text-sm">{skill.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {skill.category?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

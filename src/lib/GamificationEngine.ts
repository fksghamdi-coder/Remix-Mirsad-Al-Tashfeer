// src/lib/GamificationEngine.ts
export const GamificationEngine = {
  calculatePoints(action: 'COMPLETE_CHAPTER' | 'WIN_CHALLENGE', difficulty: number) {
    const basePoints = action === 'COMPLETE_CHAPTER' ? 100 : 250;
    return basePoints * difficulty;
  },

  updateStudentRank(currentPoints: number) {
    if (currentPoints > 5000) return 'فارس التشفير';
    if (currentPoints > 2000) return 'محلل سيبراني متقدم';
    return 'مبتدئ مرصاد';
  }
};

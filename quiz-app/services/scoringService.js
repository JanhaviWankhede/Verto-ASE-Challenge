/**
 * scoringService.js
 * Handles scoring logic for quizzes.
 */

class ScoringService {
    /**
     * Calculates the score for a set of answers.
     * @param {Array} questions - Array of question objects with correct answers
     * @param {Array} answers - Array of user's answers
     * @returns {Object} - { score: number, total: number }
     */
    static calculateScore(questions, answers) {
        let score = 0;

        answers.forEach(userAnswer => {
            const question = questions.find(q => q._id.toString() === userAnswer.questionId.toString());
            if (!question) return;

            switch (question.type) {
                case 'single':
                case 'multiple': {
                    const correctOptionIds = question.options
                        .filter(o => o.isCorrect)
                        .map(o => o._id.toString());

                    const selectedOptionIds = userAnswer.selectedOptionIds.map(String);

                    // Full match required for multiple choice
                    const isCorrect =
                        correctOptionIds.length === selectedOptionIds.length &&
                        correctOptionIds.every(id => selectedOptionIds.includes(id));

                    if (isCorrect) score++;
                    break;
                }

                case 'text': {
                    // Simple text-based evaluation: exact match ignoring case
                    const correctText = question.correctAnswer?.trim().toLowerCase();
                    const userText = userAnswer.text?.trim().toLowerCase();

                    if (correctText && userText === correctText) score++;
                    break;
                }

                default:
                    break;
            }
        });

        return { score, total: answers.length };
    }
}

module.exports = ScoringService;

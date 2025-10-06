const { calculateScore } = require('../services/scoringService');

describe('Scoring Service', () => {
    const questions = [
        {
            _id: 'q1',
            type: 'single',
            options: [
                { _id: 'o1', isCorrect: true },
                { _id: 'o2', isCorrect: false }
            ]
        },
        {
            _id: 'q2',
            type: 'multiple',
            options: [
                { _id: 'o3', isCorrect: true },
                { _id: 'o4', isCorrect: true },
                { _id: 'o5', isCorrect: false }
            ]
        },
        {
            _id: 'q3',
            type: 'text',
            correctAnswer: 'ChatGPT'
        }
    ];

    test('calculates score correctly', () => {
        const answers = [
            { questionId: 'q1', selectedOptionIds: ['o1'] },
            { questionId: 'q2', selectedOptionIds: ['o3', 'o4'] },
            { questionId: 'q3', text: 'ChatGPT' }
        ];

        const result = calculateScore(questions, answers);
        expect(result.score).toBe(3);
        expect(result.total).toBe(3);
    });

    test('handles wrong answers', () => {
        const answers = [
            { questionId: 'q1', selectedOptionIds: ['o2'] },
            { questionId: 'q2', selectedOptionIds: ['o3'] },
            { questionId: 'q3', text: 'GPT' }
        ];

        const result = calculateScore(questions, answers);
        expect(result.score).toBe(0);
        expect(result.total).toBe(3);
    });
});

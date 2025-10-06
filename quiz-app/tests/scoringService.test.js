const mongoose = require('mongoose');
const ScoringService = require('../services/scoringService');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

describe('Dynamic Scoring Service Tests', () => {
    let quiz, singleQ, multipleQ, textQ;

    // Connect to MongoDB before running tests
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/quiz-app-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Create a quiz dynamically
        quiz = await Quiz.create({ title: 'Dynamic Quiz' });

        // Add single choice question
        singleQ = await Question.create({
            quiz: quiz._id,
            text: '2 + 2 = ?',
            type: 'single',
            options: [
                { text: '3', isCorrect: false },
                { text: '4', isCorrect: true }
            ]
        });

        // Add multiple choice question
        multipleQ = await Question.create({
            quiz: quiz._id,
            text: 'Select even numbers',
            type: 'multiple',
            options: [
                { text: '2', isCorrect: true },
                { text: '3', isCorrect: false },
                { text: '4', isCorrect: true }
            ]
        });

        // Add text question
        textQ = await Question.create({
            quiz: quiz._id,
            text: 'AI developed by OpenAI?',
            type: 'text',
            correctAnswer: 'ChatGPT'
        });
    });

    // Clean up after all tests
    afterAll(async () => {
        await Quiz.deleteMany({});
        await Question.deleteMany({});
        await mongoose.connection.close();
    });

    test('All correct answers', () => {
        const answers = [
            { questionId: singleQ._id.toString(), selectedOptionIds: [singleQ.options[1]._id.toString()] },
            { questionId: multipleQ._id.toString(), selectedOptionIds: [multipleQ.options[0]._id.toString(), multipleQ.options[2]._id.toString()] },
            { questionId: textQ._id.toString(), text: 'ChatGPT' }
        ];

        const result = ScoringService.calculateScore([singleQ, multipleQ, textQ], answers);
        expect(result).toEqual({ score: 3, total: 3 });
    });

    test('Some wrong answers', () => {
        const answers = [
            { questionId: singleQ._id.toString(), selectedOptionIds: [singleQ.options[0]._id.toString()] }, // wrong
            { questionId: multipleQ._id.toString(), selectedOptionIds: [multipleQ.options[0]._id.toString()] }, // partially correct → 0 points
            { questionId: textQ._id.toString(), text: 'GPT' } // wrong
        ];

        const result = ScoringService.calculateScore([singleQ, multipleQ, textQ], answers);
        expect(result).toEqual({ score: 0, total: 3 });
    });

    test('No answers submitted', () => {
        const answers = [];
        const result = ScoringService.calculateScore([singleQ, multipleQ, textQ], answers);
        expect(result).toEqual({ score: 0, total: 3 });
    });

    test('Partial multiple-choice scoring (optional)', () => {
        // Uncomment and modify scoring service if partial scoring is implemented
        // const answers = [
        //     { questionId: multipleQ._id.toString(), selectedOptionIds: [multipleQ.options[0]._id.toString()] }
        // ];
        // const result = ScoringService.calculateScore([multipleQ], answers);
        // expect(result).toEqual({ score: 0.5, total: 1 }); // Example for partial scoring
    });
});

const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const { calculateScore } = require('../services/scoringService');

exports.createQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.create({ title: req.body.title });
        res.status(201).json(quiz);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllQuizzes = async (req, res) => {
    const quizzes = await Quiz.find({}, '_id title');
    res.json(quizzes);
};

exports.getQuizQuestions = async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId).populate('questions');
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    // Remove isCorrect for API response
    const questions = quiz.questions.map(q => ({
        _id: q._id,
        text: q.text,
        type: q.type,
        options: q.options.map(o => ({ _id: o._id, text: o.text }))
    }));

    res.json(questions);
};

exports.submitQuiz = async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId).populate('questions');
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const userAnswers = req.body.answers;
    const result = calculateScore(quiz.questions, userAnswers);
    res.json(result);
};

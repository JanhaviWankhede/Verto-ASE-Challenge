const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quizController');
const questionController = require('../controllers/questionController');
const { validateQuestion } = require('../middlewares/validation');

// Quiz endpoints
router.post('/', quizController.createQuiz);
router.get('/', quizController.getAllQuizzes);
router.get('/:quizId/questions', quizController.getQuizQuestions);
router.post('/:quizId/submit', quizController.submitQuiz);

// Question endpoint with validation middleware
router.post('/:quizId/questions', validateQuestion, questionController.addQuestion);

module.exports = router;

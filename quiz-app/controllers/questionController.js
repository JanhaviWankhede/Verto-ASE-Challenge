const Question = require('../models/Question');
const Quiz = require('../models/Quiz');

exports.addQuestion = async (req, res) => {
    try {
        const question = await Question.create(req.body);
        await Quiz.findByIdAndUpdate(req.params.quizId, {
            $push: { questions: question._id }
        });
        res.status(201).json(question);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

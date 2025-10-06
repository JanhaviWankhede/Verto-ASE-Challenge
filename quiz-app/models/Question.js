const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false }
});

const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true, maxlength: 300 },
    type: { type: String, enum: ['single', 'multiple', 'text'], required: true },
    options: [OptionSchema],
    correctAnswer: { type: String } // For text questions
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);

// middlewares/validation.js

// Ensure validateQuestion is a function and exported correctly
const validateQuestion = (req, res, next) => {
    const { text, type, options, correctAnswer } = req.body;

    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Question text is required' });
    }

    if (text.length > 300) {
        return res.status(400).json({ error: 'Question text must be max 300 characters' });
    }

    if (!type || !['single', 'multiple', 'text'].includes(type)) {
        return res.status(400).json({ error: 'Invalid question type' });
    }

    if (type === 'text') {
        if (!correctAnswer || correctAnswer.trim() === '') {
            return res.status(400).json({ error: 'Text question must have correctAnswer' });
        }
    } else {
        if (!options || !Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ error: 'Options must be an array with at least 2 items' });
        }

        const correctOptions = options.filter(o => o.isCorrect);
        if (type === 'single' && correctOptions.length !== 1) {
            return res.status(400).json({ error: 'Single choice must have exactly 1 correct option' });
        }
        if (type === 'multiple' && correctOptions.length < 1) {
            return res.status(400).json({ error: 'Multiple choice must have at least 1 correct option' });
        }
    }

    next();
};

// Export as named export
module.exports = { validateQuestion };

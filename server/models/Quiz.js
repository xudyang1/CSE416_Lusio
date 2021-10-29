const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// a sample quiz schema
// TODO: modify this sample later
const QuizSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Quiz = mongoose.model('Quiz', QuizSchema);
 const mongoose = require('mongoose');


const habitSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    favourite: {
        type: Boolean,
        default: false
    },
    currentStatus: [{
        date: Date,
        state: String
    }]
},{
    timestamps: true
});

const Habit = mongoose.model('Habit',habitSchema);
// module.exports = Habit;
module.exports =  Habit
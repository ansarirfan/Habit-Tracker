const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    habits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    }]
},{
    timestamps: true
});

const User = mongoose.model('User',userSchema); 

// module.exports = User;
module.exports = User
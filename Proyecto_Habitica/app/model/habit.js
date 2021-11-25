const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const HabitSchema = new Schema ({
    _userEmail : {
        type: String, 
        required: true
    },
    _title : {
        type: String,
        required: true
    },
    _difficulty : {
        type: String,
        required: true
    },
    _tag:  {
        type: String,
        required: false
    },
    _counter: {
        type: Number,
        required: true
    }

})
module.exports = mongoose.model('habit', HabitSchema);




//de aqui
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoSchema = new Schema ({
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
   _date: {
       type: String
   },
   _completed: {
       type: Boolean
   }

})
module.exports = mongoose.model('todo', TodoSchema);



//hasta aca 
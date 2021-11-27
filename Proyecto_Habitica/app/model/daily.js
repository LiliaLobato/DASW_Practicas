//de aqui
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DailySchema = new Schema ({
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
    _validOn: [{
        type: String
    }],
   _updatedAt:{
        type: String  
   },
   _completed: {
       type: Boolean
   },
   _counter: {
       type: Number
   }

})
module.exports = mongoose.model('daily', DailySchema);



//hasta aca 
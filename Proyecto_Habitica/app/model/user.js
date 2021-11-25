const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    _avatarName : {
        type: String,
        required: true
    },
    _avatarPassword: {
        type: String, 
        required : true
    },
    _avatarEmail: {
        type: String, 
        required : true
    },
    _avatarImg: {
        type: Number, 
        required : false
    }, 
    _avatarLevel: {
        type: Number, 
        required : false
    }, 
    _avatarCoins: {
        type: Number, 
        required : false
    }, 
    _avatarHealth: {
        type: Number, 
        required : false
    }, 
    _avatarExp: {
        type: Number, 
        required : false
    } 

})

module.exports = mongoose.model('user', UserSchema);
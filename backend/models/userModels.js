const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        validate:{
            validator: function(e){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
            },
            message: (props) => `${props.value} is not a valid email address`
        }
    },
    password:{
        type: String,
        required: true,
        validate:{
            validator: function(pass){
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(pass);
            },
            message: (props) => `${props.value} is not a valid Password!`
        }
    },
    image:{
        type: String,
        default: ""
    },
    seachHistory:{
        type: Array,
        default: []
    }
});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;
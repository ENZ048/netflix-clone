const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

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
            message: () => `Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.`
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

userSchema.pre('save', async function() {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
})

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;
// User Model

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        // trim은 space를 없애주는 역할!
        unique: 1
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        // admin 유저, normal 유저 등
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        // token의 expiration
        type: Number
    }

})

const User = mongoose.model('User', userSchema);
// User 는 해당 모델의 이름! 지금 정해주는 것.

module.exports = { User };
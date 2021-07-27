// User Model

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
    // saltRounds => 몇 자리로 할 것인가

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

// usermodel의 user 정보를 저장하기 전에 무언가 (pre) 하겠다는 것
userSchema.pre('save', function( next ) {
    var user = this;
    console.log("enter: userSchema.pre")
    // 만약 password를 modify하려는 시도일 때만 실행 => 그 외 다른 property들을 수정할 때마다 암호화를 다시 하면 안되므로 
    if (user.isModified('password')) {
        console.log("enter: isModified: password")
        // 비밀번호를 암호화 시킨다
        bcrypt.genSalt(saltRounds,function(err, salt) {
            if (err) return next(err)
            
            // salt를 generate하는데 성공했다면,
            bcrypt.hash(user.password, salt, function(err, hash){
                if (err) return next(err)
                user.password = hash
                console.log("enter: hash");
                console.log("userpassword hashed = ", user.password);
                // plainpassword를 hash화하는데 성공했다면, 그 hash 값을 userSchema의 password로 넣어준다.
                next()
            })
        })    
    }
    else {
        user.password = user.password;
        console.log("enter: Modifying other properties")
        console.log("unhashed userpassword = ", user.password);
        next();
    }
})

const User = mongoose.model('User', userSchema);
// User 는 해당 모델의 이름! 지금 정해주는 것.

module.exports = { User };
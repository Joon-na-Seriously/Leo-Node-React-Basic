// User Model

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
    // saltRounds => 몇 자리로 할 것인가
const jwt = require('jsonwebtoken');

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
    password: {
        type: String,
        maxlength: 100,
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
    // 만약 password를 modify하려는 시도일 때만 실행 => 그 외 다른 property들을 수정할 때마다 암호화를 다시 하면 안되므로 
    if (user.isModified('password')) {
        // 비밀번호를 암호화 시킨다
        bcrypt.genSalt(saltRounds,function(err, salt) {
            if (err) return next(err)
            
            // salt를 generate하는데 성공했다면,
            bcrypt.hash(user.password, salt, function(err, hash){
                if (err) return next(err)
                user.password = hash
                // plainpassword를 hash화하는데 성공했다면, 그 hash 값을 userSchema의 password로 넣어준다.
                next()
            })
        })    
    }
    else {
        next();
    }
})


// userSchema에 이용할 수 있는 method를 직접추가 (index.js에서 이용할 것)
userSchema.methods.comparePassword = function(plainPassword, cb) {
    
    // plainPassword 1234567
    // encrypted Password - DB에 있는것
    // 위 둘이 같은지 check해주어야 함. -> plain을 암호화해서 DB랑 비교해야한다. 복호화는 불가능
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // json webtoken을 이용해서 token을 생성
    // jwt.sign(user._id, 'secretToken')
    
    user.token = token;
    user.save(function(err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // token을 가져와서 decoding
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // decoded 인자는 복호화된 user._id
        // userid를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id" : decoded, "token": token}, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}



const User = mongoose.model('User', userSchema);
// User 는 해당 모델의 이름! 지금 정해주는 것.

module.exports = { User };
const { User } = require('../models/User');


// 인증 처리들을 해주는 곳
let auth = (req, res, next) => {
    // 1. client cookie에서 token을 가져온다
    let token  = req.cookies.x_auth;
    
    // 2. token을 복호화한 후 (decoding) User를 찾는다 (User model에서 method를 만들어서 가져와주어야 함)
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth : false, error: true})

        req.token = token;
        req.user = user;

        next();
    }) // 여기까지가 middleware => 통과


    // 3. User가 있으면 인증 ok


    
}

module.exports = { auth };
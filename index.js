// back end가 시작할 때 여기서 시작함. (백 엔드의 시작점)
// express js는 node js의 프레임워크

const accountInfo = require("./secret");


const express = require('express')
    // express의 모듈을 가져옴 
const app = express()
    // function을 이용해서 새 express App을 만들고 
const port = 5000
    // port는 아무렇게나 해도 됨.
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');  

const { User } = require("./models/User");
const { auth } = require("./middleware/auth");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());  


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));
// 몽고디비 연결
   

app.get('/', (req, res) => {
  res.send('Hello World!' + "\n안녕하세요! 새해복 많이받으세요! d아아아")
  // root directory에 "hello world" 가 출력될 수 있게 해주는 것.
})

app.post('api/users/register', (req, res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져오면, 
    // 그것들을 DB에 넣어준다!.
    const user = new User(req.body);    // body parser가 있어서 req.body에 parse되어서 들어감. 

    
    // console.log("req.body: ", req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        // error 발생 시 json 형식으로 success하지 못했다 + 에러메시지도 함께 전달
        return res.status(200).json({
            success : true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    // 1. 요청된 email가 DB에 있는지 확인
    User.findOne({ email : req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 email에 해당하는 유저가 없습니다."
            });
        }
    
        // 2. 있다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            // isMatch가 없다는 것은 비밀번호가 같지 않다는 것
            if (!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});
        

            // 3. 비밀번호까지 같다면, 해당 User를 위한 token을 생성해준다.
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);
                // token을 저장 => cookie, local storage 등등에 저장할 수 있다.
                // 해당 강의에서는 cookie에 저장

                // 쿠키의 이름에 x_auth로 저장됨
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });     
            })
        });
    });
});

// 인증과 관련된 부분은 복잡hae..
app.get('api/users/auth', auth , (req, res) => {
    // auth => MiddleWare 
    // MiddleWare란, endpoint에서 request를 받은 다음에 callback function하기 전에 중간에서 무언가 해주는 것

    // 지금부터 middleware를 통과했을 때 실행되는 code들 => authentication이 true인 것들
    // authentication에 성공했다는 것을 client에 전달해주어야 함
    res.status(200).json({
        _id: req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    // 로그인된 상태이므로 auth를 middleware로 넣어준다

    User.findOneAndUpdate({_id : req.user._id},
        // 찾을 때는 id로 찾는데, auth middleware에서 가져온 id
        { token : ""},
        // 이 작업을 통해 DB에 있는 token을 없애준다
        (err, user) => {
            if (err) return res.json( {success: false, err});
            return res.status(200).send({
                success: true
            });
        });
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  // port = 5000에서 해당 App을 실행하는 것!
  // 만약에 이 app이 5000에 listen하고 있으면 console에 저 내용을 print하는 것!
})
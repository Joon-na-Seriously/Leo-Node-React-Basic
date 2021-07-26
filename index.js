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
const config = require('./config/key');  

const { User } = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


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

app.post('/register', (req, res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져오면, 
    // 그것들을 DB에 넣어준다!.
    const user = new User(req.body);    // body parser가 있어서 req.body에 parse되어서 들어감. 
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        // error 발생 시 json 형식으로 success하지 못했다 + 에러메시지도 함께 전달
        return res.status(200).json({
            success : true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  // port = 5000에서 해당 App을 실행하는 것!
  // 만약에 이 app이 5000에 listen하고 있으면 console에 저 내용을 print하는 것!
})
// back end가 시작할 때 여기서 시작함. (백 엔드의 시작점)
// express js는 node js의 프레임워크

const userInfo = require("./secret");

const express = require('express')
    // express의 모듈을 가져옴 
const app = express()
    // function을 이용해서 새 express App을 만들고 
const port = 5000
    // port는 아무렇게나 해도 됨.

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${userInfo.IDPW.name}:${userInfo.IDPW.password}@boilerplate.0d0kk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));
// 몽고디비 연결
   

app.get('/', (req, res) => {
  res.send('Hello World!' + "\n안녕하세요!")
  // root directory에 "hello world" 가 출력될 수 있게 해주는 것.
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  // port = 5000에서 해당 App을 실행하는 것!
  // 만약에 이 app이 5000에 listen하고 있으면 console에 저 내용을 print하는 것!
})
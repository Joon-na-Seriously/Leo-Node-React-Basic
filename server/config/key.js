if(process.env.NODE_ENV === "production"){
    module.exports = require('./prod');
}else {
    module.exports = require('./dev')
}

// development mode면 ./dev에서, 아니고 deploy한 후의 상황이면 ./prod에서
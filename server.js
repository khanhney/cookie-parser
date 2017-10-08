const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser').urlencoded({extended: false});


const jwt  = require('jsonwebtoken');
// gọi lại 2 promise đã tạo
const {signPromise, verifyPromise} = require('./jwt');


app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());

// có 2 loại middleware sử dụng
// app.use((req, res, next)=>{

// });
// chạy các route

// const demoMiddleware = (req, res, nex)=>{

// }
// app.get('/', demoMiddleware, (req, res)=>{
    
// });



// lưu cookie
app.get('/save', (req, res)=>{
    res.cookie('demo1', 'asdsadsadsa').send('Hello, Was Save');
})
// hiện thị cookies
app.get('/show', (req, res)=>{
    res.send('demo1 : '+ req.cookies.demo1);
})


// bài tập
app.post('/muave', bodyParser ,(req, res)=>{
    const {username, soluong} = req.body;
    // res.send({message: 'OK'});
    signPromise({username, soluong}).then(result => res.cookie('check', result)).catch(err => console.log(err.message));
    
});

app.use('/vaorap', (req, res, next)=>{
    
});
app.get('/vaorap', (req, res)=>{
    const checkToken = req.cookies.check;
    if(!checkToken) return res.send('Ban chua mua ve');
    verifyPromise(checkToken)
    .then(()=> res.send('Moi Ban Xem Phim'))
    .catch(err => console.log(err.message));
});
app.listen(3000, ()=> console.log('Hello Server'));



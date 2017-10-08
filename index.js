const express = require('express');
const app = express();
const bodyParser = require('body-parser').urlencoded({extended: false});

const session = require('express-session');
// sử dụng bcrypt

const {mongodb, ObjectId} = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {hash, compare} = require('bcrypt');

// gọi User
const User = require('./User');

app.set('views','./views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(session({
    secret: 'asdasfdaf236256asda1',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 5000
    }
}));


// có 2 loại middleware 
//1. bình thường chỉ qua các route thường
//2. qua tất cả router


// tạo 1 router chỉ qua admin
const adminRouter = (req, res, next)=>{
    console.log('This Is router admin');
    next();
}
app.get('/', (req, res)=> res.render('home'));
app.get('/admin/1', adminRouter, (req, res)=>{
    res.render('admin');
});
app.get('/admin/2', adminRouter, (req, res)=>{
    res.render('admin');
});

app.get('/dangky', (req, res)=> res.render('dangky'));
app.get('/dangnhap', (req, res)=> res.render('dangnhap'));


app.post('/dangky', bodyParser, async (req, res)=>{
    const {username, password} = req.body;
    const hashPassword = await hash(password, 8);
    const user = new User({username, password: hashPassword});
    user.save()
    .then(result => res.send(result))
    .catch(err => console.log(err.message));
});

app.post('/dangnhap', bodyParser, (req, res)=>{
    const {username, password} = req.body;
    User.findOne({username})
    .then(result => {
      if(compare(password, result.password)){
          req.session.checkDangNhap = true;
          res.redirect('/private');
      }
    }).catch(err => console.log(err.message));
});

app.get('/private', (req, res)=>{
    const checkDangNhap = req.session.checkDangNhap;
    if(checkDangNhap === undefined) return res.redirect('/dangnhap');
    res.render('private');
})
const uri = 'mongodb://localhost/shop3';
mongoose.connect(uri, {useMongoClient: true});
mongoose.connection.once('open', ()=>{
    app.listen(3000, ()=> console.log('Server started at port 3000'));    
});
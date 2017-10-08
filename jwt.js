const jwt = require('jsonwebtoken');

const SECERT_KEY = "asdasd32asndmasd2sa3s4dndjuothgfh";
// // var demo = '';
// // jwt.sign({email: 'KhanhNey1997', password: 'HoangTu'}, SECERT_KEY, (err, result)=>{
// //     if(err) return console.log(err.message);
// //     demo = result;
// //     console.log(demo);
// // });

// // có 2 loại xác nhận
// //1 là decode
// //2 là verify

// const jwtEncode = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IktoYW5oTmV5MTk5NyIsInBhc3N3b3JkIjoiSG9hbmdUdSIsImlhdCI6MTUwNzQ0MTYyOX0.eJywecbQPAI_ZjyntRfmRT4mdF9PSj8wv2iN
// rGI2QyI`;
// jwt.verify(jwtEncode, SECERT_KEY, (err, result) =>{
//     if(err) return console.log(err.message);
//     console.log(result);
// })


// jwt.sign({ email: 'khanhney.dev@gmail.com'}, SECERT_KEY, (err, token)=>{
//     if(err) return console.log(err.message);
//     console.log(token);
// })

// const very = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoYW5obmV5LmRldkBnbWFpbC5jb20iLCJpYXQiOjE1MDc0NDE4MjF9.-19RH8sye4f4QYNl8_fAEgGLTIK4AjyiDiIn7ptFHiQ';
// jwt.verify(very, SECERT_KEY, (err, result)=>{
//     if(err) return console.log(err.message);
//     delete result.iat;
//     console.log(result);
// })

// chuyển đổi sang dạng Promise
function signPromise(obj){
    return new Promise((resolve, reject) => {
        jwt.sign(obj, SECERT_KEY, (err, result) =>{
            if(err) return reject(err);
            resolve(result);
        })  
    })
};

function verifyPromise(obj){
    return new Promise( (resolve, reject) =>{
        jwt.verify(obj, SECERT_KEY, (err, result) =>{
            if(err) return reject(err);
            resolve(result);
        })
    })
};

signPromise({name: 'khanhney'})
.then(result => console.log(result))
.catch(err => console.log(err.message));

const verify = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2hhbmhuZXkiLCJpYXQiOjE1MDc0NDIzOTV9.rOGqZhFK8Su6zE1it1iYWbP26kmrjYGJNZ8p2P7zBIk';

verifyPromise(verify)
.then(result => console.log(result));
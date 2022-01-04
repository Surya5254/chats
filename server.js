const express = require('express');
const mongoose = require('mongoose');
const socket = require('socket.io')

const Details = require('./models/UserDetails');
const req = require('express/lib/request');





const app = express();
const server = app.listen(3000,function(){
    console.log('Listening to port 3000')
})

const dbURI = 'mongodb+srv://User007:asdf1234@cluster0.e10xl.mongodb.net/testing?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => {
        console.log('Connected to the Database')
    })
    .catch((err) => console.log(err));

app.set('view engine','ejs');
app.set('views','html');



app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

const io = socket(server);

io.on('connection',function(socket) {
    console.log('new connection')

    socket.on('chat',function(data){
        io.sockets.emit('chat',data)
    })
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
})

app.get('/',(req,res) => {
    res.render('home');
});
app.get('/login',(req,res) => {
    res.render('login',{error:''});
});
app.get('/register',(req,res) => {
    res.render('register');
});
app.get('/welcome',(req,res) => {
    res.render('welcome');
});
app.get('/log-in',(req,res) => {
    res.redirect('./');
});

app.post('/login', async(req,res) => {
    try{
        const Email = req.body.Email;
        const password = req.body.password;
        const userEmail = await Details.findOne({Email:Email});
        if(password === userEmail.password){
            res.render('welcome',{userName : userEmail.username})
        } else {
            res.render('login',{error : 'Wrong Password'});
        }
    } catch(error){
        res.render('login',{error : 'Wrong Email'});
    }
})
app.post('/register',async(req,res) => {
    const details = new Details(req.body);
    details.save()
    .then((result) =>{
        res.redirect('/');
        console.log(details);
    })
    .catch((err) => {
        res.redirect('/register');
    })
})


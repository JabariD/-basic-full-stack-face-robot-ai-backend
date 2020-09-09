const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
    console.log("server running...")
});

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt));

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});


/* Plan for our API

/ --> this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT = user

*/ 
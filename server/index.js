const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const passportService = require('./service/passport-service');

const Authentication = require('./controller/auth-controler');
// console.log(Authentication);
// Connect to database
mongoose.connect('mongodb://localhost/authentication');

// Server set up
const app =  express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/json' }));

const server = http.createServer(app);
server.listen(port, function () {
  console.log(`Express server is listening on ${port}`);
});

const requireLogin = passport.authenticate('local', { session: false });
const requireAuth =  passport.authenticate('jwt', { session: false });

app.get('/dashboards', requireAuth, function (req, res) {
  res.send({ message: 'Access to protected resource taken!' })
});

app.post('/signin', requireLogin, Authentication.signin);
app.post('/signup', Authentication.signup);


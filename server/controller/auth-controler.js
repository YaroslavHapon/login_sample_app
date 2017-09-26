const User = require('./../model/user-model');
const config = require('./../config');
const jwt = require('jsonwebtoken');

function tokenForUser(user) {
  const time =  Date.now();
  const subject = (user.id).toString();
  return jwt.sign({ iat: time}, config.secret, { expiresIn: '2d' , subject: subject });
}

exports.signin= function (req, res, next) {
  res.send({ token: tokenForUser(req.user) })
};

exports.signup = function (req, res, next) {
  const password = req.body.password;
  const email = req.body.email;

  // 1. Validate the email and password
  const errors = {};

  if (!email && !password) {
    errors.noValues = 'You must provide email and password!'
  }

  if (!/^[A-Z0-9._+-]+@[A-Z]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'You mast provide valid email!'
  }

  if (password.length < 3 || password.length > 24 || !/[A-Z]+/.test(password)) {
    errors.password = 'You mast provide valid password!'
  }

  if(Object.keys(errors).length) {
    return res.status(422).send({ error: errors });
  }
  console.log(req.body);
  // 2. Check if there is no existing email
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) return next(err);

    // if the mail exist send the error
    if (existingUser){
      return res.status(422).send({ error: 'Email in use!' });
    }

    // Create new User model to save it to DB
    const user = new User({
      email: email,
      password: password
    });

    // 3. Save the new model to the DB
    user.save(function (err, user) {
      if (err) return next(err);

      res.send({ token: tokenForUser(user) });
    })
  });
 
};



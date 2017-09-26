const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// pre save hook
userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    })
  });
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  })
};


const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
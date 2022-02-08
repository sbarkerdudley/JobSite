const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');

const User = require('../models/userModel');

require('../passportConfig')(passport);

module.exports = {
  register: (req, res, next) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc.rows.length > 0) {
        res.send('User Already Exists');
      }
      if (doc.rows.length === 0) {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = {
          username: req.body.username,
          password: hashedPassword,
        };
        await User.insert(newUser.username, newUser.password, salt);
        res.status(201).redirect('/dashboard');
      }
    });
  },

  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) throw err;
      if (!user) res.send('No User Exists');
      else {
        req.logIn(user, () => {
          if (err) throw err;
          res.send('Successfully Authenticated');
        });
      }
    })(req, res, next);
  },
};

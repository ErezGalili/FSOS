const User = require('./UserModel');
const jwt = require('jsonwebtoken')
const config = require('../../.env')

exports.signup = function(req, res, next) {
  const newUser = new User(req.body);
  newUser.created = new Date();
  newUser.modified = new Date();

  newUser
    .save()
    .then(user => {
      const token = jwt.sign({id:user._id},config.secrets.jwt,{expiresIn:config.expireTime})
      res.status(201).json({
        status: 'success',
        token,
        user
      });
    })
    .catch(err => {
      res.status(404).json({
        status: 'fail',
        message: 'error: ' + err
      });
    });
};

  exports.login = function(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('You need email and password');
  }

  User.findOne({ email })
    .then(user => {
      if (!user || !user.authenticate(password)) {
        return res.status(401).send('Invalid email or password');
      }

      const token = jwt.sign({ id: user._id }, config.secrets.jwt, {
        expiresIn: config.expireTime
      });

      res.status(200).json({
        status: 'success',
        token
      });
    })
    .catch(err => {
      res.status(500).send('Internal server error');
    });
};

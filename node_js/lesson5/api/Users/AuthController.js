const User = require('./UserModel');

exports.signup = function(req, res, next) {
  const newUser = new User(req.body);
  newUser.created = new Date();
  newUser.modified = new Date();

  newUser
    .save()
    .then(user => {
      res.status(201).json({
        status: 'success',
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
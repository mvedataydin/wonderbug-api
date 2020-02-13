const router = require('express').Router();
const User = require('../model/user.model');
const { signUpValidation, loginValidation } = require('../validators/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  //Validate before create user
  const { error } = signUpValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  //checking if the user is already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');

  //Hash password
  const hashPassword = await bcrypt.hash(req.body.password, 10)

  //create new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword
  });
  try {
    const savedUser = await user.save();
    const userID = savedUser._id
    res.send({ _id: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});


//Login
router.post('/login', async (req, res) => {
  //Validate before create user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  //checking if the user is already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email is not found!');
  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password!')

  //Create and assign a token
  const accessToken = jwt.sign({ _id: user._id }, process.env.AUTH_TOKEN_SECRET)
  // res.header('auth-token', token).send(token)
  res.json({ accessToken })

});

module.exports = router;
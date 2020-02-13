const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:
  {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: 3,
    max: 15
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 15
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const express = require('express');
const cors = require('cors')
const app = express();
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//import routes
const authRoute = require('./routes/auth');
const projectsRoute = require('./routes/projects');
//import mongoose
const mongoose = require('mongoose');
//load env variables
const dotenv = require('dotenv');
dotenv.config();

//db connection
const uri = process.env.MONGO_URI

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => console.log('DB connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connecxtion error: ${err.message}`)
})

//use middleware
app.use(cors())
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route middlewares
app.use('/api/user', authRoute);
app.use('/api/projects', projectsRoute);

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`API is listening on port: ${port}`)
});
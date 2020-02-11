const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//import mongoose
const mongoose = require('mongoose');
//load env variables
const dotenv = require('dotenv');
dotenv.config();

//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => console.log('DB connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
})

//use middleware
app.use(morgan("dev"));

const port = 8080
app.listen(port, () => {
  console.log(`API is listening on port: ${port}`)
});
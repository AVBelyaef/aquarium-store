const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { connect } = require('mongoose');

const app = express();
require('dotenv').config();

connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// Routes
const usersRouter = require('./routes/users');

app.use('/api/users', usersRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

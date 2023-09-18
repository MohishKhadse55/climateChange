const path = require('path');
const express = require('express');
const morgan = require('morgan');

const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const weatherRouter = require('./routes/weatherRoutes')
const app = express();



// development login
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// Body parser... For reading data formt the body into req.body
app.use(express.json({ limit: '10kb' })); // middleware
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// app.use(cookieParser());


app.use('/api/v1', weatherRouter);



app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this Server`,
  // });
  // err = new Error(`Can't find ${req.originalUrl} on this Server`);
  // err.status = 'fail';

  next(new appError(`Can't find ${req.originalUrl} on this Server`), 404);
});

app.use(globalErrorHandler);

module.exports = app;

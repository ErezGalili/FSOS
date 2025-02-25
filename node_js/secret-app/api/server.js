const express = require('express');
const app = express();
const userRouter = require('./user/UserRouter');
const flightRouter = require('./flight/FlightRouter');

app.use('/users', userRouter);
app.use('/flight', flightRouter);

// Add this line to debug routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./../starter/utils/appError');
const globalErrorHandler = require('./../starter/controllers/errorController')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')

const app = express()

//Set security HTTP headers
app.use(helmet())

//morgan is just a logger -->Development logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//for security reasons-->limit number of req from same IP
const limiter = rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:'Too many requests from this IP,Please try again after an hour.'
})
app.use('/api',limiter);


//Body parser,reading data from the body into req.body
app.use(express.json())

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Preventing parameter pollution(Ex: using 2 sort keyword in query params)
//whitelist is exception
app.use(hpp({
    whitelist:[
        'duration','ratingsQuantity','ratingsAverage','maxGroupSize','difficulty','price'
    ]
}));

app.use(express.static(`${__dirname}/public`))

//Test middleware
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString()
    next()
})

/*
app.get('/api/v1/tours',getAllTours)
app.get('/api/v1/tours/:id',getTour)

//since express don't receive body on request we need use middleware(app.use(express.json()))
//middleware is function inbetween request and response cycle and it can manipulate incoming request data
app.post('/api/v1/tours',createTour)

app.patch('/api/v1/tours/:id',updateTour)

app.delete('/api/v1/tours/:id',deleteTour)
*/


app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/reviews',reviewRouter)

app.all('*',(req,res,next)=>{
  
//if something is passed as argument to next then express assumes it is error
//and executes the global error handling middleware
 next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
})

app.use(globalErrorHandler)

module.exports = app
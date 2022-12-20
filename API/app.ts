var createError = require('http-errors');
import express from 'express';
import  {Express,NextFunction,Request, Response} from 'express';

var path = require('path');
var cors =require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const apiRouter = require('./routes/api');
const session = require('express-session');
var activeUser; 

var app: Express=express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(session({secret: process.env.JWT_SECRET,resave: true,saveUninitialized: true}));
app.use('/api', apiRouter);
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404)); 
});
app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500); 
  res.render('error');
});

module.exports = app;

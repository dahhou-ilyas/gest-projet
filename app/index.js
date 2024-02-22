const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const userRoute=require('./routes/userRoute')
const taskRoute=require('./routes/taskRoute')

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/users',userRoute);
app.use('/tasks',taskRoute);

module.exports=app;

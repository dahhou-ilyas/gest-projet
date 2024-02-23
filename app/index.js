const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();

const userRoute=require('./routes/userRoute')
const taskRoute=require('./routes/taskRoute')

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());


app.use('/users',userRoute);
app.use('/tasks',taskRoute);

module.exports=app;

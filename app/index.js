const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());


module.exports=app;

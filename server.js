const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const app = express()


//mongodb
dotenv.config({path:'./config/config.env' });
const connectDB = require('./config/db')
dotenv.config({path:'./config/config.env' });
//connect to database
connectDB(); 


app.use(express.json ({extended: true}))

app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/guests',require('./routes/guests'))



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running in${process.env.NODE_ENV} mode on port
${PORT}`.yellow.bold));
const express = require('express');
const http =require('http');
const morgan = require('morgan');
const path = require('path');

// refresh auto when changes happend in js
// npm i -g nodemon

const app = express();

//to load current directory all files
app.use(express.static(__dirname));

// to get log messages
app.use(morgan('dev'));

// render index.html file
app.get('/',(req,res)=>{
    res.status(200);
    // res.sendFile(__dirname +"\\"+"index.html");
    res.sendFile(path.join(__dirname +'/index.html'));
});

// app.get('/test', (req,res)=>{
//     res.sendFile(path.join(__dirname +'/test.html'));
// })

// catch 404 and forward to error handler
app.use(function(req,res,next){
    const error = new Error('URL Not found');
    error.status = 404 ;
    next(error);
});

// error handler
app.use(function(err,req,res,next){
    console.log(`error handler: ${err.message}`);
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname +'/ErrorPage.html'));
    
});


const port = process.env.PORT || 8080;

// create server
const server = http.createServer(app);

// run server on a port
server.listen(port,()=>{
    console.log(__dirname);
    console.log(`Server is listening on port: ${port}`);
    console.log(`Server start time in IST: ${new Date().toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})}`);
});
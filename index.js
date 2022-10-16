const express = require('express');
const http =require('http');
const morgan = require('morgan');
const path = require('path');

// refresh auto when changes happend in js
// npm i -g nodemon
require(__dirname);

const app = express();

//to load current directory all files
app.use(express.static(__dirname));

// to get log messages
app.use(morgan('dev'));

// render index.html file
app.get('/',(req,res)=>{
    // res.sendFile(__dirname +"\\"+"index.html");
    res.sendFile(path.join(__dirname +'/index.html'));
});

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
    
    /*
    res.status(err.status || 500 );
    res.json({
        error: err.message
    });*/
});

/*
app.use(function(req,res,next){
    res.status(404).json({
        error: 'bad url'
    })
})
*/
const port = process.env.PORT || 8080;

// create server
const server = http.createServer(app);

// run server on a port
server.listen(port,()=>{
    console.log(__dirname);
    console.log(`Server is listening on port: ${port}`);
    console.log(`Server start time in IST: ${new Date().toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})}`);
})
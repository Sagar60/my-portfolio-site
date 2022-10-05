const express = require('express');
const http =require('http');

// refresh auto when changes happend in js
// npm i -g nodemon
require(__dirname);

const app = express();

//to load current directory all files
app.use(express.static(__dirname))

// render index.html file
app.get('/',(req,res)=>{
    // res.sendFile(__dirname +"\\"+"index.html");
    res.render(__dirname +"\\"+"index.html");
})

const port = process.env.PORT || 8080;

// create server
const server = http.createServer(app);

// run server on a port
server.listen(port,()=>{
    console.log(__dirname);
    console.log(`Server is listening on port: ${port}`);
    console.log(`Server start time in IST: ${new Date().toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})}`);
})
const express = require('express');
const http =require('http');

const app = express();

//to load current directory all files
app.use(express.static(__dirname))

// render index.html file
app.get('/',(req,res)=>{
    res.sendFile(__dirname +"\\"+"index.html");
})

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log(__dirname);
    console.log(`server started at ${port}`);
})
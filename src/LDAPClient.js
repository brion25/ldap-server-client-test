import express from "express";

var app = express();

var server = app.listen(process.env.CLIENT_PORT || 3001,() =>{
    var port = server.address().port.toString(),
        address = server.address().address;
    
    console.log(`Client Server running at http://${address}:${port}`);
});
import express from "express";
import path from "path"
import bodyParser from "body-parser";
import {createClient} from "ldapjs";

var app = express();

app.use(express.static(path.join(__dirname,'./../form')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/auth',(req,res) => {
    console.log(req.body);
    res.send("Hello!!!");
});

var server = app.listen(process.env.CLIENT_PORT || 8080,() => {
    
    var port = server.address().port.toString(),
        address = server.address().address;
    
    console.log(`Client Server running at http://${address}:${port}`);
});

//Let's connect to our LDAP System
var client = createClient({
    url:'ldap://127.0.0.1:3000'
});

//Now Let's add a dummy user
var dummyUser = {
    cn : "John Doe",
    sn:'bar',
    email:["john.doe@example.com"],
    objectClass:"person"
}

client.add('cn=John Doe,o=example',dummyUser,(err) => {
    if(err){
        console.log(err);
    }
});

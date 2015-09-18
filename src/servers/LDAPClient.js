import express from "express";
import path from "path"
import bodyParser from "body-parser";
import {createClient} from "ldapjs";

//Let's connect to our LDAP System
var client = createClient({
    url:'ldap://127.0.0.1:3000'
});

//Now Let's add a dummy user
var dummyUser = {
    cn : ["John"],
    sn:'Doe',
    email:"john.doe@example.com",
    password:"root",
    objectClass:"user",
    dc:"employee"
}

client.add('cn=John Doe,o=example',dummyUser,(err) => {
    if(err){
        console.log("client error",err);
    }
});

var app = express();

app.use(express.static(path.join(__dirname,'./../form')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/auth',(req,res) => {
    client.bind(`email=${req.body.user}`,req.body.pass,(err) => {
        if(err){
            console.log(err);
            res.json({
                success:false,
                message:"Problems while doing the validation"
            });
        }else{
            client.search('o=example',{filter:`(email=${req.body.user})`, scope:'sub'}, (err,res) => {
                if(err) console.log(err);
                res.on("searchEntry",function(entry){
                    console.log("entry",entry.object);
                })
            })
            
            
            res.json({
                success:true,
                message:""
            });
        }
    });
});

app.post('/user',(req,res) => {
    console.log(req.body);
    client.add(`cn=${req.body.cn} ${req.body.sn},o=example`,req.body,(err) => {
        if(err){
            console.log("client error",err);
            res.json({
                success:false,
                message:"Problems with LDAP"
            });
        }
    });
});

var server = app.listen(process.env.CLIENT_PORT || 8080,() => {
    
    var port = server.address().port.toString(),
        address = server.address().address;
    
    console.log(`Client Server running at http://${address}:${port}`);
});
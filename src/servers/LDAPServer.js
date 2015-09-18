import ldap from "ldapjs";
import {ConstraintViolationError, EntryAlreadyExistsError, InvalidCredentialsError} from "ldapjs";

//Starting the Server - for this instance we are using the port 3000, but normally the port used for LDAP is 389
var server = ldap.createServer();

server.add("o=example",(req,res,next) => {
    console.log(req.dn.rdns[0].cn,req.users);
    if(!req.dn.rdns[0].cn){
        console.log("CN Required");
        return next(new ConstraintViolationError("CN Required"));
    }
    if(req.users && req.users[req.dn.rdns[0].cn]){
        console.log("User already exist");
        return next(new EntryAlreadyExistsError(req.dn.toString()));
    }
    var user = req.toObject().attributes;
    
    server.bind(`email=${user.email[0]}`,(req,res, next) => {
        //console.log(req.dn, req.credentials);
        
        server.search('o=example', (res,req,next) => {
            console.log("search", req);
        });
        
        res.end();
        return next();
    });
    
    console.log(req.toObject().attributes);
    return next();
});

server.listen(3000,'127.0.0.1',() => {
    console.log(`LDAP server is running at: ${server.url}`);
});
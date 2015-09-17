import ldap from "ldapjs";

//Starting the Server - for this instance we are using the port 3000, but normally the port used for LDAP is 389
var server = ldap.createServer();

server.add("o=example",(req,res,next) => {
    console.log("good!",req.toObject().attributes)
});

server.listen(3000,'127.0.0.1',() => {
    console.log(`LDAP server is running at: ${server.url}`);
});
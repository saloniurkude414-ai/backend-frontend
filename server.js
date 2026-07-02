const express = require("express");
const sqlite = require("sqlite3");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const db = new sqlite.Database("reg.db");
db.run('CREATE TABLE IF NOT EXISTS users1(name TEXT, email TEXT, password TEXT, confirm_password TEXT, phone TEXT, address TEXT, education TEXT)');

app.post("/register", function (req, res){
    let name = req.body.fullname;
    let email = req.body.email;
    let password = req.body.pass;
    let confirm_password = req.body.confirm_password;
    let phone = req.body.phone;
    let address = req.body.address;
    let education = req.body.education;

    db.run("INSERT INTO users1 VALUES(?,?,?,?,?,?,?)",[name, email, password, confirm_password, phone, address, education]);
    res.send(`
        <body style="background-color: #9ac6ed; text-align: center; font-family: sans-serif; padding-top: 50px;">
        <h2 style="color: #d078c6;">Registration Successful</h2>
        <a href="/" style="color: #ef98b7; text-decoration: none;">Go back to Home</a>
        </body>
    `);
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/public_html/index.html");
});

app.listen(2031,function(){
    console.log("Server Running On Port 2031");
});
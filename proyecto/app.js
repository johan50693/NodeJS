


var express = require("express");
var bodyParser = require("body-parser");

var app= express();
var mongoose= require("mongoose");
var Schema= mongoose.Schema;

mongoose.connect("mongodb://localhost/proyecto");

var userSchemaJSON= {
	email:String,
	password:String
}

var user_schema= new Schema(userSchemaJSON);

var User= mongoose.model("User",user_schema);


app.use('/static',express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","jade");

app.get("/", function(req,res){
	res.render("index", {nombre: "Albert"});
});

app.get("/login", function(req,res){
	res.render("login");
});

app.post("/user",function(req,res){
	console.log("Contraseña: "+ req.body.password);
	console.log("Email: "+ req.body.email);
	res.send("Datos recibidos");
});


app.listen(8080);
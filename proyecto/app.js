


var express = require("express");
var bodyParser = require("body-parser");

var app= express();

var mongoose= require("mongoose");
var Schema= mongoose.Schema;

mongoose.Promise= global.Promise;
mongoose.connection.openUri("mongodb://localhost/proyecto");

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
	
	User.find(function(err,doc){
		console.log(doc);
		res.render("login");
	})
	
});

app.post("/user",function(req,res){
	
	var user= new User({email: req.body.email, password: req.body.password});

	user.save(function(){
		console.log(req.body);
		res.send("El Usuario fue registrado exitosamente");	
	});
	
});


app.listen(8080);



var express = require("express");
var bodyParser = require("body-parser");

var User= require("./models/users").User;

var app= express();


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
	});
	
});

app.post("/user",function(req,res){
	
	var user= new User({
		email: req.body.email, 
		password: req.body.password, 
		password_confirmation: req.body.password_confirmation,
		username: req.body.username
	});

	console.log(user.password_confirmation);

	user.save(function(err){
		console.log(req.body);
		if (err) {
			console.log(String(err));
		}

		res.send("El Usuario fue registrado exitosamente");	
	});
	
});


app.listen(8080);
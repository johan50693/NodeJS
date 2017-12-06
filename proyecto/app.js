


var express = require("express");
var bodyParser = require("body-parser");

var User= require("./models/users").User;

var app= express();
var session= require("express-session");


app.use('/static',express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: "123qwerty",
	resave: false,
	saveUninitialized: false
}));

app.set("view engine","jade");

app.get("/", function(req,res){
	console.log(req.session.user_id);
	res.render("index", {nombre: "Albert"});
});

app.get("/login", function(req,res){
	
	res.render("login");
	
});

app.get("/signup", function(req,res){
	
	User.find(function(err,doc){
		// console.log(doc);
		res.render("signup");
	});
	
});

app.post("/user",function(req,res){
	
	var user= new User({
		email: req.body.email, 
		password: req.body.password, 
		password_confirmation: req.body.password_confirmation,
		username: req.body.username
	});

	// console.log(user.password_confirmation);

	user.save(function(err){
		console.log(req.body);
		if (err) {
			console.log(String(err));
		}

		res.send("El Usuario fue registrado exitosamente");	
	});
	
});

app.post("/sessions",function(req,res){
	
	User.findOne({email: req.body.email, password: req.body.password}, function(err,user){
		
		req.session.user_id= user._id;
		res.send("Sesión iniciada");
	});
		
});


app.listen(8080);
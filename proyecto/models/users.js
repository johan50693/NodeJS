
var mongoose= require("mongoose");
var Schema= mongoose.Schema;

mongoose.Promise= global.Promise;
mongoose.connection.openUri("mongodb://localhost/proyecto");

var user_Schema= new Schema({

	name: String,
	username: String,
	password: String,
	age: Number,
	email:String,
	date_of_birth: Date
});

user_Schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c= password;
});

var User = mongoose.model("User",user_Schema);

module.exports.User =User;
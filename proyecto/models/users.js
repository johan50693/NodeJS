
var mongoose= require("mongoose");
var Schema= mongoose.Schema;

mongoose.Promise= global.Promise;
mongoose.connection.openUri("mongodb://localhost/proyecto");

var posibles_valores= ["M","F"];
var email_match=[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"El email no es válido"];

var password_validation={
			validator: function(p){
				return this.password_confirmation == p;
			},
			message: "Las contraseñas no coinciden"
		}

var user_Schema= new Schema({

	name: String,
	username: String,
	password: {
		type: String, 
		minlength:[5,"La clave no debe ser menor a 5 caracteres"],
		validate: password_validation
	},
	age: {type: Number, min:[5,"La edad no puede ser menor a 5"],max:['La edad no puede ser mayor a 100']},
	email:{type: String, required: true,match:email_match},
	date_of_birth: Date,
	sex: {type: String, enum:{values: posibles_valores,message:"Opción no válida"}}
});

user_Schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c= password;
});

var User = mongoose.model("User",user_Schema);

module.exports.User =User;
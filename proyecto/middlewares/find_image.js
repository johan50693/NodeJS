
var Imagen= require("../models/imagenes");

module.exports = function(req,res,next){
	Imagen.findById(req.params.id)
		  .populate("creator")
		  .exec(function(err,imagen){
			if (imagen != null) {
				// console.log("Encontrada imagen: "+ imagen.title+" Id: "+imagen.creator);
				res.locals.imagen= imagen;
				next();
			}else{
				res.redirect("/app");
			}
			})
}
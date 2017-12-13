

var express= require("express");
var Imagen= require("./models/imagenes");
var router= express.Router();

var image_finder_middleware= require("./middlewares/find_image");

var fs= require("fs");

// var multer= require('multer');
// var upload= multer({dest: 'uploads/'});


router.get("/",function(req,res){

	Imagen.find({})
		  .populate("creator")
		  .exec(function(err,imagenes){
		  	if(err) console.log(err);
			res.render("app/home",{imagenes: imagenes});	  	
		  })
	
});

router.get("/imagenes/new",function(req,res){
	res.render("app/imagenes/new");
});

router.all("/imagenes/:id*",image_finder_middleware);

router.get("/imagenes/:id/edit",function(req,res){
	// Imagen.findById(req.params.id,function(err,imagen){
		res.render("app/imagenes/edit");
	// });
});


router.route("/imagenes/:id")

	.get(function(req,res){
		// Imagen.findById(req.params.id,function(err,imagen){
			res.render("app/imagenes/show");
		// });
		
	})

	.put(function(req,res){
		// Imagen.findById(req.params.id,function(err,imagen){
			res.locals.imagen.title= req.body.title;
			res.locals.imagen.save(function(err){
				if (!err) {
					res.render("app/imagenes/show");
				}else{
					res.render("app/imagenes/"+req.params.id+"edit");
				}
			});
			
		// });
	})

	.delete(function(req,res){
		Imagen.findOneAndRemove({_id: req.params.id},function(err){
			if (!err) {
				res.redirect("/app/imagenes");
			}else{
				console.log(err);
				res.redirect("/app/imagenes"+req.params.id);
			}
		});
	});

router.route("/imagenes")

	.get(function(req,res){
		Imagen.find({creator: res.locals.user._id},function(err,imagenes){
			if (err) {res.redirect("/app"); return;}
			//console.log(imagenes);
			res.render("app/imagenes/index",{imagenes: imagenes});
		});
	})

	.post(function(req,res){
		//console.log(res);
	
		var extension= req.files.archivo.name.split(".").pop();
   		console.log(req.body);
   		console.log(req.files.archivo.path);
		console.log("User: "+res.locals.user._id);
		console.log("Extension: "+ extension);

		var data= {
			title: req.body.title,
			creator: res.locals.user._id,
			extension: extension
		}

		var imagen = new Imagen(data);

		imagen.save(function(err){
			if (!err) {

				var ruta_archivo= req.files.archivo.path;
				var nueva_ruta= "./public/imagenes/"+imagen._id+"."+extension;

				/*copia el archivo desde tmp hasta nueva ruta*/
				fs.createReadStream(ruta_archivo).pipe(fs.createWriteStream(nueva_ruta));
				res.redirect("/app/imagenes/"+imagen._id);
			}else{
				res.render(err);
			}
		});
	});


module.exports= router;
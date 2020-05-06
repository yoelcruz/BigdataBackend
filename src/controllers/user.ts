
var bcrypt = require('bcrypt-nodejs');

var fs = require('fs'); //nos permite trabajar con archivos
var path = require('path'); //nos permite trabajar con rutas de archivos
var jwt = require('../services/jwt');

import { User } from '../models/user';



// Métodos de prueba
function home(req: any, res: any){
	res.status(200).send({
		message: 'Hola mundo desde el servidor de NodeJS'
	});
}

function pruebas(req: any, res: any){
	console.log(req.body);
	res.status(200).send({
		message: 'Acción de pruebas en el servidor de NodeJS'
	});
}

// Actualizar datos de un usuario pasandole nueva información
function updateUser(req: any, res: any){
	const userId = req.params.id;
	const update = req.body;
	console.log('id', req.user.sub);
	//borrar propiedad password
	delete update.password;

	if(userId != req.user.sub){
		return res.status(500).send({message: 'No tienes permiso para actualizar los datos del usuario'});
	}

	User.find({ $or: [{ email: update.email.toLowerCase() }, { nick: update.nick.toLowerCase() }, { _id: req.user.sub }]})
		.exec((err: any, users: any) => {
			//console.log('users',users);
			if(users.length > 1 ){   
				return res.status(404).send({message: 'Los datos ya están en uso'});
			}

			else{
				User.findByIdAndUpdate(userId, update, {new:true}, (err: any, userUpdated: any) => {
					if(err) return res.status(500).send({message: 'Error en la peticion'});
			
					if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			
					return res.status(200).send({user: userUpdated});  
				});
			}
	});	
}

function isExtensionValid(extension: string){
	return extension === 'png' || extension == 'jpg' || extension == 'jpeg' || extension == 'gif';
}

// subir archivos de imagen/avatar de usuario
function uploadImage(req: any, res: any){

	if(!req.files){
        return res.status(400).send({message: 'No se han subido imagenes'});
    }

	const imagePath = req.files.image.path;
	const tokenizedFilePath = imagePath.split('\\');
    const imageName = tokenizedFilePath[tokenizedFilePath.length-1];
    const imageExtension = imageName.split('.')[1]; 

	if(!isExtensionValid(imageExtension)){
        return removeFilesOfUploads(res, imagePath, 'Extensión no válida');
	}
	
	const userId = req.params.id;
	if(userId != req.user.sub){
		return removeFilesOfUploads(res, imagePath, 'No tienes permiso para actualizar los datos del usuario');
	}
	else {
		// Actualizar documento de usuario logueado
		User.findByIdAndUpdate(userId, {image: imageName}, {new:true}, (err: any, userUpdated: any) =>{
			if(err) return res.status(500).send({message: 'Error en la peticion'});

			if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

			return res.status(200).send({user: userUpdated});
		});
	}
}

function removeFilesOfUploads(res: any, file_path: any, message: any){
	fs.unlink(file_path, (err: any) => {
		//status(400) badrequest
		return res.status(400).send({message: message});
	});
}

function getImageFile(req: any, res: any){
	var image_file = req.params.imageFile;
	var path_file = './src/uploads/imageUsers/'+ image_file;
	console.log('pathfile', path_file);

	fs.exists(path_file, (exists: any) => {
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen'});
		}
	});
}



module.exports = {
	home,
	pruebas,
	updateUser,
	uploadImage,
	getImageFile
}
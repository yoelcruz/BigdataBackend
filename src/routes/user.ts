

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty'); //para poder subir la imagen
var md_upload = multipart({ uploadDir: './src/uploads/imageUsers'}); //directorio de subidas, donde se van a guardar los ficheros que suba el multiparti

api.get('/home', UserController.home);
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);//para actualizar es el método put
api.post('/user/:id/pushImage', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/user/:imageFile/getImage', UserController.getImageFile);

module.exports = api;


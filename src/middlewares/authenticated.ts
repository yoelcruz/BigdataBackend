

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso_desarrollar_red_social_angular';

exports.ensureAuth = function (req: any, res: any, next: any){
	if(!req.headers.authorization){
		return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticacion'});
	}
	//sustituir comillas simples o dobles que haya en todo el string por nada
	var token = req.headers.authorization.replace(/['"]+/g, ''); 

	try{
		var payload = jwt.decode(token, secret); //el secret es la clave secreta

		if(payload.exp <= moment().unix()){ //si la fecha es mejor a la que estamos ahora
			return res.status(401).send({
				message: 'El token ha expirado'
			});
		}

	}catch(ex){ //en el caso de que el token no venga bien
		return res.status(404).send({
				message: 'El token no es válido'
			});
	}

	req.user = payload;
	
	next();
}
import mongoose, {Schema, Document} from 'mongoose';


export interface IUser extends Document {   
	name: string;
	surname: string;
	nick: string;
	email: string;
	password: string;
	role: string;
	image?: string;
}

var UserSchema = new Schema({
		//_id lo pone de forma automatica
		name: String,
		surname: String,
		nick: String,
		email: String,
		password: String,
		role: String,
		image: String
});


//module.exports = mongoose.model('User', UserSchema);

export const User = mongoose.model<IUser>('User', UserSchema);
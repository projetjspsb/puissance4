const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({ id : Number, pseudo: String, couleur: String});
const userSchema = new Schema({
    name:{
        type : String,
        required :true
    },
    email:{
        type : String,
        required :true
    },
    phone:{
        type : String,
        required :true
    },
    password:{
        type : String,
        required :true
    },
    lines:{
        type : Number,
        default: 7
    },
    column:{
        type : Number,
        default: 6
    },
    goal:{
        type : Number,
        default: 4
    },
    joueurs:{
        type : Array,
        default: [
			{id : 1, pseudo: "Joueur 1", couleur: '#FF0000'},
			{id : 2, pseudo: "Joueur 2", couleur: '#FFFF00'},
	]
    },
    id_joueur:{
        type : PlayerSchema,
        default: {id : 1, pseudo: "Joueur 1", couleur: '#FF0000'}
    },
    couleur:{
        type: String,
        default: "#0000FF"
    }
}, {timestamps : true});

const User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose= require('passport-local-mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Se necesita correo']
    },

    username: {
        type: String,
        unique: true,
        required: [true, 'Se necesita nombre de usuario']

    },

    password: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },

    rutas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Ruta"
    }]
});

usuarioSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', usuarioSchema);
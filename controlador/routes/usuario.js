const express = require('express');
const Usuario = require('../models/usuario');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');



app.post("/usuario/registrar",function(req,res){
    var nUsuario = req.body.username;
    var nEmail = req.body.email;
    var nContraseña = req.body.password;
    var nContraseña2 = req.body.confirmpassword;

    if(nContraseña===nContraseña2){

        var nuevoUsuario ={email: nEmail, username: nUsuario, password:nContraseña};

        Usuario.create(nuevoUsuario,function(err,nuevo){

            if(err){
                console.log(err);
                res.write("Error al registrar usuario");
                res.redirect("/");
            }
            else{
                res.redirect("/");
            }
        });
    }
    else{
        res.redirect("/");
        console.log("Las contraseñas no coinciden.");
    }

});

app.get('/usuario', function(req, res) {

    Usuario.find({ estado: true }, 'email lat lng')
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    error: false,
                    usuarios,
                    total: conteo
                });

            });

        });

});



app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['email', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                error: true,
                mensaje: err
            });
        }

        res.json({
            error: false,
            usuario: usuarioDB
        });

    });

});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, eliminado) => {

        if (err) {
            return res.status(400).json({
                error: true,
                mensaje: err
            });
        }

        res.json({
            error: false,
            usuario: eliminado
        });

    });


});


module.exports = app;
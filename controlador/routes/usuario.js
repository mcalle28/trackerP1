const express = require('express');
const Usuario = require('../models/usuario');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');


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

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    usuario.save((err, usuarioDB) => {

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
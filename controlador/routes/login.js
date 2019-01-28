require('../config/config');


const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const app = express();


app.post('/login', (req, res) => {

    let body = req.body;
    if (!body.password) {
        return res.status(400).json({
            error: true,
            mensaje: "Ingrese todos los campos."
        });
    }

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                error: true,
                mensaje: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                error: true,
                mensaje: "!Usuario o contraseña incorrectos"
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                error: true,
                mensaje: "Usuario o !contraseña incorrectos"
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD });

        res.json({
            error: false,
            usuario: usuarioDB,
            token
        });

    });


});



module.exports = app;
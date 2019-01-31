require('../config/config');


const express = require('express');
const Usuario = require('../models/usuario');

var appDir=process.cwd();
const app = express();

app.use(express.static(appDir));
app.set('views', appDir+"/vista/sesion");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.post('/login', (req, res) => {


    let body = req.body;
    if (!body.password) {
        return res.status(400).json({
            error: true,
            mensaje: "Ingrese todos los campos."
        });
    }

    Usuario.findOne({ email: body.username }, (err, usuarioDB) => {


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

        if (!(body.password==usuarioDB.password)){
            return res.status(400).json({
                error: true,
                mensaje: "Usuario o !contraseña incorrectos"
            });
        }
       let id= usuarioDB.username;
        res.render('sesion.html', {id:id});

    });


});


module.exports = app;
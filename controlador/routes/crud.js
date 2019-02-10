const express = require('express');
const User = require('../models/usuario');
const Ruta = require('../models/rutas');
const _ = require('underscore');
var router = express.Router();


router.get('/usuario', function (req, res) {
    User.find({ estado: true }, 'username email')
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }

            User.countDocuments({ estado: true }, (err, conteo) => {

                res.json({
                    error: false,
                    usuarios,
                    total: conteo,
                    
                });

            });

        });

});

router.get('/usuario/:id/rutas', function (req, res) {
    let id = req.params.id;
    User.findById(id).populate("rutas")
        .exec((err, rutas) => {

            if (err) {
                return res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }

            else{

                res.json({
                    error: false,
                    rutas,
                    
                });

            }

        });

});


router.put('/usuario/:id', function (req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['email', 'estado']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

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


router.put('/usuario/:id/rutas/:id2', function (req, res) {

    let id = req.params.id;
    let id2=req.params.id2;

    let body = _.pick(req.body, ['nombre']);

    Ruta.findByIdAndUpdate(id2, body, { new: true, runValidators: true }, (err, ruta) => {

        if (err) {
            return res.status(400).json({
                error: true,
                mensaje: err
            });
        }

        res.json({
            error: false,
            ruta: ruta
        });

    });

});

router.delete('/usuario/:id', function (req, res) {

    let id = req.params.id;
    User.findByIdAndDelete(id, (err, eliminado) => {

        if (err) {
            return res.status(400).json({
                error: true,
                mensaje: err
            });
        }

        res.json({
            error: false,
            usuario: eliminado,
            mensaje: "usuario eliminado"
        });

    });


});

router.delete('/usuario/:id/rutas/:id2', function (req, res) {

    let id = req.params.id;
    let id2 =req.params.id2;
    Ruta.findByIdAndDelete(id2, (err, eliminado) => {

        if (err) {
            return res.status(400).json({
                error: true,
                mensaje: err
            });
        }

        res.json({
            error: false,
            ruta: eliminado,
            mensaje: "ruta eliminada"
        });

    });


});



module.exports = router;
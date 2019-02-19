const express = require('express');
var router=express.Router();
var Ruta = require("../models/rutas");
var User = require("../models/usuario");

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/");
    }
}

router.get("/sesion",isLoggedIn,function(req,res){
    res.render("rutas/elegiropciones.ejs");
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
  });

router.post("/sesion/nuevo",isLoggedIn,function(req,res){
    res.render("rutas/nuevaruta.ejs");
})

router.post("/sesion/ver",isLoggedIn,function(req,res){
    User.findById(req.user._id).populate("rutas").exec(function (err, user) {
        User.find({}, function(err, users){
        if (err) {
            console.log(err);
        } else {
            res.render("rutas/verruta.ejs", { user: user , users:users});
        }
        })
    })
})

router.post("/sesion/compartir", isLoggedIn, function (req, res) {
    User.findOne({ username: req.body.user }).populate("rutas").exec(function (err, Destino) {
        User.findById(req.user._id).populate("rutas").exec(function (err, currentUser) {
            var currentUserRoutes = currentUser.rutas;
            var tRoute;
            currentUserRoutes.forEach(ruta => {
                
                if (ruta.nombre === req.body.ruta && req.body.ruta != undefined) {

                    tRoute = ruta;
                }
            })
            if (Destino != null){
                Destino.rutas.push(tRoute);
                Destino.save();
            }
            res.redirect("/sesion/ver");
        })
    })
})


router.get("/sesion/nuevo",isLoggedIn,function(req,res){
    res.render("rutas/nuevaruta.ejs");
})

router.get("/sesion/ver",isLoggedIn,function(req,res){
    User.findById(req.user._id).populate("rutas").exec(function (err, user) {
        User.find({}, function(err, users){
        if (err) {
            console.log(err);
        } else {
            res.render("rutas/verruta.ejs", { user: user , users:users});
        }
        })
    })
})

router.get("/sesion/volver",isLoggedIn,function(req,res){
    res.redirect("/sesion");
})

router.get("/sesion/compartir",isLoggedIn,function(req,res){
})

router.post("/obtenerRuta", isLoggedIn, function(req, res){
    Ruta.findOne( {nombre: req.body.option }, function(err, ruta){
        if(err){
            console.log(err);
        } else {
            res.send(ruta);
        }
    })
}) 

router.post("/guardarRuta",isLoggedIn, function(req, res){
    guardarRuta(req, res);
});

function guardarRuta(req, res) {
    User.findById(req.user._id, function(err, user){
        encontrarUsuario(err, user,req, res);
    });
}

function encontrarUsuario(err, user, req, res) {
    if (err) {
        console.log(err)
    } else {
        Ruta.create({nombre:req.body.nombre}, function(err, route){
            crearRuta(err, route, user,req, res)
        })
    }
}

function crearRuta(err, route, user, req, res){
    if (err) {
        console.log(err)
    } else {
        var puntos = req.body.puntos;
        route.puntos = puntos;
        route.save();
        user.rutas.push(route);
        user.save();
        res.redirect("/track");
    }
}



module.exports = router;
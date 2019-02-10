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
        if (err) {
            console.log(err);
        } else {
            res.render("rutas/verruta.ejs", { user: user });
        }
    })
})

router.post("/sesion/compartir",isLoggedIn,function(req,res){
        res.render("rutas/compartir.ejs"); 
})


router.get("/sesion/nuevo",isLoggedIn,function(req,res){
    res.render("rutas/nuevaruta.ejs");
})

router.get("/sesion/ver",isLoggedIn,function(req,res){
    User.findById(req.user._id).populate("usuarios").exec(function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.render("rutas/verruta.ejs", { user: user });
        }
    })
})

router.get("/sesion/volver",isLoggedIn,function(req,res){
    res.redirect("/sesion");
})

router.get("/sesion/compartir",isLoggedIn,function(req,res){
            res.render("rutas/compartir.ejs");
})

router.get('/user/amigos', async(req, res) => {
    const userdb = await User.find()
    res.render('user/amigo', { userdb });
  });


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
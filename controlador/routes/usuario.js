const express = require('express');
const User = require('../models/usuario');
var router=express.Router();
const passport= require('passport');


router.post('/registro',function(req,res){
    var newUser= new User({username: req.body.username, email:req.body.email});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            res.render("registro.ejs");
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("/");
        });
    });
});



router.post("/login", passport.authenticate("local",
{
    successRedirect: "/sesion",
    failureRedirect: "/"
}));


module.exports = router;
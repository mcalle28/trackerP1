require('../config/config');


const express = require('express');
const Usuario = require('../models/usuario');

var appDir=process.cwd();
const app = express();

app.use(express.static(appDir));
app.set('views', appDir+"/vista/sesion");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get("/usuario/:id", function(req,res){
    Usuario.findById(req.params.id, function(err,usuarioDB){
        if(err){
            res.redirect("/");
        }
        else{
            let ide= usuarioDB.username;
            console.log(usuarioDB.username);
            res.render('sesion.html', {ide:ide});
        }
    });

});



module.exports = app;
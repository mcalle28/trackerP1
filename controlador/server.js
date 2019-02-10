require('./config/config');
var indexRoute= require("./routes/index");
var userRoute= require("./routes/usuario");
var sesionRoute= require("./routes/sesion");
var crudRoute= require("./routes/crud");

const mongoose = require('mongoose');
const User = require('./models/usuario');
const express = require('express');
const methodOverride= require('method-override');
const expressSanitizer =require("express-sanitizer");
const bodyParser = require('body-parser');
const path = require('path');
const publicPath = path.resolve(__dirname, '../views');
const resourcePath= path.resolve(__dirname,'../public');
const passport = require('passport');
const LocalStrategy = require('passport-local');


const app = express();

mongoose.connect('mongodb://db/telematica', {useCreateIndex: true,useFindAndModify:false,useNewUrlParser:true});
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(resourcePath));
app.use(express.static(publicPath));
app.set("views engine","ejs");


app.use(require("express-session")({
    secret : "edoguda",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

app.use(indexRoute);
app.use(sesionRoute);
app.use(userRoute);
app.use(crudRoute);

app.listen(process.env.PORT, () => {
    console.log(`Puerto: ${process.env.PORT}`);
});


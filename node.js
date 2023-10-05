const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoUri = "mongodb+srv://Marjella:Marjella@diamondburg.lxfxn0d.mongodb.net/?retryWrites=true&w=majority"
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({secret:"BigKahuna",resave:false , saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());



mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) .then (()=> {
    console.log("Marjella Ke Star")
}) .catch((error)=> {
    console.error("Error Experienced: ", error)
})

app.get("/",(req,res)=> {
    res.send("Dundiditagain")
})






app.listen(5000, ()=> {
    console.log("Danko Supreme")
})
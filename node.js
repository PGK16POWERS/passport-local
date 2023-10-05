const express = require("express");
const app = express();
const path = require("path")
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
app.use(express.static("public"))


mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) .then (()=> {
    console.log("Marjella Ke Star")
}) .catch((error)=> {
    console.error("Error Experienced: ", error)
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

const userCollection = mongoose.model("Member",userSchema);





app.get("/",(req,res)=> {
    res.sendFile(path.join(__dirname, "public","signUp.html"));
})

app.post("/signup",async (req,res)=> {
    const { name, email, password } = req.body;
    const newUser = new userCollection({name, email, password});

    const checkDb = await userCollection.findOne({email});

    if(!checkDb) {
        await newUser.save();
        console.log("New doc loaded Marjella")
        res.redirect("login.html");

    } else if(checkDb) {
        console.log("Error trying to sign-Up, User already exists");
        res.redirect("signUp.html");
    }
})

app.get("/login", (req,res)=> {
    res.sendFile(path.join(__dirname,"public","login.html"));
})


app.listen(5000, ()=> {
    console.log("Danko Supreme")
})
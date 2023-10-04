const express = require("express");
const passport = require("passport");
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.session({secret: "Secret_Key"}));
app.use(passport.initialize());
app.use(passport.session());





app.listen(5400, ()=> {
    console.log("Danko Supreme")
})
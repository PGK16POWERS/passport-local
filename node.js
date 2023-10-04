const express = require("express");
const passport = require("passport");
const app = express();


app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.session({secret: "Secret_Key"}));
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req,res)=> {
    res.sendFile(path.join(__diename,"public","signup.html"));
});



app.listen(5400, ()=> {
    console.log("Danko Supreme")
})
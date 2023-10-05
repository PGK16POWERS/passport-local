const express = require("express");
const app = express();
const mongoose = require("mongoose");




app.get("/",(req,res)=> {
    res.send("Dundiditagain")
})






app.listen(5000, ()=> {
    console.log("Danko Supreme")
})
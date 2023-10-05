const express = require("express");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const app = express();


// MIDDLEWARES
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.session({
    secret: "Secret_Key",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find((u) => u.username === username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    const user = users.find((u) => u.id === id);
    done(null, user);
  });


app.get("/", (req,res)=> {
    res.sendFile(path.join(__diename,"public","signup.html"));
});



app.listen(5400, ()=> {
    console.log("Danko Supreme")
})
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const mongoUri = "mongodb+srv://Marjella:Marjella@diamondburg.lxfxn0d.mongodb.net/?retryWrites=true&w=majority"

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "BigKahuna", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(require('express-flash')());
app.use(passport.session());
app.use(express.static("public"));

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Marjella Ke Star");
}).catch((error) => {
    console.error("Error Experienced: ", error);
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("Member", userSchema);

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        })
        .catch((err) => {
            return done(err);
        });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('login.html');
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signUp.html"));
});

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });

    const checkDb = await User.findOne({ email });

    if (!checkDb) {
        await newUser.save();
        console.log("New doc loaded Marjella");
        res.redirect("login.html");
    } else {
        console.log("Error trying to sign-Up, User already exists");
        res.redirect("signUp.html");
    }
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login",
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login.html',
        failureFlash: true,
    })
);

app.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname,"public","dashboard.html"));
});

app.get("/dashboard.html", ensureAuthenticated, (req,res)=> {
    res.sendFile(path.join(__dirname,"public","dashboard.html"));
} )

app.listen(5000, () => {
    console.log("Danko Supreme");
});

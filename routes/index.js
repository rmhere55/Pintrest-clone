var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const userModel = require('./users')
const postModel = require('./post')
var passport = require("passport")

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()))

// "https://picsum.photos/500/400?random=3"
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/feed', function(req, res, next) {
  res.render('feed');
});
router.get('/profile', isLoggedIn,function(req, res, next) {
  res.send("profile")
});



router.post('/register', function(req, res, next) {
  const { username, email, fullname, password } = req.body;

  let userData = new userModel({ username, email, fullname });

  userModel.register(userData, password)
    .then(function() {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/profile');
      });
    })
    .catch(next); // Handles any errors
});



router.post('/login', passport.authenticate("local", {
  successRedirect:"/profile",
  failureRedirect:"/"
}) 
, function(req,res){

});

router.get("/logout" , function(req,res ){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isLoggedIn (req, res , next){
  if(req.isAuthenticated()) return next();
  res.redirect('/')
}
module.exports = router;
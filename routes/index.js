var express = require('express');
var router = express.Router();
// const mongoose = require('mongoose')
const userModel = require('./users')
const postModel = require('./post')
// const upload= require("./multer");
var passport = require("passport")
const upload = require('./multer')

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()))

// "https://picsum.photos/500/400?random=3"
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res, next) {
  res.render('login' , {error: req.flash('error')});
});
router.get('/feed', function(req, res, next) {
  res.render('feed');
});

router.post('/upload', isLoggedIn, upload.single("file"),  async function(req, res, next) {
  if(!req.file){
     return res.status("404").send("no files were found")
  }
  // try {
    const user = await userModel.findOne({username:req.session.passport.user});
  //   if (!user) {
  //     return res.status(404).send('User not found');
  // }

    const post = await postModel.create({
        image: req.file.filename,
        imageText: req.body.filecaption,
        user: user._id
    });
    if (!user.posts) {
      user.posts = [];
  }
    user.posts.push(post._id); // Push post ID into user's posts array
    console.log(post._id);

    //  user.posts.push(post._id)

    await user.save(); // Save the user after modifying posts
    res.redirect("/profile");
  // }

//catch (err) {
//     console.error(err);
//     // Handle the error appropriately, e.g., send an error response
//     res.status(500).send("Internal Server Error");
// }

  // jo file uploads hue hai save kro ass a post and uska  post ki id hogi usko post par user ki id hogi 
});



// router.post('/upload', isLoggedIn, upload.single("file"), async function(req, res, next) {
//   if (!req.file) {
//       return res.status(404).send("No files were found");
//   }

//   try {
//       const user = await userModel.findOne({ username: req.session.passport.user });
//       // if (!user) {
//       //     return res.status(404).send('User not found');
//       // }

//       const post = await postModel.create({
//           image: req.file.filename,
//           imageText: req.body.filecaption,
//           user: user._id
//       });

//       // if (!user.posts) {
//       //     user.posts = [];
//       // }
//       user.posts.push(post._id);
//       await user.save();

//       res.redirect("/profile");
//   } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//   }
// });

// router.get('/profile', function(req, res, next) {
//   res.render('profile');
// });


router.get('/profile', isLoggedIn,async function(req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user

  })
  .populate("posts")
  console.log(user);
  res.render("profile" , {user})
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
  failureRedirect:"/login",
  failureFlash: true
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
  res.redirect('/login')
}
module.exports = router;

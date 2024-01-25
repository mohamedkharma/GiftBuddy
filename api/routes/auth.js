const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
//This will also hide the user password
router.post("/register", async (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    friends: [],
    wishlist: [],
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


//LOGIN
router.post('/login', async (req, res) => {
    try{
        //get the username 
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );
        //if wrong user
        !user && res.status(401).json("Wrong UserName");
        //get user password and uncrypt it
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        //uncrypted password
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        //store the password
        const inputPassword = req.body.password;
        //check if the user is correct or not
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");

        //verfiy users using tokens
        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router
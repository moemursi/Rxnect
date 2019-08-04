const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require('../../models/User')

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check(
      "password",
      "please enter a valid password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password}  =  req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ [{ "msg" : "username is already taken"}] });
      }    
    

    //get user's gravatar

    //encrypt the password using bcrypt

    //return json webtoken
    res.send("user route is here ");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error ")
      
    }
    
    
  }
);

module.exports = router;

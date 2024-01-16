const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');

const JWT_SECRET = "kalprateek@2692";
//Route 1 : create a user using post "/api/auth"
router.post('/createuser', [
    // For validation

    body('email', 'Enter a Valid Email').isEmail(),

    body('name', "Enter a Valid Name").isLength({ min: 3 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
],
    async (req, res) => {
        const errors = validationResult(req);
        // //console.log("found");
        let success=false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, msg: 'User already exists' });
            }
            const salt = await bcrypt.genSalt(10);
            let secPass = await bcrypt.hash(req.body.password, salt);
            // //console.log("found2");
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            const data = {
                user:{

                 id:User._id,
                }
             }
            //  //console.log("found3");
            const authToken = jwt.sign(data, JWT_SECRET);
            //console.log(authToken);
            success=true;
            res.json({success, authToken });
        } catch (error) {
            //console.log(error);
            res.status(500).send("Error Occured");
        }
    });

// Route 2 : to login a user and authentication
    router.post('/login', [
        body('email', 'Enter a Valid Email').isEmail(),
        body('password', 'Password cannot be blank').exists(),
    ],
    async (req, res) => {
    ////console.log("yha hu");
    // //console.log(req.body);
    const errors = validationResult (req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // const password =req.body.password;
    // const email =req.body.email;
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        let success=false;
        if (!user) {
            return res.status(400).json({ success,msg: "Invalid Credentials" });
        }
        const passcompare = await bcrypt.compare(password, user.password);
        if (!passcompare) {
            // success=false;
            
             return res.status(400).json({success, msg: "Invalid Credentials" });
        }
        const data = {
           user:{
            id:user._id,
           }
        }
        // //console.log(data);
        const authToken = jwt.sign(data, JWT_SECRET);
        //console.log(authToken);
        //console.log(success);
        success=true;
        
        res.json({ success,authToken });
        

    } catch (error) {
        //console.log(error);
        res.status(500).send("Error Occured");
    }
}
);

// Route 3: Fetch Details of user Login required 

router.post('/getuser',fetchuser,
async (req, res) => {
    try {
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        //console.log(user);
        res.send(user);
    } catch (error) {
        //console.log(error);
        res.status(500).send("Error Occured");
    }
});
module.exports = router;

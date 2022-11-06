const express = require('express');
const userModel  = require("../models/user_registration");
const router = express.Router();
const { passwordEncrptionNumber, jWT_SECRET_KEY } = require("../keys");
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get("/" , (req , res)=>{
    res.render("index");
});

router.get('/home' , (req , res)=>{
    res.render("home");
})

router.get('/login' , (req , res)=>{
    res.render("login");
})

router.get('/register' , (req , res)=>{
    res.render("register");
})

//create a new user in our database
// req.body.password; password will be name attribute value
router.post("/register" , async (req , res)=>{
    try{
        const {name, email,phoneno,password, confirmpassword} = req.body;
        //Todo: we will verify using email
        const verificationUrl = `http://localhost:4004/verification?${email}`;
        if(password !== confirmpassword){
            res.status(422).json({error:"Passwords are not matching"});
        }
        if(!email || !password || !phoneno){
            res.status(422).json({error:"please add email and password"});
        }
        const existingUser = await userModel.findOne({'email' : email});
        if(existingUser){
            return res.status(422).json({ error: "USER already exist" });
        }
        
        //hash to store password in hash form. Security if our db get hackend then hacker can not be able to login with this hash password
        const encrptedPassword = await bcrypt.hash(password,passwordEncrptionNumber)
        console.log('encrptedPassword', encrptedPassword);
        // Note:
        //we can never get back our password from encrptedPassword. It means it is one way of hashing
        //we can get encrptedPassword from normal password but reverse is not possible
        
        //it will used while login 
        //to verify that our given password is matched with db encypted password.
        const isMatched = await bcrypt.compare(password,encrptedPassword);
        console.log('isMatched', isMatched);
        
        //send this token while login
        //if password is matched then we generate this token and client will use this token in header to get verify
        const token = jwt.sign({email: email},jWT_SECRET_KEY, {expiresIn: '1d'}); //1h, 1d,1m 
        console.log('token', token)
        
        //get this token everytime when user want data
        //to get data in token
        const dataInToken = await jwt.verify(token, jWT_SECRET_KEY)
        console.log('dataInToken', dataInToken)

        const registerEmployee = new userModel({
            name : name,
            email : email,
            phoneno : phoneno,
            password : encrptedPassword,
            isVerified: false
        });
        const registered = await registerEmployee.save();
        console.log('registered', registered);
        res.status(201).send({token: token});
        // sendEmail();
        //console.log(req.body.firstname);
    }catch(error){
        res.send("Either Phone Number Or Email Id Is Matching / Something Went Wrong");
    }
})

//login
router.post("/login" , async(req , res) => {
    try{
        const {email, password} = req.body; 
        const userData = await userModel.findOne({email : email});
        const isMatched = await bcrypt.compare(password,userData.password);
        if(!isMatched){
            res.status(401).json({ error: "Invalid Email Or Password" });
        }
        const token = jwt.sign({email: email},jWT_SECRET_KEY, {expiresIn: '1d'}); //1h, 1d,1m, 1000ms 
            // console.log('token', token)
        res.status(200).send({token: token});
    }catch(err){
        res.status(400).json({ error: "Invalid Email Or Password" });
    }
})

//forget Password
router.get("/forgetPassword" , (req , res)=>{
    const verificationUrl = 'http://localhost:4004/verification';
    try{
       res.render("forgetPassword.hbs");
    }catch(err){
        res.status(400).send("Invalid Email Or Password");
    }
})

router.post("/forgetPassword" , async (req , res)=>{
    try{
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        const email = req.body.email;
        if( password === confirmpassword ){
            const useremail = await userModel.findOne({email : email});
            if(useremail){
                const updation = await userModel.updateOne({email:email} ,{$set : {password:password , confirmpassword:confirmpassword}});
                res.send("Password Updated");
            }
            else{
                res.send("Email not registered");
            }
        }
        else{
            res.send("Password not match");
        }
    }catch(err){
        res.status(400).send("Invalid Email Or Password");
    }
})

//verification via email
router.get("/verification", async(req,res)=>{
    // console.log(req.query.email);
    const email = req.query.email;
    const data = await userModel.findOne({email: email});
    const updation = await userModel.updateOne({email:email} ,{$set : {isVerified:true}});
    res.status(200).send(data);
})

module.exports = router;
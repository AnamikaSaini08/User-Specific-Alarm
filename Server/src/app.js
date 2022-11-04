const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const cors = require('cors')
//process.env.PORT this ensure that jha bhi run ho vha hmare project ko host kr sake || 3000 option
//database schema
const userModel = require("./models/user_registration");
const alarmModel = require("./models/alarm_model");
const {json} =  require('express');

app.use(cors())
const port = process.env.PORT || 4004;

const static_path = path.join(__dirname , '../public');
const templates_path = path.join(__dirname , '../templates/views');
const partials_path = path.join(__dirname , '../templates/partials');

//database connection
const connectDB = require('./db/conn');
connectDB();

//this is only sufficient for postman to get input from req-->app.use(express.json());
app.use(express.json());
//but to get input withput postman one more line(means we want to get input value so don't show undefined)
app.use(express.urlencoded({extended : false}));

app.use(express.static(static_path));
app.set("view engine" , "hbs");

//instead of looking views now see this(tell to express)
app.set("views" , templates_path);

//register partial files so express js know that partials files also used
hbs.registerPartials(partials_path);

app.get("/" , (req , res)=>{
    res.render("index");
});

app.get('/home' , (req , res)=>{
    res.render("home");
})

app.get('/login' , (req , res)=>{
    res.render("login");
})

app.get('/register' , (req , res)=>{
    res.render("register");
})

//create a new user in our database
// req.body.password; password will be name attribute value
app.post("/register" , async (req , res)=>{
    try{
        const verificationUrl = 'http://localhost:4004/verification';
        const password = req.body.password;
        const con_password = req.body.confirmpassword;
        if(password === con_password){
            //store in database
            const registerEmployee = new userModel({
                name : req.body.name,
                email : req.body.email,
                phoneno : req.body.phoneno,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword,
                isVerified: false
            });
            const registered = await registerEmployee.save();
            console.log('registered', registered);
            res.status(201).send("success");
        }else{
            res.send("Passwords are not matching");
        }
        //console.log(req.body.firstname);
    }catch(error){
        res.send("Either Phone Number Or Email Id Is Matching / Something Went Wrong");
    }
})

//login
app.post("/login" , async(req , res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await userModel.findOne({email : email});
        if(useremail.password === password){
            res.send("Success");
            res.render("home");
        }
        else{
            res.send("Invalid Email Or Password");
        }
    }catch(err){
        res.status(400).send("Invalid Email Or Password");
    }
})

//forget Password
app.get("/forgetPassword" , (req , res)=>{
    const verificationUrl = 'http://localhost:4004/verification';
    try{
       res.render("forgetPassword.hbs");
    }catch(err){
        res.status(400).send("Invalid Email Or Password");
    }
})

app.post("/forgetPassword" , async (req , res)=>{
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
app.get("/verification", async(req,res)=>{
    // console.log(req.query.email);
    const email = req.query.email;
    const data = await userModel.findOne({email: email});
    const updation = await userModel.updateOne({email:email} ,{$set : {isVerified:true}});
    res.status(200).send(data);
})

//add alarm 
app.post("/alarm/add", async(req,res)=> {
    console.log(req.body);
    const alarmObject = new alarmModel({
        alarmTime : req.body.alarmTime,
        userId : req.body.userId
    });
    const response = await alarmObject.save();
    console.log('response', response);
    res.status(200).send("Added Alarm");
})

//get all alarms, get user alarms userid=11, alarms
//can not because we want to host this
app.listen(port , ()=>{
    console.log(`server is running at port number ${port}`);
});
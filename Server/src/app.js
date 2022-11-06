const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const cors = require('cors')
//database schema
const userModel = require("./models/user_registration");
const alarmRoute = require("./Alarms/alarm");
const userRoute = require("./Users/user");

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

app.use("/alarm",alarmRoute);
app.use("/user", userRoute);
/alarm/

//get all alarms, get user alarms userid=11, alarms
//can not because we want to host this
app.listen(port , ()=>{
    console.log(`server is running at port number ${port}`);
});
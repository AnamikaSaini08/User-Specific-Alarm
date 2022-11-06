const express = require('express');
const alarmModel = require("../models/alarm_model");
const checkAuthentication = require("../middleWareAuthentication");
const router = express.Router();

router.post('/add', checkAuthentication, function(req, res) {
    console.log(req.body);
    const alarmObject = new alarmModel({
        alarmName: req.body.alarmName,
        alarmTime : req.body.alarmTime,
        userEmail : req.user.email,
        isActivate: req.body.isActivate || false
    });
    const response = alarmObject.save();
    console.log('response', response);
    res.status(200).send("Added Alarm");
});

router.get('/allAlarm', function(req,res){
    alarmModel.find().then(data => {
        res.status(200).json({data: data});
    })
    // return res.status(422).json({ error: "USER already exist" });
})

router.get('/userAlarm',checkAuthentication, function(req,res){
    const userEmail = req.user.email;
    try {
        alarmModel.find({email : userEmail}).then(data => {
            res.status(200).json({data: data});
        })

    }catch(error){
        res.status(500).json({error});
    }
})

router.post('/updateAlarm', checkAuthentication, function(req,res){
    try {
        alarmModel.updateOne({_id: req.body.id}, {$set:{isActivate : false}}).then(data => {
            res.status(200).json({data: data});
        })
    }catch(error){
        res.status(500).json({error});
    }
})

router.post('/', function(req, res) {
    res.send('POST handler for /alarm route.');
});

module.exports = router;
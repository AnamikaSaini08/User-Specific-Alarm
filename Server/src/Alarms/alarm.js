const express = require('express');
const alarmModel = require("../models/alarm_model");
const router = express.Router();

router.post('/add', function(req, res) {
    console.log(req.body);
    const alarmObject = new alarmModel({
        alarmName: req.body.alarmName,
        alarmTime : req.body.alarmTime,
        userId : req.body.userId,
        isActivate: req.body.isActivate
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

router.get('/userAlarm', function(req,res){
    console.log(req);
    const userId = req.headers.user_id;
    try {
        alarmModel.find({userId : userId}).then(data => {
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
const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema({
    alarmTime : {
        type: String , 
        required: true
    },
    userEmail : {
        type: String , 
        required: true
    },
    alarmName: {
        type: String
    },
    isActivate: {
        type: Boolean
    }
});

//now we need to create a collection model("collection name")

module.exports = mongoose.model("alarmTime" , alarmSchema);
const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema({
    alarmTime : {
        type: String , 
        required: true
    },
    userId : {
        type: String , 
        required: true
    }
});

//now we need to create a collection model("collection name")

module.exports = mongoose.model("alarmTime" , alarmSchema);
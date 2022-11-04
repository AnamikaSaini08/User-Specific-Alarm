const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type: String , 
        required: true
    },
    email : {
        type: String , 
        required: true,
        unique : true,
    },
    phoneno : {
        type: Number, 
        required: true,
        unique : true,
    },
    password : {
        type: String , 
        required: true
    },
    isVerified: {
        type: Boolean,
        require: true
    }
});

//now we need to create a collection model("collection name")

module.exports = mongoose.model("user" , userSchema);
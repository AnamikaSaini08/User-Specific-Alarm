const mongoose = require('mongoose');
const {mongoURI} = require("../keys");
function connectDB(){
    //DataBase Connection
    mongoose.connect(mongoURI ,
     {useNewUrlParser: true , useUnifiedTopology:true} );
    const connection = mongoose.connection;

    //event listener when db connect
    connection.once('open' , ()=>{
        console.log("DataBase Connected");
    })
}

module.exports = connectDB;

//url is credential  so this will kept into environment variable(env) and then import
// need package .env
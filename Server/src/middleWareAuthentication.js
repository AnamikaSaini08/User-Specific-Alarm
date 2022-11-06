const { jWT_SECRET_KEY } = require('./keys');
const jwt = require('jsonwebtoken');
const userModel  = require("./models/user_registration");

module.exports = async(req, res, next) => {
    const { authorization } = req.headers;
    // console.log('authorization', authorization);
    
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
    }
    
    const token = authorization;
    // const dataInToken = await jwt.verify(token, jWT_SECRET_KEY);
    // console.log('dataInToken', dataInToken)
    jwt.verify(token, jWT_SECRET_KEY, (err, payload) => {
        console.log('payload', payload);
        if (err) {
            return res.status(401).json({ error: "You must logged in" });
        }
        const { email } = payload;
        userModel.findOne({email:email}).then(LogInUser => {
            const {_id,email,name}= LogInUser; //we give user name,id,email by token
            req.user = {_id,email,name};
            next();
        })

    })
}
const aws = require('aws-sdk');
const ses = new aws.SES({region: "us-east-1"});
function sendEmail(data){
    const {toEmail, fromEmail,body} = data;
    const params = {
        Destination: {
            ToAddresses: [toEmail]
        },
        Message: {
            Body: {
                Text:{
                    Data: body
                }
            },
            Subject: {
                Data: "send mail for verification"
            }
        },
        Source: fromEmail
    };
    try{
        return ses.sendEmail(params).promise();
    }catch(error){
        console.log(error);
    }
    
}
module.exports = sendEmail
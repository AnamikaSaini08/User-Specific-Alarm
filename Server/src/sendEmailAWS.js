const aws = require('aws-sdk');
const ses = new aws.SES({region: "us-east-1"});
function sendEmail(){
    const params = {
        Destination: {
            ToAddresses: ["sunilkumarmaurya@gmail.com"]
        },
        Message: {
            Body: {
                Text:{
                    Data: "testing is going on"
                }
            },
            Subject: {
                Data: "send mail for verification"
            }
        },
        Source: "sunilkumarmaurya@gmail.com"
    };
    try{
        return ses.sendEmail(params).promise();
    }catch(error){
        console.log(error);
    }
    
}
sendEmail();
// function SendEmail() {
//     Email.send({
//       Host: "smtp.gmail.com",
//       Username: "shubham12342019@gmail.com",
//       Password: "chootabheem",
//       To: "sunilkumarmaurya786695@gmail.com",
//       From: document.getElementById("email").value,
//       Subject: "New Contact Form Enquiry",
//       Body:
//         "Name :" +
//         document.getElementById("name").value +
//         "<br> Email : " +
//         document.getElementById("email").value +
//         "<br> Phone No : " +
//         document.getElementById("phone").value +
//         "<br> Message : " +
//         document.getElementById("message").value
//     }).then((message) => alert("Message Sent Successfully..!!"));
//   }

//   SendEmail();


const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // host: "gmail",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "sunilkumarmaurya786696@gmail.com", // generated ethereal user
      pass: "73987213051", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'sunilkumarmaurya786696@gmail.com', // sender address
    to: "sunilkumarmaurya786695@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
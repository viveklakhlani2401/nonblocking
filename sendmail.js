const nodemailer = require('nodemailer');
const cron = require('node-cron');
process.on("message", message => {

    const jsonResponse = sendMail(message.semail, message.password, message.remail, message.sub, message.msg, message.crons);
    console.log(jsonResponse);
    process.send(jsonResponse);
    // process.exit();
})

function sendMail(semail, password, remail, sub, msg, crons) {
    const mailOptions = {
        from: semail,
        to: remail,
        subject: sub,
        text: msg
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: semail,
            pass: password
        }
    })

    var cron2 = "" + crons + "";
    cron.schedule(cron2, function() {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return "error";
            } else {
                console.log("email send")
            }    
        })
    });
    return "run";

}
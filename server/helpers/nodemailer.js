const nodemailer = require('nodemailer');

module.exports = async function(email, type, token) {

    try { 

        let subject
        let text
        let html

        if (type === 'verify') {
            subject = 'Email verification'
            text = 'Here is your email verification link'
            html = `<b>Click this to activate your account: </b>
            <a href='localhost:8080/users/verifyemail/${token}' target="_blank">Link</a>`
        } else if (type === 'reset') {
            subject = 'Password reset'
            text = 'Here is your password reset link'
            html = `<b>Click this to reset your password: </b>
            <a href='localhost:8080/users/forgotpassword/${token}' target="_blank">Link</a>`
        }

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'alice29@ethereal.email',
                pass: 'fJuVpYy7YSQbwpsCts'
            }
        });
        
        let info = await transporter.sendMail({
            from: '"BlogIt" <blogit@gmail.com>',
            to: email,
            subject,
            text,
            html
        });
    
        console.log("Message sent: %s", info.messageId);    
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
    } catch (error) {
        console.log(error);
    }

}

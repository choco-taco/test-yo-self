const nodemailer = require('nodemailer');

module.exports = async function(email, type, token) {

    try { 

        let subject
        let text
        let html

        if (type === 'verify') {
            subject = 'Email verification'
            text = 'Here is your email verification link'
            html = "<div><b>Click this to activate your account: </b><a href='http://localhost:8080/users/verifyemail/" + token + "' target='_blank'>Link</a></div>"
        } else if (type === 'reset') {
            subject = 'Password reset'
            text = 'Here is your password reset link'
            html = "<div><b>Click this to reset your password: </b><a href='http://localhost:8080/users/forgotpassword/" + token + "' target='_blank'>Link</a></div>"
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'testyoselves@gmail.com',
                pass: 'chocotaco'
            }
        })
        
        let info = await transporter.sendMail({
            from: '"TestYoSelves" <testyoselves@gmail.com>',
            to: email,
            subject,
            text,
            html
        })
    
        console.log("Message sent: %s", info.messageId);    
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
    } catch (error) {
        console.log(error)
    }

}

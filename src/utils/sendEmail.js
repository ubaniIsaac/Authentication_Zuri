const nodemailer = require("nodemailer");
require("dotenv").config()


const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            },
            tls: { rejectUnauthorized: false }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");

    }
    catch (error) {
        console.log(error, "email not sent");
    }
};


module.exports = sendEmail;
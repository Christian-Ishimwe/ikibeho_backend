const nodemailer = require('nodemailer');
const dotenv= require("dotenv").config()


const sendEmail=async(receiver,html)=>{
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
    });

    await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: receiver,
        subject: "Reply from Ikibeho Foundation",
        html: html
    })
}
module.exports = sendEmail;

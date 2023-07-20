const express = require("express");
const path = require('path')
const nodemailer = require('nodemailer');
const cors = require("cors");
const hbs = require('nodemailer-express-handlebars');
require("dotenv").config();

const PORT  = 8080;

const app = express();

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
  })



// send mail to bundle-media route
app.post("/sendmail",(req,res)=>{
    const data = req.body;
    const {fullname,email,youtubeChannel,videoLength,niche,whatLookingFor,freq,budget,discord_id,information} = data;
    if(!fullname,!email,!youtubeChannel,!videoLength,!niche,!whatLookingFor,!freq,!budget,!discord_id,!information)
       {
        return res.status(400).send("All fields are required!")
       }
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.BREVO_PORT,
        auth: {
            user: process.env.USER,
            pass:process.env.PASSWORD
        },
    });


    const handlebarOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve('./views'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views'),
        extName: ".handlebars",
    }


    transporter.use('compile', hbs(handlebarOptions));

    var mailOptions = {
        from: `${process.env.USER}`,
        to:["sahnawazhussain852@gmail.com","tech@bundle-media.co"],
        subject: `Enquiry submited @Bundle-Media`,
        template: 'email',
        context: {
            fullname:`${data.fullname}`,

            email:`${data.email}`,

            youtubeChannel:`${data.youtubeChannel}`,

            videoLength:`${data.videoLength}`,

            niche:`${data.niche}`,

            whatLookingFor:`${data.whatLookingFor}`,

            freq:`${data.freq}`,

            budget:`${data.budget}`,

            discord_id:`${data.discord_id}`,

            information:`${data.information}`
        }

    };

    transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
        res.status(500).json("Something went wrong please try again!")
    } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send("An Email sent to Bundle Media")
    }
    })

})

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})
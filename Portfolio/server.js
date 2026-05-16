const express = require("express");
const bodyParser = require("body-parser"); 
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/contact",(req,res)=>{
    const { name, email, message} = req.body;
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : "haniamubashar80@gmail.com",
            pass : "nuvm rqmv oyrd eejn"
        }
    });

    const mailOptions = {
        from : "haniamubashar80@gmail.com",
        replyTo: email,                     
        to :"haniamubashar80@gmail.com",
        subject : `Message from ${name} (${email})`,
        text :message
    };

    transporter.sendMail(mailOptions, (error,info)=>{
        if (error){
            console.log(error);
            return res.status(500).send("Error sending message");
        }
        res.status(200).send("Message sent successfully");
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.listen(3000,()=> console.log('Server running on port 3000'));
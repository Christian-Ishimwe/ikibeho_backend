const Contact = require("../models/contactsModel")
const sendEmail= require("../helper/emails")
const homeContacts= (req,res)=>{
    return res.status(200).json({message: "contact page"})
}


const sendMessage=async (req,res)=>{
    try{
        const new_message=await Contact(req.body)
        await new_message.save()
        return res.status(201).json({message: "Message created", new_message: new_message})
    }catch(err){
        console.log(err)
        return res.json(500).json({message: "Internal Server error"})
    }
}

const getMessages=async(req,res)=>{
    try{
        const messages= await Contact.find({replied:false})
        if (messages.length==0){
            return res.status(404).json({message: "No message"})
        }
        return res.status(200).json(messages)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})
    }
}

const readMessage=async (req,res)=>{
    try{
        const message_id= req.params.id
        const message= await Contact.findByIdAndUpdate(message_id, {readed:false})
        if(!message){
            return res.status(404).json({message: "message Not found"})
        }
        return res.status(200).json(message)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal server error"})
    }
}

const replyMessage=async(req,res)=>{
    const message_id= req.params.id
    if(!message_id){
        return res.status(404).json({message: "message id required"})
    }
    try{
        const message= await Contact.findById(message_id)
        if(!message){
            return res.status(404).json({message: "Message not found"})
        }
        const reply= req.body.reply
        const  admin_id= req.user.id
        message.reply= reply
        message.replied_on= Date.now()
        message.replied= true
        message.readed=true
        message.replied_by= admin_id
        html=`
        <!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email Template</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                            line-height: 1.6;
                        }

                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 5px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }

                        .header {
                            background-color: #2c3e50;
                            color: #ffffff;
                            padding: 10px 20px;
                            border-top-left-radius: 5px;
                            border-top-right-radius: 5px;
                        }

                        .content {
                            padding: 20px;
                            font-size: 20px;
                        }

                        .footer {
                            background-color: #2c3e50;
                            color: #ffffff;
                            padding: 10px 20px;
                            border-bottom-left-radius: 5px;
                            border-bottom-right-radius: 5px;
                            text-align: center;
                        }

                        @media only screen and (max-width: 600px) {
                            .container {
                                width: 100%;
                            }
                        }
                    </style>
                </head>

                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Reply for Inq</h1>
                        </div>
                        <div class="content">
                            <p>Hello, ${message.name}</p>
                            <p>${reply}.</p>
                        </div>
                        <div class="footer">
                            <p>Ikibeho Digital Foundation Team</p>
                        </div>
                    </div>
                </body>

                </html>
        `
        await sendEmail(message.email,html )
        await message.save()
        return res.status(201).json({message: "Message replied", message})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: "internal server error"})
    }
}

const deleteMessage=async (req,res)=>{
    const message_id= req.params.id
    if(!message_id){
        return res.status(404).json({message:"Message not found"})
    }
    try{
        const message=await Contact.findByIdAndDelete(message_id)
        return res.status(204).json({message: "Message deleted"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "internal server error"})
    }
}



module.exports={homeContacts,deleteMessage,
    replyMessage, readMessage,sendMessage, getMessages
}
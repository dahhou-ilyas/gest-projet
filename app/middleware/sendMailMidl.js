const nodemail=require('nodemailer');


const sendInvitationEmail=(recipientEmail, invitationLink)=>{
    const transporter=nodemail.createTransport({
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.USER, //sender gamil
            pass:process.env.PASS
        },
    })

    const mailOptions={
        from:process.env.USER,
    }

}
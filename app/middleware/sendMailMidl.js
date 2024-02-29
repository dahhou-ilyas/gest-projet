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
        to: recipientEmail,
        subject: 'Invitation au groupe',
        text: `Vous avez été invité à rejoindre notre groupe ! Cliquez sur le lien suivant pour rejoindre : ${invitationLink}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        } else {
            console.log('E-mail envoyé avec succès:', info.response);
        }
    });

}
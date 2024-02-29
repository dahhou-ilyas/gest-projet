const Group=require('../model/Group');
const User=require('../model/User');
const { v4: uuidv4 } = require('uuid');

module.exports={
    invite: async(req,res)=>{
        const { groupId } = req.params;
        const { email } = req.body;
        try {
            const group = await Group.findById(groupId);
            if (!group) {
                return res.status(404).json({ message: "Groupe non trouvé." });
            }

            const invitationToken = uuidv4(); // Génère un token d'invitation unique
            group.invitationToken = invitationToken; // Enregistre le token dans le groupe
            await group.save();

            const invitationLink = `http://localhost:8080/groups/invite?token=${invitationToken}`;
            // Envoi du lien d'invitation à l'utilisateur (par exemple, par e-mail)
            // Ici, vous enverrez l'e-mail contenant le lien avec le token d'invitation
            // Il peut ressembler à quelque chose comme : https://votresite.com/invite?token=<invitationToken>


            return res.status(200).json({ message: "Lien d'invitation généré avec succès." });
        } catch (error) {
            
        }
    }
}


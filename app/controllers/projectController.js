const Project = require("../model/Project");
const User = require("../model/User");

module.exports={
    createProject:async (req,res)=>{
        const userId=req.params.userId;
        const {title,descriptionProjet}=req.body;
        try {
            const user=await User.findById(userId);
            if(!user){
                res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            const newProject=new Project({title,descriptionProjet})
            await newProject.save();

            user.projects.push(newProject._id);

            await user.save();

            res.status(201).json(newProject);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du projet à l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur serveur lors de l\'ajout du projet à l\'utilisateur' });
        }
    },
    getProject:async (req,res)=>{
        const userId=req.params.userId;
        try {
            const user=User.findById(userId);
            if(!user){
                res.status(404).json({message:"user not found"});
            }
            const projects=Project.find({createdBy:userId});
            if(!projects){
                res.status(404).json({message:"not project for this user"});
            }

            res.status(200).json(projects)
        } catch (error) {
            console.error(error);
            res.status(500).json({error:"error in database"});
        }
    },
    getAllProject:async (req,res)=>{
        const projects=Project.find();
        if(!projects){
            res.status(404).json({message:"projects not found"})
        }
        res.status(200).json(projects)
    }
}
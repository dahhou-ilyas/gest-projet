const Group = require("../model/Group");
const Project = require("../model/Project");
const User = require("../model/User");

module.exports={
    // createProject:async (req,res)=>{
    //     const userId=req.params.userId;
    //     const {title,descriptionProjet}=req.body;
    //     try {
    //         const user=await User.findById(userId);
    //         if(!user){
    //             res.status(404).json({ message: 'Utilisateur non trouvé' });
    //         }

    //         const newProject=new Project({title,descriptionProjet})
    //         await newProject.save();

    //         user.projects.push(newProject._id);

    //         await user.save();

    //         res.status(201).json(newProject);
    //     } catch (error) {
    //         console.error('Erreur lors de l\'ajout du projet à l\'utilisateur :', error);
    //         res.status(500).json({ error: 'Erreur serveur lors de l\'ajout du projet à l\'utilisateur' });
    //     }
    // },
    getProject:async (req,res)=>{
        const userId=req.params.userId;
        try {
            const user=await User.findById(userId);
            if(!user){
                res.status(404).json({message:"user not found"});
            }
            const projects=await Project.find({createdBy:userId});
            if(!projects){
                res.status(404).json({message:"not project for this user"});
            }

            res.status(200).json(projects)
        } catch (error) {
            console.error(error);
            res.status(500).json({error:"error in database"});
        }
    },
    createProject:async (req,res)=>{
        const createdBy=req.params.userId;
        const { title, descriptionProjet, groupId } = req.body;
        
        try {
            const user=await User.findById(createdBy);
            if(!user){
                res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            let group;
            if(groupId){
                group = await Group.findById(groupId);
                if(!group){
                    res.status.json({message:"ce group n'existe pas"})
                }
                if(group.createdBy!=createdBy && group.users.includes(createdBy)){
                    res.status(404).json({message:"le group n'apartienn pas a se user et aussi cette user n'apartienne pas au memeber de cette group"})
                }
            }else{
                group=await Group.create({name:`group of project ${title}`,createdBy});
                user.groups.push(group._id);
            }
            const project=await Project.create({title,descriptionProjet,createdBy,group:group._id});

            group.projects.push(project._id);
            await group.save();
            user.projects.push(project._id);

            await user.save();

            res.status(201).json(project)
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    }

}
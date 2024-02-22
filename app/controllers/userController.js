const Task = require('../model/Task');
const User=require('../model/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

module.exports={
    saveUser:async (req,res)=>{
        try {
            const { name, email, password } = req.body;
            const user = new User({ name, email, password });
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getUser:async (req,res)=>{
        try {
            
            const user = await User.findById(req.params.userId);
            if (user == null) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateUser:async (req,res)=>{
        try {
            const { name, email, password } = req.body;
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            user.name=name || user.name
            user.email=email || user.email
            user.password=password || user.password
            await user.save()

            res.json(user);
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteUser:async (req,res)=>{
        try {
            await User.findByIdAndDelete(req.params.userId);
            res.json({ message: 'Utilisateur supprimé avec succès' });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    },
    getTasksForUser:async (req,res)=>{
        
        try {
            const user = await User.findById(req.params.userId);
            
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            const tasks = await Task.find({ assignedTo: req.params.userId });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    login:async (req,res)=>{
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Mot de passe incorrect' });
            }
            const token = jwt.sign({ userId: user._id, name:user.name,email:user.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            res.cookie('jwt', token, { maxAge: 3600000 });
            res.json({ message: 'Connexion réussie'});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}
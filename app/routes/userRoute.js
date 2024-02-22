const router=require('express').Router();
const userController=require('../controllers/userController')

router.post('/users',userController.saveUser);
//router.get('/users',userController.getAllUsers);
router.get('/users/:userId',userController.getUser);
router.put('/users/:userId',userController.updateUser);
router.delete('/users/:userId',userController.deleteUser);
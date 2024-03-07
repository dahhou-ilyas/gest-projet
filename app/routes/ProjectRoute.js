const router=require('express').Router();
const projectController=require('../controllers/projectController')


router.post('/:userId',projectController.createProject);


module.exports = router;
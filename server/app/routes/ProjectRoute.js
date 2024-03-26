const router=require('express').Router();
const projectController=require('../controllers/projectController')


router.post('/:userId',projectController.createProject);
router.get('/:userId',projectController.getProject)

module.exports = router;
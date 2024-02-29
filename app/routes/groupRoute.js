const router=require('express').Router();
const groupController=require('../controllers/groupController');

router.post('/:groupId/invite',groupController.invite);

module.exports = router;
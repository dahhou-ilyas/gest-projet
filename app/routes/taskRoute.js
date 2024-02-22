const router=require('express').Router();
const taskContorller=require('../controllers/taskContorller')


router.post('/tasks',taskContorller.addTask)
//router.get('/tasks',taskContorller.getAllTasks)
router.get('/tasks/:taskId',taskContorller.getTask)
router.put('/tasks/:taskId',taskContorller.updateTask)
router.delete('/tasks/:taskId',taskContorller.deleteTask)
router.post('/tasks/:taskId/comments',taskContorller.addComment)
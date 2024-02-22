const mongoose = require('mongoose');

const taskSchema =new mongoose.Schema({
    title: String,
    description: String,
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now },
    dueDate: Date,
    etatStatus: {
        type: String,
        enum: ['TODO', 'INPROGRESS', 'DONE'],
        default: 'TODO'
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports=Task;
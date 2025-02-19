const Task = require('../models/taskModel');

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title,description,assignedTo,dueDate,priority,status,isRead}=req.body;
    console.log('Request body:', req.body);

    if(!title || !assignedTo || !dueDate || !priority || !status){
      return res.status(400).json({error:'Missing required fields'});
    }

    const newTask = new Task({
      title,
      description,
      assignedTo,
      dueDate,
      priority,
      status,
      isRead
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error creating task:', err);  // Log the error to understand what's failing
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Get all tasks (non-deleted)
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({isDeleted:false});
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tasks', error });
  }
};

//update a task
const updateTask = async (req,res)=>{
  try{
    const taskId = req.params.id;
    const{title, description,assignedTo,dueDate,priority,status,isRead}=req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {title, description,assignedTo,dueDate,priority,status,isRead},
      {new : true } 
    );
    if(!updatedTask){
      return res.status(404).json({error:'task not found'});
    }
    res.json(updatedTask);
  }catch(err){
    console.log('Error updating task:',err);
    res.status(500).json({error:'Failed to update task'});
  }
};

// //soft delete opration

  const softDeleteTask = async (req,res)=>{
    try{
      const taskId = req.params.id;
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        {isDeleted:true},
        {new:true} 
      );
      if(!updatedTask){
        return res.status(404).json({error: 'Task not found'});
      }
      res.json({message: 'Task soft-deleted successfully',task:updatedTask});
    }catch(err){
      console.log('Error soft-deleting task:',err);
      res.status(500).json({error:'Failed to soft-delete task'});
    }
  };



module.exports = {createTask,getAllTasks,updateTask,softDeleteTask};

import Task from '../models/Task.js';

// @desc    Get all user tasks
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new task
export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      userId: req.user.id
    });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// @desc    Update task status
export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Make sure user owns task
    if (task.userId !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    task = await task.update(req.body);
    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete task
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Make sure user owns task
    if (task.userId !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    await task.destroy();
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Plus, Trash2, CheckCircle, Circle, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const [userRes, tasksRes] = await Promise.all([
          axios.get('/api/auth/me', { headers: { 'x-auth-token': token } }),
          axios.get('/api/tasks', { headers: { 'x-auth-token': token } })
        ]);
        setUser(userRes.data.user);
        setTasks(tasksRes.data.data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/tasks', newTask, {
        headers: { 'x-auth-token': token }
      });
      setTasks([res.data.data, ...tasks]);
      setNewTask({ title: '', description: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
      const res = await axios.put(`/api/tasks/${task.id}`, { status: newStatus }, {
        headers: { 'x-auth-token': token }
      });
      setTasks(tasks.map(t => t.id === task.id ? res.data.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
            T
          </div>
          <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right mr-2">
            <p className="text-sm font-bold text-zinc-900">{user.name}</p>
            <p className="text-xs text-zinc-500">{user.email}</p>
          </div>
          <Button onClick={handleLogout} variant="ghost" size="sm" className="text-zinc-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-10">
        {/* Create Task Section */}
        <section className="mb-12">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-600" />
              Create New Task
            </h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <input
                type="text"
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <textarea
                placeholder="Description (optional)"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all resize-none h-24"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-100">
                Add Task
              </Button>
            </form>
          </div>
        </section>

        {/* Task List Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              Your Tasks
              <span className="text-sm font-normal bg-zinc-100 text-zinc-500 px-3 py-1 rounded-full">
                {tasks.length}
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {tasks.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-300"
                >
                  <p className="text-zinc-400">No tasks found. Start by creating one above!</p>
                </motion.div>
              ) : (
                tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`group bg-white p-5 rounded-2xl border transition-all ${
                      task.status === 'Completed' ? 'border-zinc-100 opacity-75' : 'border-zinc-200 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button 
                        onClick={() => handleToggleStatus(task)}
                        className={`mt-1 transition-colors ${
                          task.status === 'Completed' ? 'text-green-500' : 'text-zinc-300 hover:text-indigo-600'
                        }`}
                      >
                        {task.status === 'Completed' ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                      </button>
                      
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg leading-tight ${task.status === 'Completed' ? 'line-through text-zinc-400' : 'text-zinc-900'}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className={`mt-1 text-sm ${task.status === 'Completed' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-3">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            task.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {task.status}
                          </span>
                          <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                            <Clock className="w-3 h-3" />
                            {new Date(task.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}

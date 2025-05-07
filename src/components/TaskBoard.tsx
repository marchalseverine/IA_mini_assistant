import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do';
  assignee?: string;
  dueDate?: string;
  priority?: 'Low' | 'Medium' | 'High';
}

interface TaskBoardProps {
  projectId?: string;
  t: {
    title: string;
    noTasks: string;
    form: {
      title: string;
      assignee: string;
      description: string;
      dueDate: string;
      priority: string;
      addTask: string;
    };
    priority: {
      low: string;
      medium: string;
      high: string;
    };
  };
}

const TaskBoard: React.FC<TaskBoardProps> = ({ projectId, t }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    priority: 'Medium',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        title: form.title,
        description: form.description,
        status: 'To Do',
        assignee: form.assignee,
        dueDate: form.dueDate,
        priority: form.priority as 'Low' | 'Medium' | 'High',
      },
    ]);
    setForm({ title: '', description: '', assignee: '', dueDate: '', priority: 'Medium' });
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-4 bg-white dark:bg-slate-800 rounded-xl shadow dark:shadow-slate-900/50">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">{t.title}</h2>
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder={t.form.title}
          className="border dark:border-slate-600 rounded px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          required
        />
        <input
          name="assignee"
          value={form.assignee}
          onChange={handleChange}
          placeholder={t.form.assignee}
          className="border dark:border-slate-600 rounded px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder={t.form.description}
          className="border dark:border-slate-600 rounded px-3 py-2 md:col-span-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="border dark:border-slate-600 rounded px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          placeholder={t.form.dueDate}
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border dark:border-slate-600 rounded px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
        >
          <option value="Low">{t.priority.low}</option>
          <option value="Medium">{t.priority.medium}</option>
          <option value="High">{t.priority.high}</option>
        </select>
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition"
        >
          {t.form.addTask}
        </button>
      </form>
      <div className="space-y-4">
        {tasks.length === 0 && <div className="text-gray-400 dark:text-gray-500">{t.noTasks}</div>}
        {tasks.map(task => (
          <div key={task.id} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow dark:shadow-slate-900/50 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold text-lg text-gray-900 dark:text-white">{task.title}</div>
              <div className="text-gray-500 dark:text-gray-300 text-sm mb-1">{task.description}</div>
              <div className="text-xs text-gray-400 dark:text-gray-400">
                {task.assignee && <>👤 {task.assignee} &nbsp;</>}
                {task.dueDate && <>📅 {task.dueDate} &nbsp;</>}
                <span className={`font-bold ${task.priority === 'High' ? 'text-red-500 dark:text-red-400' : task.priority === 'Low' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                  {task.priority === 'High' ? t.priority.high : task.priority === 'Low' ? t.priority.low : t.priority.medium}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard; 
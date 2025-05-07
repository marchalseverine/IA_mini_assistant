import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskBoard from './TaskBoard';

interface Project {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  priority?: 'Low' | 'Medium' | 'High';
}

interface ProjectBoardProps {
  t: {
    title: string;
    noProjects: string;
    selectProject: string;
    newProject: string;
    form: {
      title: string;
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      priority: string;
      create: string;
    };
    backToLanding: string;
    taskBoard: {
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
  };
  onBack?: () => void;
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ t, onBack }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'Medium',
  });
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const newProject = {
      id: uuidv4(),
      name: form.name,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      priority: form.priority as 'Low' | 'Medium' | 'High',
    };
    setProjects([...projects, newProject]);
    setSelectedProjectId(newProject.id);
    setForm({ name: '', description: '', startDate: '', endDate: '', priority: 'Medium' });
    setShowForm(false);
  };

  const handleSelect = (id: string) => {
    setSelectedProjectId(id);
    setShowForm(false);
  };

  const handleNewProject = () => {
    setShowForm(true);
    setSelectedProjectId(null);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-900 w-full">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-800 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 p-4 flex flex-col shrink-0">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white text-center">{t.title}</h2>
        <div className="flex-1 space-y-2 overflow-y-auto">
          {projects.length === 0 && <div className="text-gray-400 dark:text-gray-500">{t.noProjects}</div>}
          {projects.map(project => (
            <button
              key={project.id}
              onClick={() => handleSelect(project.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition font-medium ${
                selectedProjectId === project.id 
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="truncate">{project.name}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {project.priority} {project.startDate && `| ${project.startDate}`}
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={handleNewProject}
          className="mt-4 bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition"
        >
          {t.newProject}
        </button>
      </aside>
      {/* Main Area */}
      <main className="flex-1 w-full p-2 sm:p-4 md:p-8 flex flex-col items-center justify-center relative min-w-0">
        {onBack && (
          <button
            className="absolute left-2 top-2 md:left-0 md:top-0 md:ml-2 md:mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow px-3 py-2 text-xl font-bold text-yellow-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition focus:outline-none"
            onClick={onBack}
            aria-label="Back to landing"
          >
            ←
          </button>
        )}
        {showForm ? (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow dark:shadow-slate-900/50 p-2 sm:p-4 md:p-8 w-full max-w-lg space-y-4">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white text-center">{t.form.title}</h2>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t.form.name}
              className="border dark:border-slate-600 rounded px-3 py-2 w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder={t.form.description}
              className="border dark:border-slate-600 rounded px-3 py-2 w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="border dark:border-slate-600 rounded px-3 py-2 w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder={t.form.startDate}
              />
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="border dark:border-slate-600 rounded px-3 py-2 w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder={t.form.endDate}
              />
            </div>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="border dark:border-slate-600 rounded px-3 py-2 w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition w-full"
            >
              {t.form.create}
            </button>
          </form>
        ) : selectedProjectId ? (
          <div className="w-full max-w-3xl">
            <TaskBoard projectId={selectedProjectId} t={t.taskBoard} />
          </div>
        ) : (
          <div className="text-gray-400 dark:text-gray-500">{t.selectProject}</div>
        )}
      </main>
    </div>
  );
};

export default ProjectBoard; 
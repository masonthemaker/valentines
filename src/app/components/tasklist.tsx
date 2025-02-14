'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TaskList() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Romantic Dinner at a Fancy Restaurant', completed: false },
    { id: 2, text: 'Book a Cozy Hotel Stay', completed: false },
    { id: 3, text: 'Be Kind n Rewind', completed: false },
    { id: 4, text: 'Watch a Romantic Movie', completed: false },
    { id: 5, text: 'Make a Valentine&apos;s Day Playlist', completed: false },
    { id: 6, text: 'Bake a Romantic Dessert', completed: false },
    { id: 7, text: 'Write a Romantic Poem', completed: false },
    { id: 8, text: 'Create a Romantic Scrapbook', completed: false },
    { id: 9, text: 'Take a Romantic Photo Shoot', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-start">
      <div className="w-full max-w-md p-6 rounded-xl backdrop-blur-lg bg-pink-100/30 border border-pink-200/50 shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-pink-800">Valentine&apos;s Date Night Ideas</h2>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a date night idea..."
            className="flex-1 px-4 py-2 rounded-lg bg-white/50 border border-pink-200/50 focus:outline-none focus:border-pink-400"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex items-center gap-2 p-3 rounded-lg bg-white/40 border border-pink-200/50 hover:bg-white/50 transition-colors"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 accent-pink-500"
              />
              <span className={`flex-1 ${task.completed ? 'line-through text-pink-400' : 'text-pink-900'}`}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
        
        <p className="mt-4 text-sm text-pink-600 italic text-center">
          *Don&apos;t forget to screenshot your finished list!
        </p>

        <button
          onClick={() => router.push('/wall')}
          className="w-full mt-6 px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
}

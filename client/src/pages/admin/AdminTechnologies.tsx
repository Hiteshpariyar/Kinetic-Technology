import React, { useState } from "react";
import { Code2, Plus, Trash2 } from "lucide-react";

export const AdminTechnologies: React.FC = () => {
  const [techs, setTechs] = useState([
    { id: "1", name: "React", category: "Frontend", active: true },
    { id: "2", name: "TypeScript", category: "Frontend", active: true },
    { id: "3", name: "Node.js", category: "Backend", active: true },
    { id: "4", name: "Python", category: "AI & Backend", active: true },
    { id: "5", name: "Flutter", category: "Mobile", active: true },
    { id: "6", name: "React Native", category: "Mobile", active: true },
    { id: "7", name: "Kotlin", category: "Android", active: true },
    { id: "8", name: "Swift", category: "iOS", active: true },
    { id: "9", name: "PostgreSQL", category: "Database", active: true },
    { id: "10", name: "AWS", category: "Cloud", active: true },
  ]);

  const [newTech, setNewTech] = useState("");
  const [newCategory, setNewCategory] = useState("Frontend");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTech) return;
    setTechs([...techs, { id: Date.now().toString(), name: newTech, category: newCategory, active: true }]);
    setNewTech("");
  };

  const handleDelete = (id: string) => {
    setTechs(techs.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Technologies Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure technical stacks featured on the public website and configurator.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-500 font-semibold uppercase">
                <th className="py-3 px-4">Technology</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {techs.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    {t.name}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px]">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => handleDelete(t.id)} className="text-slate-400 hover:text-rose-600 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-fit">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
            Add New Technology
          </h3>
          <form onSubmit={handleAdd} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Technology Name
              </label>
              <input
                type="text"
                required
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="e.g. Next.js, Redis, PyTorch"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              >
                <option value="Frontend">Frontend</option>
                <option value="Mobile">Mobile</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Cloud">Cloud & DevOps</option>
                <option value="AI">AI & Machine Learning</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition-colors"
            >
              Add Technology
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

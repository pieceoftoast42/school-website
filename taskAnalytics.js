export function getDashboard(tasks)
{
    const now = new Date();
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const overdue = tasks.filter(t => !t.completed && new Date(t.dueDate) < now).length;

    const upcoming = tasks.filter(t => !t.completed && new Date(t.dueDate) >= now)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return {total, completed, overdue, upcoming};
}

export function getUserA(tasks, currentUser)
{
    const now = new Date();
    const stats = 
    {
    owned: 0,
    collaborated: 0,
    completed: 0,
    overdue: 0,
     };
    tasks.forEach(task => 
    {
      const owner = typeof task.owner === "string" ? task.owner : task.owner?.username || "Unknown";
      const collaborators = Array.isArray(task.assignedTo) ? task.assignedTo.map(c =>(typeof c=== "string" ? c :c.username)) : [];

      if (owner === currentUser) 
      {
        stats.owned++;
      } else if (collaborators.includes(currentUser)) 
      {
        stats.collaborated++;
      }
      if ((owner === currentUser || collaborators.includes(currentUser)) && task.completed) {
        stats.completed++;
      }
      if ((owner === currentUser || collaborators.includes(currentUser)) && !task.completed && new Date(task.dueDate) < now) {
        stats.overdue++;
      }
    });
    return stats;
}

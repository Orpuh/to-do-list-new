import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { CompletedTaskLog } from '../components/CompletedTaskLog';
import { Task } from '../types/Task';

export const CompletedTasks: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadCompletedTasks = () => {
      const storedCompletedTasks = localStorage.getItem('completedTasks');
      if (storedCompletedTasks) {
        const tasks = JSON.parse(storedCompletedTasks);
        setCompletedTasks(
          tasks.sort((a: Task, b: Task) => 
            new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
          )
        );
      }
    };

    // Load completed tasks on mount
    loadCompletedTasks();

    // Listen for storage changes (when tasks are moved to completed)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'completedTasks') {
        loadCompletedTasks();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events (for same-tab updates)
    const handleCustomStorageChange = () => {
      loadCompletedTasks();
    };

    window.addEventListener('completedTasksChanged', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('completedTasksChanged', handleCustomStorageChange);
    };
  }, []);

  const handleClearSelected = (taskIds: string[]) => {
    const updatedTasks = completedTasks.filter(task => !taskIds.includes(task.id));
    setCompletedTasks(updatedTasks);
    localStorage.setItem('completedTasks', JSON.stringify(updatedTasks));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Completed Tasks
      </Typography>
      
      <CompletedTaskLog 
        tasks={completedTasks}
        onClearSelected={handleClearSelected}
      />
    </Container>
  );
}; 
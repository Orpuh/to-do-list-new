import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { TaskForm } from '../components/TaskForm';
import { Task } from '../types/Task';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface AddTaskProps {
  onAddTask: (task: Task) => void;
}

export const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const navigate = useNavigate();

  const handleSubmit = (taskData: Omit<Task, 'id' | 'completed' | 'completedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      completed: false,
    };

    onAddTask(newTask);
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Add a New Task
      </Typography>
      
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <TaskForm onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
}; 
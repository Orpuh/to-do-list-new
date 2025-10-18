import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { TaskItem } from '../components/TaskItem';
import { Task } from '../types/Task';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

interface TaskOverviewProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onTaskEdit: (taskId: string, updatedTask: Partial<Task>) => void;
  onMoveToLog: (taskId: string) => void;
}

export const TaskOverview = ({ tasks, onTaskComplete, onTaskEdit, onMoveToLog }: TaskOverviewProps) => {
  const navigate = useNavigate();

  // Filter out completed tasks and sort by deadline
  const sortedTasks = tasks
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  return (
    <Container>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4 
      }}>
        <Typography variant="h5" component="h1">
          Active Tasks
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/add')}
          sx={{ borderRadius: 3 }}
        >
          Add Task
        </Button>
      </Box>

      {sortedTasks.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center">
          No active tasks. Click "Add Task" to create one!
        </Typography>
      ) : (
        sortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={onTaskComplete}
            onMoveToLog={onMoveToLog}
            onEdit={onTaskEdit}
          />
        ))
      )}
    </Container>
  );
}; 
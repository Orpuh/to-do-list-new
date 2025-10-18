import React from 'react';
import { Task } from '../types/Task';
import { format } from 'date-fns';
import { Paper, Typography, Button, Box } from '@mui/material';
import { CountdownTimer } from './CountdownTimer';

interface TaskItemProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onMoveToLog: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onMoveToLog }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 3, 
        cursor: 'pointer',
        opacity: task.completed ? 0.7 : 1,
        transition: 'all 0.2s ease-in-out',
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(4px)',
        ml: '80px', // Align with the red margin line
        border: '1px solid rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }
      }}
      onClick={() => onComplete(task.id)}
    >
      <Typography 
        variant="h6" 
        component="div"
        sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      >
        {task.title}
      </Typography>
      
      {task.description && (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mt: 1,
            textDecoration: task.completed ? 'line-through' : 'none'
          }}
        >
          {task.description}
        </Typography>
      )}
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mt: 2,
        flexWrap: 'wrap',
        gap: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Deadline: {format(new Date(task.deadline), 'dd/MM/yyyy - HH:mm')}
          </Typography>
          <CountdownTimer deadline={task.deadline} />
        </Box>
        
        {task.completed && (
          <Button 
            variant="contained" 
            color="primary"
            size="small"
            sx={{ 
              borderRadius: 3,
              color: '#ffffff',
              textDecoration: 'none',
              border: '1px solid #000000',
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
                border: '1px solid #000000',
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              onMoveToLog(task.id);
            }}
          >
            Move to Log
          </Button>
        )}
      </Box>
    </Paper>
  );
}; 
import React, { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { Task } from '../types/Task';
import { format } from 'date-fns';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'completed' | 'completedAt'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  // Get current date-time in ISO format, but only up to minutes precision
  const getCurrentDateTime = () => {
    const now = new Date();
    return format(now, "yyyy-MM-dd'T'HH:mm");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !deadline) return;

    onSubmit({
      title,
      description,
      deadline: new Date(deadline).toISOString(),
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDeadline('');
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 4, 
        maxWidth: 600, 
        mx: 'auto',
        borderRadius: 4,
        '& .MuiTextField-root': {
          borderRadius: 2,
        }
      }}
    >
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3
        }}
      >
        <TextField
          label="Task Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        
        <TextField
          label="Deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: getCurrentDateTime()
          }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={!title || !deadline}
          sx={{ 
            borderRadius: 3,
            py: 1.5
          }}
        >
          Save Task
        </Button>
      </Box>
    </Paper>
  );
}; 
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import dayjs from 'dayjs';

const TaskCreation = () => {
  const navigate = useNavigate();
  const { dispatch } = useTaskContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState<dayjs.Dayjs | null>(dayjs());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    dispatch({
      type: 'ADD_TASK',
      payload: {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        deadline: deadline.toISOString(),
        completed: false,
      },
    });

    navigate('/');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Create New Task
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />
        <DatePicker
          label="Deadline"
          value={deadline}
          onChange={(newValue) => setDeadline(newValue)}
        />
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={!title.trim() || !deadline}>
            Create Task
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskCreation; 
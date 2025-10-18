import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Undo } from '@mui/icons-material';
import { useTaskContext } from '../context/TaskContext';

const CompletionLog = () => {
  const { state, dispatch } = useTaskContext();

  const handleUncomplete = (taskId: string) => {
    dispatch({ type: 'UNCOMPLETE_TASK', payload: taskId });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Completed Tasks
      </Typography>
      <List>
        {state.completedTasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              mb: 1,
              backgroundColor: '#f5f5f5',
            }}
          >
            <ListItemText
              primary={
                <Typography
                  component="span"
                  sx={{ textDecoration: 'line-through' }}
                >
                  {task.title}
                </Typography>
              }
              secondary={
                <>
                  {task.description && (
                    <Typography variant="body2" color="text.secondary">
                      {task.description}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary" display="block">
                    Due: {new Date(task.deadline).toLocaleDateString()}
                  </Typography>
                  {task.completedAt && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      Completed: {new Date(task.completedAt).toLocaleString()}
                    </Typography>
                  )}
                </>
              }
            />
            <IconButton
              edge="end"
              aria-label="uncomplete"
              onClick={() => handleUncomplete(task.id)}
            >
              <Undo />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CompletionLog; 
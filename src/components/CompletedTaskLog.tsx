import { useState } from 'react';
import { Task } from '../types/Task';
import { Paper, Typography, Box, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

interface CompletedTaskLogProps {
  tasks: Task[];
  onClearSelected: (taskIds: string[]) => void;
}

export const CompletedTaskLog: React.FC<CompletedTaskLogProps> = ({ tasks, onClearSelected }) => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleToggleTask = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.id));
    }
  };

  const handleDeleteSelected = () => {
    onClearSelected(selectedTasks);
    setSelectedTasks([]);
  };

  if (tasks.length === 0) {
    return (
      <Paper elevation={0} sx={{ 
        p: 4, 
        textAlign: 'center', 
        borderRadius: 2,
        backgroundColor: '#f8f9fa',
        ml: '80px',
      }}>
        <Typography variant="body1" color="text.secondary">
          No completed tasks yet
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} sx={{ 
      p: 4, 
      borderRadius: 2,
      backgroundColor: '#f8f9fa',
      ml: '80px',
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        gap: 2,
      }}>
        <Typography variant="h6">Completed Tasks</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSelectAll}
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
          >
            {selectedTasks.length === tasks.length ? 'Deselect All' : 'Select All'}
          </Button>
          <Button 
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
            disabled={selectedTasks.length === 0}
            sx={{ borderRadius: 3 }}
          >
            Delete Selected
          </Button>
        </Box>
      </Box>

      <List sx={{ 
        '& .MuiListItem-root': { 
          borderRadius: 2,
          mb: 1,
          bgcolor: 'background.paper',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
        }
      }}>
        {tasks.map((task) => (
          <ListItem 
            key={task.id} 
            sx={{ 
              py: 2,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#ffffff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.12)',
              }
            }}
          >
            <ListItemIcon>
              <Checkbox
                checked={selectedTasks.includes(task.id)}
                onChange={() => handleToggleTask(task.id)}
                color="primary"
              />
            </ListItemIcon>
            <ListItemIcon>
              <CheckCircleIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary={task.title}
              secondary={
                <>
                  {task.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {task.description}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary">
                    Completed: {task.completedAt ? format(new Date(task.completedAt), 'dd/MM/yyyy - HH:mm') : 'Unknown'}
                    <br />
                    Original deadline: {format(new Date(task.deadline), 'dd/MM/yyyy - HH:mm')}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 
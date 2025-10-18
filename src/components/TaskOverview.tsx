import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Paper,
  AppBar,
  Toolbar,
  ListItemSecondaryAction,
} from '@mui/material';
import { Add as AddIcon, CheckCircle as CheckCircleIcon, PlaylistAddCheck as PlaylistAddCheckIcon, Check, Delete } from '@mui/icons-material';
import { useTaskContext } from '../context/TaskContext';
import dayjs from 'dayjs';

const TaskOverview = () => {
  const navigate = useNavigate();
  const { tasks, completeTask, moveToLog, dispatch } = useTaskContext();
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  const sortedTasks = [...tasks].sort((a, b) => 
    dayjs(a.deadline).valueOf() - dayjs(b.deadline).valueOf()
  );

  const handleComplete = (taskId: string) => {
    dispatch({ type: 'COMPLETE_TASK', payload: taskId });
  };

  const handleDelete = (taskId: string) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            StrikeTasks
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={() => navigate('/completed')}
            title="View completed tasks"
          >
            <PlaylistAddCheckIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tasks
        </Typography>
        <List>
          {sortedTasks.map((task) => (
            <Paper
              key={task.id}
              elevation={2}
              sx={{ 
                mb: 2,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
              onMouseEnter={() => setHoveredTask(task.id)}
              onMouseLeave={() => setHoveredTask(null)}
            >
              <ListItem
                secondaryAction={
                  hoveredTask === task.id && task.completed && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => moveToLog(task.id)}
                      size="small"
                    >
                      Move to Log
                    </Button>
                  )
                }
              >
                <IconButton
                  edge="start"
                  onClick={() => handleComplete(task.id)}
                  sx={{ mr: 2 }}
                >
                  <Check />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(task.id)}
                >
                  <Delete />
                </IconButton>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                      }}
                    >
                      {task.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {task.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Due: {dayjs(task.deadline).format('DD/MM/YYYY HH:mm')}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/create')}
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          Add Task
        </Button>
      </Container>
    </Box>
  );
};

export default TaskOverview; 
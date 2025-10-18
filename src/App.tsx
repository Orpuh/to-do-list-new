import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TaskOverview } from './pages/TaskOverview';
import { AddTask } from './pages/AddTask';
import { CompletedTasks } from './pages/CompletedTasks';
import { AppBar, Toolbar, Typography, Container, Button, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Task } from './types/Task';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B4332', // Dark forest green
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#ffffff', // Plain white
      paper: '#ffffff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16, // More rounded corners
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(27, 67, 50, 0.85)', // Semi-transparent dark forest green
          backdropFilter: 'blur(8px)',
        },
      },
    },
  },
});

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [completedTasks, setCompletedTasks] = useState<Task[]>(() => {
    const storedCompletedTasks = localStorage.getItem('completedTasks');
    return storedCompletedTasks ? JSON.parse(storedCompletedTasks) : [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('completedTasksChanged'));
  }, [completedTasks]);

  const handleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const handleMoveToLog = (taskId: string) => {
    const taskToMove = tasks.find(task => task.id === taskId);
    if (taskToMove && taskToMove.completed) {
      const taskWithCompletedAt = {
        ...taskToMove,
        completedAt: new Date().toISOString()
      };
      setCompletedTasks(prev => [taskWithCompletedAt, ...prev]);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const handleTaskEdit = (taskId: string, updatedTask: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updatedTask }
        : task
    ));
  };

  const handleAddTask = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box 
          sx={{ 
            flexGrow: 1, 
            minHeight: '100vh',
            position: 'relative',
            backgroundColor: '#ffffff',
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 23px, #add8e6 23px, #add8e6 24px),
              linear-gradient(90deg, transparent 79px, #ff000033 79px, #ff000033 80px, transparent 80px)
            `,
            backgroundAttachment: 'local',
            pt: 0,
          }}
        >
          <AppBar position="static" elevation={0} sx={{ backgroundColor: 'rgba(27, 67, 50, 0.85)' }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                  Task Log
                </Link>
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Active Tasks
              </Button>
              <Button color="inherit" component={Link} to="/completed">
                Completed
              </Button>
            </Toolbar>
          </AppBar>

          <Container sx={{ position: 'relative', py: 4 }}>
            <Routes>
              <Route path="/" element={
                <TaskOverview 
                  tasks={tasks}
                  onTaskComplete={handleTaskComplete}
                  onTaskEdit={handleTaskEdit}
                  onMoveToLog={handleMoveToLog}
                />
              } />
              <Route path="/add" element={<AddTask onAddTask={handleAddTask} />} />
              <Route path="/completed" element={<CompletedTasks />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 
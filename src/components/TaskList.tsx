import { Task } from '../types/Task';
import { TaskItem } from './TaskItem';
import { Box } from '@mui/material';

interface TaskListProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
  onEdit: (taskId: string, updatedTask: Partial<Task>) => void;
}

export const TaskList = ({ tasks, onComplete, onEdit }: TaskListProps) => {
  const handleMoveToLog = (taskId: string) => {
    // This is handled by the parent component
    onComplete(taskId);
  };

  return (
    <Box>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}
          onMoveToLog={handleMoveToLog}
          onEdit={onEdit}
        />
      ))}
    </Box>
  );
}; 
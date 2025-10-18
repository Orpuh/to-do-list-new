import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Task } from '../types/Task';

interface TaskState {
  tasks: Task[];
  completedTasks: Task[];
}

type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'UNCOMPLETE_TASK'; payload: string };

interface TaskContextType {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}

interface TaskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'COMPLETE_TASK': {
      const task = state.tasks.find(t => t.id === action.payload);
      if (!task) return state;
      return {
        tasks: state.tasks.filter(t => t.id !== action.payload),
        completedTasks: [...state.completedTasks, { ...task, completedAt: new Date() }],
      };
    }
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'UNCOMPLETE_TASK': {
      const task = state.completedTasks.find(t => t.id === action.payload);
      if (!task) return state;
      const { completedAt, ...taskWithoutCompleted } = task;
      return {
        tasks: [...state.tasks, taskWithoutCompleted],
        completedTasks: state.completedTasks.filter(t => t.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    completedTasks: [],
  });

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}; 
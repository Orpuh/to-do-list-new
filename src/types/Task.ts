export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  completed: boolean;
  completedAt?: string;
} 
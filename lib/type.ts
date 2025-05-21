export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  timeEstimate: string;
  priority: string;
  category: string;
  background: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  avatar: string;
}

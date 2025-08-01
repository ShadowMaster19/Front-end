import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UserGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  status: 'completed' | 'in-progress' | 'paused';
  dailyProgress: number; // 0-100, represents daily progress
}

interface User {
  id: string;
  name: string;
  email: string;
  monthlySavingsGoal: number;
  totalSaved: number;
  goals: UserGoal[];
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  updateGoalStatus: (goalId: string, status: 'completed' | 'in-progress' | 'paused', dailyProgress: number) => void;
  updateDailyProgress: (goalId: string, progress: number) => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock user data for demo
  const mockUser: User = {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    monthlySavingsGoal: 500,
    totalSaved: 1250,
    goals: [
      {
        id: '1',
        title: 'Emergency Fund',
        targetAmount: 5000,
        currentAmount: 3500,
        deadline: new Date(2024, 11, 31),
        category: 'Emergency',
        status: 'in-progress',
        dailyProgress: 75,
      },
      {
        id: '2',
        title: 'Vacation Fund',
        targetAmount: 2000,
        currentAmount: 800,
        deadline: new Date(2024, 8, 15),
        category: 'Travel',
        status: 'in-progress',
        dailyProgress: 45,
      },
      {
        id: '3',
        title: 'New Car Down Payment',
        targetAmount: 3000,
        currentAmount: 0,
        deadline: new Date(2025, 2, 28),
        category: 'Transportation',
        status: 'paused',
        dailyProgress: 0,
      },
      {
        id: '4',
        title: 'Home Renovation',
        targetAmount: 10000,
        currentAmount: 2500,
        deadline: new Date(2024, 10, 31),
        category: 'Home',
        status: 'completed',
        dailyProgress: 100,
      },
    ],
    createdAt: new Date(2024, 0, 15),
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would validate against backend
    if (email === 'alex@example.com' && password === 'password') {
      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateGoalStatus = (goalId: string, status: 'completed' | 'in-progress' | 'paused', dailyProgress: number) => {
    if (user) {
      setUser(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          goals: prev.goals.map(goal =>
            goal.id === goalId
              ? { ...goal, status, dailyProgress }
              : goal
          )
        };
      });
    }
  };

  const updateDailyProgress = (goalId: string, progress: number) => {
    if (user) {
      setUser(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          goals: prev.goals.map(goal =>
            goal.id === goalId
              ? { ...goal, dailyProgress: progress }
              : goal
          )
        };
      });
    }
  };

  const value: AuthState = {
    user,
    isAuthenticated,
    signIn,
    signOut,
    updateGoalStatus,
    updateDailyProgress,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
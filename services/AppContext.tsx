import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'video' | 'goal' | 'savings' | 'chat';
  icon: string;
}

interface AppState {
  totalSaved: number;
  monthlyGoal: number;
  currentStreak: number;
  videosWatched: number;
  goalsCompleted: number;
  recentActivities: Activity[];
  updateProgress: (type: 'video' | 'goal' | 'savings', value?: number) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  completeGoal: (goalId: string) => void;
  watchVideo: (videoId: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [totalSaved, setTotalSaved] = useState(1250);
  const [monthlyGoal, setMonthlyGoal] = useState(500);
  const [currentStreak, setCurrentStreak] = useState(12);
  const [videosWatched, setVideosWatched] = useState(8);
  const [goalsCompleted, setGoalsCompleted] = useState(3);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Completed "Budgeting Basics"',
      description: 'Finished watching the video tutorial',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      type: 'video',
      icon: 'play.circle.fill',
    },
    {
      id: '2',
      title: 'Added $50 to Emergency Fund',
      description: 'Made progress toward your savings goal',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      type: 'savings',
      icon: 'dollarsign.circle.fill',
    },
    {
      id: '3',
      title: 'Chat session with Seed',
      description: 'Got personalized financial advice',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      type: 'chat',
      icon: 'brain.head.profile',
    },
  ]);

  const updateProgress = (type: 'video' | 'goal' | 'savings', value?: number) => {
    switch (type) {
      case 'video':
        setVideosWatched(prev => prev + 1);
        break;
      case 'goal':
        setGoalsCompleted(prev => prev + 1);
        break;
      case 'savings':
        if (value) {
          setTotalSaved(prev => prev + value);
        }
        break;
    }
  };

  const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setRecentActivities(prev => [newActivity, ...prev.slice(0, 4)]); // Keep only 5 most recent
  };

  const completeGoal = (goalId: string) => {
    setGoalsCompleted(prev => prev + 1);
    addActivity({
      title: 'Goal Completed!',
      description: 'You achieved a financial milestone',
      type: 'goal',
      icon: 'target',
    });
  };

  const watchVideo = (videoId: string) => {
    setVideosWatched(prev => prev + 1);
    addActivity({
      title: 'Video Watched',
      description: 'You completed a learning module',
      type: 'video',
      icon: 'play.circle.fill',
    });
  };

  const value: AppState = {
    totalSaved,
    monthlyGoal,
    currentStreak,
    videosWatched,
    goalsCompleted,
    recentActivities,
    updateProgress,
    addActivity,
    completeGoal,
    watchVideo,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}; 
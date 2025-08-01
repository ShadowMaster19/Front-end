import { useAuth } from '@/services/AuthContext';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      // Use setTimeout to ensure navigation happens after the component is fully mounted
      const timer = setTimeout(() => {
        router.replace('/signin');
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isMounted]);

  // Don't render anything until the component is mounted
  if (!isMounted) {
    return null;
  }

  // If not authenticated, show a loading state instead of immediately redirecting
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 
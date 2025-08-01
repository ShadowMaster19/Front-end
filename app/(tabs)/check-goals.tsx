import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAppState } from '@/services/AppContext';
import { useAuth } from '@/services/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckGoalsScreen() {
  const { user, updateGoalStatus, updateDailyProgress } = useAuth();
  const { addActivity } = useAppState();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>Please sign in to view your goals.</ThemedText>
      </SafeAreaView>
    );
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#2196F3';
      case 'paused': return '#FF9800';
      default: return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'checkmark.circle.fill';
      case 'in-progress': return 'play.circle.fill';
      case 'paused': return 'pause.circle.fill';
      default: return 'circle';
    }
  };

  const handleStatusChange = (goalId: string, newStatus: 'completed' | 'in-progress' | 'paused') => {
    const goal = user.goals.find(g => g.id === goalId);
    if (goal) {
      updateGoalStatus(goalId, newStatus, goal.dailyProgress);
      
      // Add activity
      addActivity({
        title: `Goal Status Updated`,
        description: `Changed ${goal.title} to ${newStatus}`,
        type: 'goal',
        icon: 'target',
      });
    }
  };

  const handleDailyProgressChange = (goalId: string, progress: number) => {
    updateDailyProgress(goalId, progress);
    
    const goal = user.goals.find(g => g.id === goalId);
    if (goal) {
      addActivity({
        title: `Daily Progress Updated`,
        description: `Updated ${goal.title} daily progress to ${progress}%`,
        type: 'goal',
        icon: 'target',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f8f9fa', '#e8f5e8']}
        style={styles.backgroundGradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#9C27B0', '#7B1FA2']}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerIconContainer}>
                <IconSymbol size={32} name="target" color="#fff" />
              </View>
              <View style={styles.headerText}>
                <ThemedText type="title" style={styles.headerTitle}>Check Goals</ThemedText>
                <ThemedText type="subtitle" style={styles.headerSubtitle}>Track your daily progress</ThemedText>
              </View>
            </View>
          </LinearGradient>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* User Info */}
          <View style={styles.userInfoCard}>
            <LinearGradient
              colors={['#fff', '#f8f9fa']}
              style={styles.userInfoGradient}
            >
              <View style={styles.userInfoHeader}>
                <View style={styles.userAvatar}>
                  <IconSymbol size={24} name="person.circle.fill" color="#4CAF50" />
                </View>
                <View style={styles.userDetails}>
                  <ThemedText type="defaultSemiBold" style={styles.userName}>{user.name}</ThemedText>
                  <ThemedText style={styles.userEmail}>{user.email}</ThemedText>
                </View>
              </View>
              <View style={styles.userStats}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>${user.totalSaved.toLocaleString()}</ThemedText>
                  <ThemedText style={styles.statLabel}>Total Saved</ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>${user.monthlySavingsGoal.toLocaleString()}</ThemedText>
                  <ThemedText style={styles.statLabel}>Monthly Goal</ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>{user.goals.length}</ThemedText>
                  <ThemedText style={styles.statLabel}>Active Goals</ThemedText>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Goals List */}
          <View style={styles.goalsSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Your Goals</ThemedText>
            {user.goals.map((goal) => {
              const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
              const daysRemaining = getDaysRemaining(goal.deadline);
              
              return (
                <View key={goal.id} style={styles.goalCard}>
                  <LinearGradient
                    colors={['#fff', '#f8f9fa']}
                    style={styles.goalGradient}
                  >
                    <View style={styles.goalHeader}>
                      <View style={styles.goalInfo}>
                        <ThemedText type="defaultSemiBold" style={styles.goalTitle}>
                          {goal.title}
                        </ThemedText>
                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(goal.status) }]}>
                          <IconSymbol size={12} name={getStatusIcon(goal.status)} color="#fff" />
                          <ThemedText style={styles.statusText}>{goal.status.replace('-', ' ')}</ThemedText>
                        </View>
                      </View>
                      <View style={styles.goalAmount}>
                        <ThemedText style={styles.amountText}>
                          ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                        </ThemedText>
                      </View>
                    </View>

                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <LinearGradient
                          colors={progress >= 100 ? ['#4CAF50', '#45A049'] : ['#2196F3', '#1976D2']}
                          style={[styles.progressFill, { width: `${progress}%` }]}
                        />
                      </View>
                      <ThemedText style={styles.progressText}>
                        {progress.toFixed(1)}% complete
                      </ThemedText>
                    </View>

                    <View style={styles.goalDetails}>
                      <View style={styles.detailItem}>
                        <IconSymbol size={14} name="calendar" color="#666" />
                        <ThemedText style={styles.detailText}>
                          {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                        </ThemedText>
                      </View>
                      <View style={styles.detailItem}>
                        <IconSymbol size={14} name="tag.fill" color="#666" />
                        <ThemedText style={styles.detailText}>{goal.category}</ThemedText>
                      </View>
                    </View>

                    {/* Daily Progress Slider */}
                    <View style={styles.dailyProgressSection}>
                      <View style={styles.dailyProgressHeader}>
                        <ThemedText style={styles.dailyProgressTitle}>Today's Progress</ThemedText>
                        <ThemedText style={styles.dailyProgressValue}>{goal.dailyProgress}%</ThemedText>
                      </View>
                      <View style={styles.sliderContainer}>
                        {[0, 25, 50, 75, 100].map((value) => (
                          <TouchableOpacity
                            key={value}
                            style={[
                              styles.sliderButton,
                              goal.dailyProgress >= value && styles.sliderButtonActive
                            ]}
                            onPress={() => handleDailyProgressChange(goal.id, value)}
                          >
                            <ThemedText style={[
                              styles.sliderButtonText,
                              goal.dailyProgress >= value && styles.sliderButtonTextActive
                            ]}>
                              {value}%
                            </ThemedText>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    {/* Status Actions */}
                    <View style={styles.statusActions}>
                      <TouchableOpacity
                        style={[styles.statusButton, goal.status === 'in-progress' && styles.statusButtonActive]}
                        onPress={() => handleStatusChange(goal.id, 'in-progress')}
                      >
                        <IconSymbol size={16} name="play.circle.fill" color={goal.status === 'in-progress' ? '#fff' : '#2196F3'} />
                        <ThemedText style={[styles.statusButtonText, goal.status === 'in-progress' && styles.statusButtonTextActive]}>
                          In Progress
                        </ThemedText>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={[styles.statusButton, goal.status === 'paused' && styles.statusButtonActive]}
                        onPress={() => handleStatusChange(goal.id, 'paused')}
                      >
                        <IconSymbol size={16} name="pause.circle.fill" color={goal.status === 'paused' ? '#fff' : '#FF9800'} />
                        <ThemedText style={[styles.statusButtonText, goal.status === 'paused' && styles.statusButtonTextActive]}>
                          Paused
                        </ThemedText>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={[styles.statusButton, goal.status === 'completed' && styles.statusButtonActive]}
                        onPress={() => handleStatusChange(goal.id, 'completed')}
                      >
                        <IconSymbol size={16} name="checkmark.circle.fill" color={goal.status === 'completed' ? '#fff' : '#4CAF50'} />
                        <ThemedText style={[styles.statusButtonText, goal.status === 'completed' && styles.statusButtonTextActive]}>
                          Completed
                        </ThemedText>
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  header: {
    marginBottom: 16,
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  userInfoCard: {
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  userInfoGradient: {
    borderRadius: 16,
    padding: 20,
  },
  userInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    color: '#333',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  goalsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  goalCard: {
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  goalGradient: {
    borderRadius: 16,
    padding: 20,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  goalAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  goalDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  dailyProgressSection: {
    marginBottom: 16,
  },
  dailyProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dailyProgressTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  dailyProgressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    minWidth: 50,
    alignItems: 'center',
  },
  sliderButtonActive: {
    backgroundColor: '#4CAF50',
  },
  sliderButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  sliderButtonTextActive: {
    color: '#fff',
  },
  statusActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#4CAF50',
  },
  statusButtonText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
}); 
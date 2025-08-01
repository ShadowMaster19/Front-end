import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAppState } from '@/services/AppContext';
import { useAuth } from '@/services/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  gradient: any;
  route: any;
}

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { 
    totalSaved, 
    monthlyGoal, 
    currentStreak, 
    recentActivities,
    addActivity 
  } = useAppState();
  
  const { user, signOut } = useAuth();

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Chat with Seed',
      description: 'Get personalized financial advice',
      icon: 'brain.head.profile',
      gradient: ['#4CAF50', '#45A049'],
      route: '/(tabs)/seed',
    },
    {
      id: '2',
      title: 'Add to Savings',
      description: 'Quickly save money to your goals',
      icon: 'plus.circle.fill',
      gradient: ['#2196F3', '#1976D2'],
      route: '/(tabs)/goals',
    },
    {
      id: '3',
      title: 'Watch Video',
      description: 'Learn something new today',
      icon: 'play.circle.fill',
      gradient: ['#FF9800', '#F57C00'],
      route: '/(tabs)/videos',
    },
    {
      id: '4',
      title: 'Check Goals',
      description: 'Track your progress',
      icon: 'target',
      gradient: ['#9C27B0', '#7B1FA2'],
      route: '/(tabs)/check-goals',
    },
  ];

  const getProgressPercentage = () => {
    return Math.min((totalSaved / monthlyGoal) * 100, 100);
  };

  const handleQuickAction = (route: any) => {
    // Add activity when user takes action
    if (route === '/(tabs)/seed') {
      addActivity({
        title: 'Started Chat Session',
        description: 'Opened conversation with Seed AI',
        type: 'chat',
        icon: 'brain.head.profile',
      });
    } else if (route === '/(tabs)/videos') {
      addActivity({
        title: 'Browsed Learning Videos',
        description: 'Explored educational content',
        type: 'video',
        icon: 'play.circle.fill',
      });
    } else if (route === '/(tabs)/check-goals') {
      addActivity({
        title: 'Checked Goals',
        description: 'Reviewed financial objectives',
        type: 'goal',
        icon: 'target',
      });
    }
    
    router.push(route);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  const getActivityIconColor = (type: string) => {
    switch (type) {
      case 'chat': return '#4CAF50';
      case 'video': return '#2196F3';
      case 'goal': return '#9C27B0';
      case 'savings': return '#FF9800';
      default: return '#666';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f8f9fa', '#e8f5e8']}
        style={styles.backgroundGradient}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.greetingContainer}>
                <ThemedText type="title" style={styles.greeting}>
                  Good morning, {user?.name || 'User'}! 🌱
                </ThemedText>
                <View style={styles.streakBadge}>
                  <IconSymbol size={16} name="flame.fill" color="#FF5722" />
                  <ThemedText style={styles.streakText}>{currentStreak} day streak</ThemedText>
                </View>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <View style={styles.notificationDot} />
                <IconSymbol size={24} name="bell.fill" color="#666" />
              </TouchableOpacity>
            </View>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Let's grow your savings today
            </ThemedText>
          </View>

          {/* Savings Overview Card */}
          <View style={styles.savingsCard}>
            <LinearGradient
              colors={['#4CAF50', '#45A049']}
              style={styles.savingsGradient}
            >
              <View style={styles.savingsHeader}>
                <ThemedText type="defaultSemiBold" style={styles.savingsTitle}>
                  Monthly Savings Goal
                </ThemedText>
                <ThemedText style={styles.savingsAmount}>
                  ${totalSaved.toLocaleString()} / ${monthlyGoal.toLocaleString()}
                </ThemedText>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${getProgressPercentage()}%` }
                    ]} 
                  />
                </View>
                <ThemedText style={styles.progressText}>
                  {getProgressPercentage().toFixed(1)}% complete
                </ThemedText>
              </View>

              <View style={styles.achievementContainer}>
                <IconSymbol size={20} name="star.fill" color="#FFD700" />
                <ThemedText style={styles.achievementText}>
                  You're on track! Keep it up! 🎉
                </ThemedText>
              </View>
            </LinearGradient>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Quick Actions
            </ThemedText>
            
            <View style={styles.actionsGrid}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionCard}
                  onPress={() => handleQuickAction(action.route)}
                >
                  <LinearGradient
                    colors={action.gradient}
                    style={styles.actionGradient}
                  >
                    <IconSymbol size={28} name={action.icon} color="#fff" />
                    <ThemedText type="defaultSemiBold" style={styles.actionTitle}>
                      {action.title}
                    </ThemedText>
                    <ThemedText style={styles.actionDescription}>
                      {action.description}
                    </ThemedText>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.activitySection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Recent Activity
            </ThemedText>
            
            <View style={styles.activityCard}>
              {recentActivities.map((activity, index) => (
                <View key={index}>
                  <View style={styles.activityItem}>
                                         <View style={styles.activityIconContainer}>
                       <IconSymbol size={20} name={activity.icon as any} color={getActivityIconColor(activity.type)} />
                     </View>
                    <View style={styles.activityContent}>
                      <ThemedText type="defaultSemiBold" style={styles.activityTitle}>
                        {activity.title}
                      </ThemedText>
                      <ThemedText style={styles.activityTime}>{formatTimeAgo(activity.timestamp)}</ThemedText>
                    </View>
                  </View>
                  {index < recentActivities.length - 1 && <View style={styles.activityDivider} />}
                </View>
              ))}
            </View>
          </View>

          {/* Motivational Quote */}
          <View style={styles.quoteCard}>
            <LinearGradient
              colors={['#fff', '#f8f9fa']}
              style={styles.quoteGradient}
            >
              <ThemedText style={styles.quoteText}>
                "The best time to plant a tree was 20 years ago. The second best time is now."
              </ThemedText>
              <ThemedText style={styles.quoteAuthor}>- Chinese Proverb</ThemedText>
            </LinearGradient>
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
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakText: {
    fontSize: 12,
    color: '#FF5722',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
    zIndex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  savingsCard: {
    marginBottom: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  savingsGradient: {
    borderRadius: 20,
    padding: 24,
  },
  savingsHeader: {
    marginBottom: 16,
  },
  savingsTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 4,
  },
  savingsAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  actionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  actionGradient: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
  },
  actionTitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  actionDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  activitySection: {
    marginBottom: 24,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
  activityDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  quoteCard: {
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  quoteGradient: {
    borderRadius: 16,
    padding: 24,
  },
  quoteText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
});

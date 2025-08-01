import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAppState } from '@/services/AppContext';
import { useAuth } from '@/services/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const { totalSaved, goalsCompleted, videosWatched, currentStreak } = useAppState();
  const { user, signOut } = useAuth();

  const stats = {
    totalSaved,
    goalsCompleted,
    videosWatched,
    streakDays: currentStreak,
  };

  const currentMood = {
    emoji: '😊',
    description: 'Feeling confident about my financial goals!',
  };

  const handleAction = (action: string) => {
    Alert.alert('Action', `${action} functionality would be implemented here.`);
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            signOut();
            router.replace('/signin');
          },
        },
      ]
    );
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
            colors={['#4CAF50', '#45A049']}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.profileImageContainer}>
                <LinearGradient
                  colors={['#fff', '#f0f0f0']}
                  style={styles.profileImage}
                >
                  <IconSymbol size={32} name="person.circle.fill" color="#4CAF50" />
                </LinearGradient>
              </View>
              <View style={styles.headerText}>
                <ThemedText type="title" style={styles.headerTitle}>{user?.name || 'User'}</ThemedText>
                <ThemedText type="subtitle" style={styles.headerSubtitle}>Financial Explorer</ThemedText>
              </View>
            </View>
          </LinearGradient>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Stats Overview */}
          <View style={styles.statsSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Your Progress</ThemedText>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <LinearGradient
                  colors={['#4CAF50', '#45A049']}
                  style={styles.statGradient}
                >
                  <IconSymbol size={24} name="dollarsign.circle.fill" color="#fff" />
                  <ThemedText style={styles.statValue}>${stats.totalSaved}</ThemedText>
                  <ThemedText style={styles.statLabel}>Total Saved</ThemedText>
                </LinearGradient>
              </View>
              <View style={styles.statCard}>
                <LinearGradient
                  colors={['#2196F3', '#1976D2']}
                  style={styles.statGradient}
                >
                  <IconSymbol size={24} name="target" color="#fff" />
                  <ThemedText style={styles.statValue}>{stats.goalsCompleted}</ThemedText>
                  <ThemedText style={styles.statLabel}>Goals Completed</ThemedText>
                </LinearGradient>
              </View>
              <View style={styles.statCard}>
                <LinearGradient
                  colors={['#FF9800', '#F57C00']}
                  style={styles.statGradient}
                >
                  <IconSymbol size={24} name="play.circle.fill" color="#fff" />
                  <ThemedText style={styles.statValue}>{stats.videosWatched}</ThemedText>
                  <ThemedText style={styles.statLabel}>Videos Watched</ThemedText>
                </LinearGradient>
              </View>
              <View style={styles.statCard}>
                <LinearGradient
                  colors={['#9C27B0', '#7B1FA2']}
                  style={styles.statGradient}
                >
                  <IconSymbol size={24} name="flame.fill" color="#fff" />
                  <ThemedText style={styles.statValue}>{stats.streakDays}</ThemedText>
                  <ThemedText style={styles.statLabel}>Day Streak</ThemedText>
                </LinearGradient>
              </View>
            </View>
          </View>

          {/* Current Mood */}
          <View style={styles.moodSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Current Mood</ThemedText>
            <View style={styles.moodCard}>
              <LinearGradient
                colors={['#fff', '#f8f9fa']}
                style={styles.moodGradient}
              >
                <View style={styles.moodContent}>
                  <ThemedText style={styles.moodEmoji}>{currentMood.emoji}</ThemedText>
                  <ThemedText style={styles.moodDescription}>{currentMood.description}</ThemedText>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Settings */}
          <View style={styles.settingsSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Settings</ThemedText>
            <View style={styles.settingsCard}>
              <LinearGradient
                colors={['#fff', '#f8f9fa']}
                style={styles.settingsGradient}
              >
                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <IconSymbol size={20} name="bell.fill" color="#4CAF50" />
                    <ThemedText style={styles.settingLabel}>Push Notifications</ThemedText>
                  </View>
                  <Switch
                    value={notifications}
                    onValueChange={setNotifications}
                    trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
                    thumbColor={notifications ? '#fff' : '#f4f3f4'}
                  />
                </View>

                <View style={styles.settingDivider} />

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <IconSymbol size={20} name="moon.fill" color="#9C27B0" />
                    <ThemedText style={styles.settingLabel}>Dark Mode</ThemedText>
                  </View>
                  <Switch
                    value={darkMode}
                    onValueChange={setDarkMode}
                    trackColor={{ false: '#e0e0e0', true: '#9C27B0' }}
                    thumbColor={darkMode ? '#fff' : '#f4f3f4'}
                  />
                </View>

                <View style={styles.settingDivider} />

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <IconSymbol size={20} name="speaker.wave.2.fill" color="#FF9800" />
                    <ThemedText style={styles.settingLabel}>Sound Effects</ThemedText>
                  </View>
                  <Switch
                    value={soundEffects}
                    onValueChange={setSoundEffects}
                    trackColor={{ false: '#e0e0e0', true: '#FF9800' }}
                    thumbColor={soundEffects ? '#fff' : '#f4f3f4'}
                  />
                </View>

                <View style={styles.settingDivider} />

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <IconSymbol size={20} name="hand.tap.fill" color="#2196F3" />
                    <ThemedText style={styles.settingLabel}>Haptic Feedback</ThemedText>
                  </View>
                  <Switch
                    value={hapticFeedback}
                    onValueChange={setHapticFeedback}
                    trackColor={{ false: '#e0e0e0', true: '#2196F3' }}
                    thumbColor={hapticFeedback ? '#fff' : '#f4f3f4'}
                  />
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Actions</ThemedText>
            <View style={styles.actionsCard}>
              <LinearGradient
                colors={['#fff', '#f8f9fa']}
                style={styles.actionsGradient}
              >
                <TouchableOpacity 
                  style={styles.actionItem}
                  onPress={() => handleAction('Export Data')}
                >
                  <View style={styles.actionInfo}>
                    <IconSymbol size={20} name="square.and.arrow.up" color="#4CAF50" />
                    <ThemedText style={styles.actionLabel}>Export Data</ThemedText>
                  </View>
                  <IconSymbol size={16} name="chevron.right" color="#999" />
                </TouchableOpacity>

                <View style={styles.actionDivider} />

                <TouchableOpacity 
                  style={styles.actionItem}
                  onPress={() => handleAction('Help & Support')}
                >
                  <View style={styles.actionInfo}>
                    <IconSymbol size={20} name="questionmark.circle.fill" color="#2196F3" />
                    <ThemedText style={styles.actionLabel}>Help & Support</ThemedText>
                  </View>
                  <IconSymbol size={16} name="chevron.right" color="#999" />
                </TouchableOpacity>

                <View style={styles.actionDivider} />

                <TouchableOpacity 
                  style={styles.actionItem}
                  onPress={() => handleAction('Rate MoneySprout')}
                >
                  <View style={styles.actionInfo}>
                    <IconSymbol size={20} name="star.fill" color="#FF9800" />
                    <ThemedText style={styles.actionLabel}>Rate MoneySprout</ThemedText>
                  </View>
                  <IconSymbol size={16} name="chevron.right" color="#999" />
                </TouchableOpacity>

                <View style={styles.actionDivider} />

                <TouchableOpacity 
                  style={styles.actionItem}
                  onPress={() => handleAction('About')}
                >
                  <View style={styles.actionInfo}>
                    <IconSymbol size={20} name="info.circle.fill" color="#9C27B0" />
                    <ThemedText style={styles.actionLabel}>About</ThemedText>
                  </View>
                  <IconSymbol size={16} name="chevron.right" color="#999" />
                </TouchableOpacity>

                <View style={styles.actionDivider} />

                <TouchableOpacity 
                  style={styles.actionItem}
                  onPress={handleSignOut}
                >
                  <View style={styles.actionInfo}>
                    <IconSymbol size={20} name="rectangle.portrait.and.arrow.right" color="#F44336" />
                    <ThemedText style={[styles.actionLabel, { color: '#F44336' }]}>Sign Out</ThemedText>
                  </View>
                  <IconSymbol size={16} name="chevron.right" color="#F44336" />
                </TouchableOpacity>
              </LinearGradient>
            </View>
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
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
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
  statsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  statGradient: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    minHeight: 100,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  moodSection: {
    marginBottom: 24,
  },
  moodCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  moodGradient: {
    borderRadius: 16,
    padding: 20,
  },
  moodContent: {
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  moodDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingsCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  settingsGradient: {
    borderRadius: 16,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  actionsSection: {
    marginBottom: 24,
  },
  actionsCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  actionsGradient: {
    borderRadius: 16,
    padding: 20,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  actionDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
}); 
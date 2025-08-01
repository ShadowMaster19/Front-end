import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAppState } from '@/services/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  difficulty: string;
  instructor: string;
  videoUrl: string;
  progress: number;
  isCompleted: boolean;
  thumbnail: string;
}

export default function VideosScreen() {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'How to Build an Emergency Fund',
      description: 'Learn the importance of emergency funds and practical steps to build one.',
      duration: '8:45',
      category: 'Basics',
      difficulty: 'Beginner',
      instructor: 'Financial Education',
      videoUrl: 'https://www.youtube.com/watch?v=tVGJqaOkqac',
      progress: 0,
      isCompleted: false,
      thumbnail: 'https://via.placeholder.com/80x80',
    },
    {
      id: '2',
      title: 'Budgeting for Beginners',
      description: 'Master the fundamentals of budgeting and take control of your finances.',
      duration: '12:30',
      category: 'Budgeting',
      difficulty: 'Beginner',
      instructor: 'Personal Finance',
      videoUrl: 'https://www.youtube.com/watch?v=xfPbT7HPkKA',
      progress: 0,
      isCompleted: false,
      thumbnail: 'https://via.placeholder.com/80x80',
    },
    {
      id: '3',
      title: 'Smart Money Saving Tips',
      description: 'Discover practical strategies to save money on everyday expenses.',
      duration: '10:15',
      category: 'Saving',
      difficulty: 'Beginner',
      instructor: 'Money Management',
      videoUrl: 'https://www.youtube.com/watch?v=JP__utZQLb8&t=13s',
      progress: 0,
      isCompleted: false,
      thumbnail: 'https://via.placeholder.com/80x80',
    },
    {
      id: '4',
      title: 'Debt Payoff Strategies',
      description: 'Effective methods to eliminate debt and achieve financial freedom.',
      duration: '15:20',
      category: 'Debt',
      difficulty: 'Intermediate',
      instructor: 'Debt Management',
      videoUrl: 'https://www.youtube.com/watch?v=w4Kbq0VJEhY',
      progress: 0,
      isCompleted: false,
      thumbnail: 'https://via.placeholder.com/80x80',
    },
    {
      id: '5',
      title: 'Investing Basics',
      description: 'Start your investment journey with these fundamental concepts.',
      duration: '18:45',
      category: 'Investing',
      difficulty: 'Intermediate',
      instructor: 'Investment Education',
      videoUrl: 'https://www.youtube.com/watch?v=qIw-yFC-HNU',
      progress: 0,
      isCompleted: false,
      thumbnail: 'https://via.placeholder.com/80x80',
    },
    {
      id: '6',
      title: 'Understanding Credit',
      description: 'Learn how credit works and how to build a strong credit history.',
      duration: '9:30',
      category: 'Basics',
      difficulty: 'Beginner',
      instructor: 'Credit Education',
      videoUrl: 'https://www.youtube.com/watch?v=EBdXREhOuME',
      progress: 0,
      isCompleted: false,
      thumbnail: 'https://via.placeholder.com/80x80',
    },
    {
      id: '7',
      title: 'Financial Mindset',
      description: 'Develop a healthy relationship with money and build wealth.',
      duration: '14:20',
      category: 'Basics',
      difficulty: 'Intermediate',
      instructor: 'Financial Psychology',
      videoUrl: 'https://www.youtube.com/watch?v=ZF8YiXKYUBg&t=584s',
      progress: 0,
      isCompleted: false,
      thumbnail: 'https://via.placeholder.com/80x80',
    },
    {
      id: '8',
      title: 'Retirement Planning',
      description: 'Plan for your future and secure your retirement years.',
      duration: '16:10',
      category: 'Investing',
      difficulty: 'Intermediate',
      instructor: 'Retirement Planning',
      videoUrl: 'https://www.youtube.com/watch?v=JxdUWsudi6g',
      progress: 0,
      isCompleted: false,
      thumbnail: 'https://via.placeholder.com/80x80',
    },
    {
      id: '9',
      title: 'Tax Fundamentals',
      description: 'Understanding taxes and maximizing your tax benefits.',
      duration: '11:45',
      category: 'Basics',
      difficulty: 'Beginner',
      instructor: 'Tax Education',
      videoUrl: 'https://www.youtube.com/watch?v=Z2r_apNMTeM',
      progress: 0,
      isCompleted: false,
      thumbnail: 'https://via.placeholder.com/80x80',
    },
    {
      id: '10',
      title: 'Multiple Income Sources',
      description: 'Diversify your income and build financial security.',
      duration: '20:30',
      category: 'Investing',
      difficulty: 'Advanced',
      instructor: 'Income Strategies',
      videoUrl: 'https://www.youtube.com/watch?v=eE7_bop-3MU',
      progress: 0,
      isCompleted: false,
      thumbnail: 'https://via.placeholder.com/80x80',
    },
    {
      id: '11',
      title: 'Insurance Essentials',
      description: 'Understanding insurance and protecting your financial future.',
      duration: '13:15',
      category: 'Basics',
      difficulty: 'Intermediate',
      instructor: 'Insurance Education',
      videoUrl: 'https://www.youtube.com/watch?v=AHBiWGGmClU',
      progress: 0,
      isCompleted: false,
      thumbnail: 'https://via.placeholder.com/80x80',
    },
    {
      id: '12',
      title: 'Student Loan Management',
      description: 'Strategies for managing and paying off student debt.',
      duration: '12:40',
      category: 'Debt',
      difficulty: 'Intermediate',
      instructor: 'Student Finance',
      videoUrl: 'https://www.youtube.com/watch?v=0zGEiLL9N4w',
      progress: 0,
      isCompleted: false,
      thumbnail: 'https://via.placeholder.com/80x80',
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { watchVideo } = useAppState();

  const categories = ['All', 'Basics', 'Budgeting', 'Saving', 'Debt', 'Investing'];

  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const startVideo = async (videoId: string) => {
    const video = videos.find(v => v.id === videoId);
    if (video) {
      try {
        // For web environment, open YouTube URL in new tab
        if (typeof window !== 'undefined') {
          window.open(video.videoUrl, '_blank');
          
          // Update progress when video is opened
          setVideos(prev =>
            prev.map(v =>
              v.id === videoId
                ? { ...v, progress: v.progress === 0 ? 25 : v.progress }
                : v
            )
          );
          
          // Add activity to global state
          watchVideo(videoId);
          
          // Show success message
          Alert.alert(
            'Video Opened!',
            `"${video.title}" has been opened in a new tab. Your progress will be tracked.`,
            [{ text: 'OK' }]
          );
        } else {
          // Fallback for mobile
          Alert.alert(
            'Video Started!',
            `"${video.title}" is now playing. Your progress will be tracked.`,
            [
              {
                text: 'OK',
                onPress: () => {
                  // Update progress when video is started
                  setVideos(prev =>
                    prev.map(v =>
                      v.id === videoId
                        ? { ...v, progress: v.progress === 0 ? 25 : v.progress }
                        : v
                    )
                  );
                  
                  // Add activity to global state
                  watchVideo(videoId);
                }
              }
            ]
          );
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to open video');
      }
    }
  };

  const completeVideo = (videoId: string) => {
    const video = videos.find(v => v.id === videoId);
    if (video) {
      Alert.alert(
        'Video Completed!',
        `Congratulations! You've completed "${video.title}". Your progress has been updated.`,
        [
          {
            text: 'Great!',
            onPress: () => {
              setVideos(prev =>
                prev.map(v =>
                  v.id === videoId
                    ? { ...v, isCompleted: true, progress: 100 }
                    : v
                )
              );
              
              // Add activity to global state
              watchVideo(videoId);
            }
          }
        ]
      );
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#607D8B';
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
            colors={['#4CAF50', '#45A049']}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerIconContainer}>
                <IconSymbol size={32} name="play.circle.fill" color="#fff" />
              </View>
              <View style={styles.headerText}>
                <ThemedText type="title" style={styles.headerTitle}>Learn & Grow</ThemedText>
                <ThemedText type="subtitle" style={styles.headerSubtitle}>Financial education made simple</ThemedText>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <LinearGradient
                colors={selectedCategory === category ? ['#4CAF50', '#45A049'] : ['#f0f0f0', '#e0e0e0']}
                style={styles.categoryGradient}
              >
                <ThemedText style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>
                  {category}
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {filteredVideos.map((video) => (
            <View key={video.id} style={styles.videoCard}>
              <LinearGradient
                colors={['#fff', '#f8f9fa']}
                style={styles.videoGradient}
              >
                <View style={styles.videoHeader}>
                  <View style={styles.thumbnailContainer}>
                    <View style={styles.thumbnailBackground}>
                      <ThemedText style={styles.thumbnail}>📺</ThemedText>
                    </View>
                    {video.isCompleted && (
                      <View style={styles.completedBadge}>
                        <IconSymbol size={16} name="checkmark.circle.fill" color="#fff" />
                      </View>
                    )}
                  </View>
                  <View style={styles.videoInfo}>
                    <ThemedText type="defaultSemiBold" style={styles.videoTitle}>
                      {video.title}
                    </ThemedText>
                    <ThemedText style={styles.videoDescription}>
                      {video.description}
                    </ThemedText>
                    <View style={styles.videoMeta}>
                      <View style={styles.metaItem}>
                        <IconSymbol size={14} name="clock" color="#999" />
                        <ThemedText style={styles.duration}>{video.duration}</ThemedText>
                      </View>
                      <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(video.category) }]}>
                        <ThemedText style={styles.categoryBadgeText}>{video.category}</ThemedText>
                      </View>
                      <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(video.difficulty) }]}>
                        <ThemedText style={styles.difficultyBadgeText}>{video.difficulty}</ThemedText>
                      </View>
                    </View>
                    <ThemedText style={styles.instructor}>by {video.instructor}</ThemedText>
                  </View>
                </View>

                {video.progress > 0 && video.progress < 100 && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <LinearGradient
                        colors={['#4CAF50', '#45A049']}
                        style={[styles.progressFill, { width: `${video.progress}%` }]}
                      />
                    </View>
                    <ThemedText style={styles.progressText}>{video.progress}% complete</ThemedText>
                  </View>
                )}

                <View style={styles.actionButtons}>
                  {video.progress === 0 ? (
                    <TouchableOpacity 
                      style={styles.startButton}
                      onPress={() => startVideo(video.id)}
                    >
                      <LinearGradient
                        colors={['#4CAF50', '#45A049']}
                        style={styles.startButtonGradient}
                      >
                        <IconSymbol size={20} name="play.fill" color="#fff" />
                        <ThemedText style={styles.buttonText}>Start Learning</ThemedText>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : video.progress < 100 ? (
                    <TouchableOpacity 
                      style={styles.continueButton}
                      onPress={() => startVideo(video.id)}
                    >
                      <LinearGradient
                        colors={['#2196F3', '#1976D2']}
                        style={styles.continueButtonGradient}
                      >
                        <IconSymbol size={20} name="play.fill" color="#fff" />
                        <ThemedText style={styles.continueButtonText}>Continue</ThemedText>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity 
                      style={styles.completedButton}
                      onPress={() => completeVideo(video.id)}
                    >
                      <LinearGradient
                        colors={['#9C27B0', '#7B1FA2']}
                        style={styles.completedButtonGradient}
                      >
                        <IconSymbol size={20} name="checkmark.circle.fill" color="#fff" />
                        <ThemedText style={styles.completedButtonText}>Completed</ThemedText>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                  
                  <TouchableOpacity 
                    style={styles.replayButton}
                    onPress={() => startVideo(video.id)}
                  >
                    <IconSymbol size={16} name="arrow.clockwise" color="#666" />
                    <ThemedText style={styles.replayButtonText}>Replay</ThemedText>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    Basics: '#2196F3',
    Budgeting: '#4CAF50',
    Saving: '#FF9800',
    Debt: '#F44336',
    Investing: '#9C27B0',
  };
  return colors[category] || '#607D8B';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  header: {
    marginBottom: 8,
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
  categoryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    marginRight: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  categoryGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedCategory: {
    backgroundColor: 'transparent',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  videoCard: {
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  videoGradient: {
    borderRadius: 16,
    padding: 20,
  },
  videoHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  thumbnailContainer: {
    position: 'relative',
    marginRight: 16,
  },
  thumbnailBackground: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    fontSize: 36,
  },
  completedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    lineHeight: 22,
  },
  videoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  duration: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
  },
  categoryBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  instructor: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  continueButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  completedButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  completedButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  replayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  completedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  replayButtonText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 4,
  },
}); 
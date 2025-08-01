import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAppState } from '@/services/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  isCompleted: boolean;
}

export default function GoalsScreen() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 1000,
      currentAmount: 350,
      deadline: new Date(2024, 11, 31),
      category: 'Emergency',
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Vacation Fund',
      targetAmount: 500,
      currentAmount: 200,
      deadline: new Date(2024, 5, 15),
      category: 'Travel',
      isCompleted: false,
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    category: 'General',
  });

  const { completeGoal, addActivity } = useAppState();

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const addGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      category: newGoal.category,
      isCompleted: false,
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({ title: '', targetAmount: '', category: 'General' });
    setShowAddModal(false);
    
    // Add activity
    addActivity({
      title: 'New Goal Created',
      description: `Started saving for ${newGoal.title}`,
      type: 'goal',
      icon: 'target',
    });
  };

  const addToGoal = (goalId: string, amount: number) => {
    setGoals(prev =>
      prev.map(goal => {
        if (goal.id === goalId) {
          const newAmount = goal.currentAmount + amount;
          const isCompleted = newAmount >= goal.targetAmount && !goal.isCompleted;
          
          // If goal is completed, add to global state
          if (isCompleted) {
            completeGoal(goalId);
            addActivity({
              title: 'Goal Completed!',
              description: `Achieved ${goal.title} target`,
              type: 'goal',
              icon: 'target',
            });
          }
          
          return { 
            ...goal, 
            currentAmount: newAmount,
            isCompleted: isCompleted || goal.isCompleted
          };
        }
        return goal;
      })
    );
    
    // Add activity for savings
    addActivity({
      title: 'Added to Savings',
      description: `Added $${amount} to a goal`,
      type: 'savings',
      icon: 'dollarsign.circle.fill',
    });
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
                <IconSymbol size={32} name="target" color="#fff" />
              </View>
              <View style={styles.headerText}>
                <ThemedText type="title" style={styles.headerTitle}>Savings Goals</ThemedText>
                <ThemedText type="subtitle" style={styles.headerSubtitle}>Track your progress</ThemedText>
              </View>
            </View>
          </LinearGradient>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {goals.map((goal) => {
            const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
            const daysRemaining = getDaysRemaining(goal.deadline);
            
            return (
              <View key={goal.id} style={styles.goalCard}>
                <LinearGradient
                  colors={['#fff', '#f8f9fa']}
                  style={styles.goalGradient}
                >
                  <View style={styles.goalHeader}>
                    <ThemedText type="defaultSemiBold" style={styles.goalTitle}>
                      {goal.title}
                    </ThemedText>
                    <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(goal.category) }]}>
                      <ThemedText style={styles.categoryText}>{goal.category}</ThemedText>
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
                      ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                    </ThemedText>
                  </View>

                  <View style={styles.goalDetails}>
                    <View style={styles.detailItem}>
                      <IconSymbol size={16} name="calendar" color="#666" />
                      <ThemedText style={styles.detailText}>
                        {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Deadline passed'}
                      </ThemedText>
                    </View>
                    <View style={styles.detailItem}>
                      <IconSymbol size={16} name="chart.bar.fill" color="#666" />
                      <ThemedText style={styles.detailText}>
                        {progress.toFixed(1)}% complete
                      </ThemedText>
                    </View>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={() => addToGoal(goal.id, 10)}
                    >
                      <LinearGradient
                        colors={['#4CAF50', '#45A049']}
                        style={styles.addButtonGradient}
                      >
                        <ThemedText style={styles.buttonText}>+$10</ThemedText>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={() => addToGoal(goal.id, 25)}
                    >
                      <LinearGradient
                        colors={['#2196F3', '#1976D2']}
                        style={styles.addButtonGradient}
                      >
                        <ThemedText style={styles.buttonText}>+$25</ThemedText>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={() => addToGoal(goal.id, 50)}
                    >
                      <LinearGradient
                        colors={['#FF9800', '#F57C00']}
                        style={styles.addButtonGradient}
                      >
                        <ThemedText style={styles.buttonText}>+$50</ThemedText>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            );
          })}
        </ScrollView>

        <TouchableOpacity 
          style={styles.fab}
          onPress={() => setShowAddModal(true)}
        >
          <LinearGradient
            colors={['#4CAF50', '#45A049']}
            style={styles.fabGradient}
          >
            <IconSymbol size={24} name="plus" color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <LinearGradient
                colors={['#fff', '#f8f9fa']}
                style={styles.modalGradient}
              >
                <ThemedText type="title" style={styles.modalTitle}>Add New Goal</ThemedText>
                
                <TextInput
                  style={styles.input}
                  placeholder="Goal name"
                  value={newGoal.title}
                  onChangeText={(text) => setNewGoal(prev => ({ ...prev, title: text }))}
                />
                
                <TextInput
                  style={styles.input}
                  placeholder="Target amount"
                  value={newGoal.targetAmount}
                  onChangeText={(text) => setNewGoal(prev => ({ ...prev, targetAmount: text }))}
                  keyboardType="numeric"
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.modalButton}
                    onPress={() => setShowAddModal(false)}
                  >
                    <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.modalButton}
                    onPress={addGoal}
                  >
                    <LinearGradient
                      colors={['#4CAF50', '#45A049']}
                      style={styles.saveButtonGradient}
                    >
                      <ThemedText style={styles.saveButtonText}>Save Goal</ThemedText>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    Emergency: '#FF5722',
    Travel: '#2196F3',
    Education: '#9C27B0',
    Home: '#4CAF50',
    General: '#607D8B',
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
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  goalDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  addButtonGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalGradient: {
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cancelButtonText: {
    color: '#666',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },
  saveButtonGradient: {
    paddingVertical: 12,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
}); 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, Clock, CheckCircle, Circle, Plus } from 'lucide-react-native';
import { useState } from 'react';

export default function ActivitiesScreen() {
  const [activities, setActivities] = useState([
    { id: 1, time: '10:00 AM', title: 'Physical Therapy', description: 'Stretching exercises', completed: true },
    { id: 2, time: '2:00 PM', title: 'Medication Reminder', description: 'Take afternoon meds', completed: false },
    { id: 3, time: '4:00 PM', title: 'Video Call', description: 'Dr. Johnson checkup', completed: false },
    { id: 4, time: '6:00 PM', title: 'Evening Walk', description: '15 minutes around the block', completed: false },
  ]);

  const toggleActivity = (id: number) => {
    setActivities(activities.map(activity =>
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    ));
  };

  const completedCount = activities.filter(a => a.completed).length;
  const totalCount = activities.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Activities</Text>
        <Text style={styles.subtitle}>Track your schedule and tasks</Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completedCount}/{totalCount}</Text>
          <Text style={styles.statLabel}>Completed Today</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalCount) * 100}%` }]} />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color="#2563eb" />
            </TouchableOpacity>
          </View>

          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={[styles.activityCard, activity.completed && styles.activityCardCompleted]}
              onPress={() => toggleActivity(activity.id)}>
              <View style={styles.activityLeft}>
                <View style={styles.timeContainer}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <View style={styles.activityDetails}>
                  <Text style={[styles.activityTitle, activity.completed && styles.activityTitleCompleted]}>
                    {activity.title}
                  </Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                </View>
              </View>
              <View style={styles.checkContainer}>
                {activity.completed ? (
                  <CheckCircle size={24} color="#10b981" />
                ) : (
                  <Circle size={24} color="#d1d5db" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Overview</Text>

          <View style={styles.weekDays}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <View key={day} style={[styles.dayCard, index === 2 && styles.dayCardActive]}>
                <Text style={[styles.dayText, index === 2 && styles.dayTextActive]}>{day}</Text>
                <View style={[styles.dayDot, index < 3 && styles.dayDotCompleted]} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Categories</Text>

          <View style={styles.categoryGrid}>
            <View style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: '#dbeafe' }]}>
                <Text style={styles.categoryEmoji}>💊</Text>
              </View>
              <Text style={styles.categoryTitle}>Medications</Text>
              <Text style={styles.categoryCount}>3 daily</Text>
            </View>

            <View style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: '#fef3c7' }]}>
                <Text style={styles.categoryEmoji}>🏃</Text>
              </View>
              <Text style={styles.categoryTitle}>Exercise</Text>
              <Text style={styles.categoryCount}>2 today</Text>
            </View>

            <View style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: '#d1fae5' }]}>
                <Text style={styles.categoryEmoji}>🩺</Text>
              </View>
              <Text style={styles.categoryTitle}>Therapy</Text>
              <Text style={styles.categoryCount}>1 today</Text>
            </View>

            <View style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: '#fce7f3' }]}>
                <Text style={styles.categoryEmoji}>📱</Text>
              </View>
              <Text style={styles.categoryTitle}>Appointments</Text>
              <Text style={styles.categoryCount}>1 today</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#dbeafe',
  },
  statsCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityCardCompleted: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activityLeft: {
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 6,
  },
  activityDetails: {
    marginLeft: 22,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  activityTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  activityDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  checkContainer: {
    marginLeft: 12,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  dayCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dayCardActive: {
    backgroundColor: '#2563eb',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  dayTextActive: {
    color: '#fff',
  },
  dayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e5e7eb',
  },
  dayDotCompleted: {
    backgroundColor: '#10b981',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#6b7280',
  },
});

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AlertCircle, Phone, Heart, Activity } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AccessCare</Text>
        <Text style={styles.subtitle}>Your Daily Support Hub</Text>
      </View>

      <TouchableOpacity style={styles.sosButton}>
        <AlertCircle size={32} color="#fff" />
        <Text style={styles.sosText}>Emergency SOS</Text>
      </TouchableOpacity>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Video size={28} color="#2563eb" />
            </View>
            <Text style={styles.actionTitle}>Call Doctor</Text>
            <Text style={styles.actionSubtitle}>Video consultation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <MessageCircle size={28} color="#2563eb" />
            </View>
            <Text style={styles.actionTitle}>AI Assistant</Text>
            <Text style={styles.actionSubtitle}>Voice help</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Activity size={28} color="#2563eb" />
            </View>
            <Text style={styles.actionTitle}>Today's Tasks</Text>
            <Text style={styles.actionSubtitle}>5 activities</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Heart size={28} color="#2563eb" />
            </View>
            <Text style={styles.actionTitle}>Health Log</Text>
            <Text style={styles.actionSubtitle}>Track vitals</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Activities</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityTime}>
            <Text style={styles.timeText}>10:00 AM</Text>
          </View>
          <View style={styles.activityDetails}>
            <Text style={styles.activityTitle}>Physical Therapy</Text>
            <Text style={styles.activityDescription}>Stretching exercises</Text>
          </View>
        </View>
        <View style={styles.activityCard}>
          <View style={styles.activityTime}>
            <Text style={styles.timeText}>2:00 PM</Text>
          </View>
          <View style={styles.activityDetails}>
            <Text style={styles.activityTitle}>Medication Reminder</Text>
            <Text style={styles.activityDescription}>Take afternoon meds</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#dbeafe',
  },
  sosButton: {
    backgroundColor: '#dc2626',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sosText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
  quickActions: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
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
  actionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#6b7280',
  },
  section: {
    padding: 16,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityTime: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 12,
    marginRight: 16,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
});

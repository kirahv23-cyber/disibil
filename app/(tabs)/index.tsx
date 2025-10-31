import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, AccessibilityInfo } from 'react-native';
import { Mic, Camera, CheckSquare, Navigation, AlertTriangle, Volume2, Gamepad2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [sosActive, setSosActive] = useState(false);

  const handleSOSPress = async () => {
    setSosActive(!sosActive);
    await AccessibilityInfo.announceForAccessibility(
      sosActive ? 'Emergency SOS deactivated' : 'Emergency SOS activated. Long press to trigger emergency alert.'
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>AssistWay</Text>
          <Text style={styles.subtitle}>Accessibility-First Assistant</Text>
        </View>

        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.quickTile}
            onPress={() => router.push('/(tabs)/assistant')}
            accessibilityLabel="AI Speak - Voice commands"
            accessibilityRole="button"
          >
            <Mic size={40} color="#fff" />
            <Text style={styles.tileName}>AI Speak</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickTile, { backgroundColor: '#0891b2' }]}
            onPress={() => router.push('/camera-mode')}
            accessibilityLabel="Camera - Detect objects and read descriptions"
            accessibilityRole="button"
          >
            <Camera size={40} color="#fff" />
            <Text style={styles.tileName}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickTile}
            onPress={() => router.push('/(tabs)/activities')}
            accessibilityLabel="Add Task - Create new task"
            accessibilityRole="button"
          >
            <CheckSquare size={40} color="#fff" />
            <Text style={styles.tileName}>Add Task</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickTile}
            onPress={() => router.push('/navigation')}
            accessibilityLabel="Navigation - Voice guided directions"
            accessibilityRole="button"
          >
            <Navigation size={40} color="#fff" />
            <Text style={styles.tileName}>Navigate</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Activities Today</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityTime}>
              <Text style={styles.timeText}>10:00 AM</Text>
            </View>
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>Physical Therapy</Text>
              <Text style={styles.activityDescription}>Stretching exercises</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Doctor Appointment</Text>
          <View style={styles.appointmentCard}>
            <Text style={styles.appointmentDoctor}>Dr. Smith</Text>
            <Text style={styles.appointmentTime}>Tomorrow at 2:00 PM</Text>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => router.push('/(tabs)/video-call')}
              accessibilityLabel="Join video call"
            >
              <Text style={styles.joinButtonText}>Join Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Features</Text>
          <View style={styles.featureGrid}>
            <TouchableOpacity
              style={[styles.featureTile, { backgroundColor: '#d946ef' }]}
              onPress={() => router.push('/tts-editor')}
              accessibilityLabel="Text to Speech Editor"
              accessibilityRole="button"
            >
              <Volume2 size={32} color="#fff" />
              <Text style={styles.tileNameSmall}>TTS Editor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.featureTile, { backgroundColor: '#f59e0b' }]}
              onPress={() => router.push('/tts-grid')}
              accessibilityLabel="Quick Speech Phrases"
              accessibilityRole="button"
            >
              <Volume2 size={32} color="#fff" />
              <Text style={styles.tileNameSmall}>Phrases</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.featureTile, { backgroundColor: '#8b5cf6' }]}
              onPress={() => router.push('/games')}
              accessibilityLabel="Accessible Games"
              accessibilityRole="button"
            >
              <Gamepad2 size={32} color="#fff" />
              <Text style={styles.tileNameSmall}>Games</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.sosButton, sosActive && styles.sosButtonActive]}
        onPress={handleSOSPress}
        onLongPress={handleSOSPress}
        accessibilityLabel="Emergency SOS Button"
        accessibilityRole="button"
        accessibilityHint="Long press to send emergency alert with GPS location"
      >
        <AlertTriangle size={36} color="#fff" />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  content: {
    flex: 1,
    paddingBottom: 120,
  },
  header: {
    backgroundColor: '#1e40af',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#bfdbfe',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
    justifyContent: 'space-between',
  },
  quickTile: {
    width: '48%',
    backgroundColor: '#1e40af',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tileName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  featureTile: {
    width: '31%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tileNameSmall: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityTime: {
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 16,
    minWidth: 80,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e40af',
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentDoctor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  appointmentTime: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: '#1e40af',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sosButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dc2626',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  sosButtonActive: {
    backgroundColor: '#991b1b',
    shadowOpacity: 0.5,
  },
  sosText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
});

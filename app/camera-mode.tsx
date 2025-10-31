import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, AccessibilityInfo } from 'react-native';
import { ArrowLeft, Camera as CameraIcon, Volume2, Zap } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function CameraModeScreen() {
  const router = useRouter();
  const [detectionActive, setDetectionActive] = useState(false);
  const [detections, setDetections] = useState<string[]>([]);

  const mockDetections = [
    'Person at 2 meters distance',
    'Dog on the left side',
    'Chair detected in front',
  ];

  const handleStartDetection = async () => {
    setDetectionActive(!detectionActive);
    const message = detectionActive
      ? 'Object detection stopped'
      : 'Object detection started. Point camera at objects to identify them.';
    await AccessibilityInfo.announceForAccessibility(message);

    if (!detectionActive) {
      setTimeout(() => {
        setDetections(mockDetections);
        AccessibilityInfo.announceForAccessibility(mockDetections.join('. '));
      }, 2000);
    }
  };

  const handleReadDetection = async (detection: string) => {
    await AccessibilityInfo.announceForAccessibility(detection);
  };

  const handleClear = () => {
    setDetections([]);
    setDetectionActive(false);
    AccessibilityInfo.announceForAccessibility('Detection cleared');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Camera Detection</Text>
          <Text style={styles.subtitle}>Identify objects and people</Text>
        </View>
      </View>

      <View style={styles.cameraPreview}>
        <CameraIcon size={64} color="#9ca3af" />
        <Text style={styles.cameraText}>
          {detectionActive ? 'Detection Active' : 'Ready to detect'}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <TouchableOpacity
            style={[
              styles.detectionButton,
              detectionActive && styles.detectionButtonActive,
            ]}
            onPress={handleStartDetection}
            accessibilityLabel={detectionActive ? 'Stop detection' : 'Start detection'}
            accessibilityRole="button"
            accessibilityHint="Long press to capture frame and analyze objects"
          >
            <Zap size={24} color="#fff" />
            <Text style={styles.detectionButtonText}>
              {detectionActive ? 'Stop Detection' : 'Start Detection'}
            </Text>
          </TouchableOpacity>
        </View>

        {detections.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detected Objects</Text>
            {detections.map((detection, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.detectionCard}
                onPress={() => handleReadDetection(detection)}
                accessibilityLabel={`${detection}, tap to read description`}
                accessibilityRole="button"
              >
                <View style={styles.detectionContent}>
                  <Text style={styles.detectionText}>{detection}</Text>
                </View>
                <Volume2 size={20} color="#1e40af" />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
              accessibilityLabel="Clear detections"
              accessibilityRole="button"
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              1. Tap "Start Detection" to activate camera{'\n\n'}
              2. Point your phone camera at objects, people, or animals{'\n\n'}
              3. The app will identify and describe what it detects{'\n\n'}
              4. Tap any detection to hear it read aloud
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    backgroundColor: '#1e40af',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#bfdbfe',
  },
  cameraPreview: {
    backgroundColor: '#111827',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cameraText: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 12,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  detectionButton: {
    backgroundColor: '#1e40af',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detectionButtonActive: {
    backgroundColor: '#dc2626',
  },
  detectionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  detectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  detectionContent: {
    flex: 1,
    marginRight: 12,
  },
  detectionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  clearButton: {
    backgroundColor: '#6b7280',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
  },
});

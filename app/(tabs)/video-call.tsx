import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Video, Phone, PhoneOff, Mic, MicOff, Camera, CameraOff } from 'lucide-react-native';
import { useState } from 'react';

export default function VideoCallScreen() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Video Call</Text>
        <Text style={styles.subtitle}>Connect with healthcare providers</Text>
      </View>

      {!isCallActive ? (
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Doctors</Text>

            <TouchableOpacity style={styles.doctorCard}>
              <View style={styles.doctorAvatar}>
                <Text style={styles.avatarText}>DS</Text>
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>Dr. Sarah Johnson</Text>
                <Text style={styles.doctorSpecialty}>General Physician</Text>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Available Now</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => setIsCallActive(true)}>
                <Video size={24} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.doctorCard}>
              <View style={[styles.doctorAvatar, { backgroundColor: '#10b981' }]}>
                <Text style={styles.avatarText}>MC</Text>
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>Dr. Michael Chen</Text>
                <Text style={styles.doctorSpecialty}>Physical Therapist</Text>
                <View style={styles.statusBadge}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Available Now</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => setIsCallActive(true)}>
                <Video size={24} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.doctorCard}>
              <View style={[styles.doctorAvatar, { backgroundColor: '#f59e0b' }]}>
                <Text style={styles.avatarText}>EP</Text>
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>Dr. Emily Parker</Text>
                <Text style={styles.doctorSpecialty}>Mental Health Specialist</Text>
                <View style={[styles.statusBadge, { backgroundColor: '#fef3c7' }]}>
                  <View style={[styles.statusDot, { backgroundColor: '#f59e0b' }]} />
                  <Text style={[styles.statusText, { color: '#f59e0b' }]}>Busy</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.callButton, { backgroundColor: '#9ca3af' }]}>
                <Video size={24} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Contact</Text>
            <TouchableOpacity style={styles.emergencyCard}>
              <Phone size={32} color="#dc2626" />
              <Text style={styles.emergencyText}>Call Emergency Services</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.callScreen}>
          <View style={styles.videoContainer}>
            <View style={styles.remoteVideo}>
              <View style={styles.doctorAvatarLarge}>
                <Text style={styles.avatarTextLarge}>DS</Text>
              </View>
              <Text style={styles.callingText}>Dr. Sarah Johnson</Text>
              <Text style={styles.callStatus}>Connected</Text>
            </View>

            <View style={styles.localVideo}>
              <Text style={styles.localVideoText}>You</Text>
            </View>
          </View>

          <View style={styles.callControls}>
            <TouchableOpacity
              style={[styles.controlButton, isMuted && styles.controlButtonActive]}
              onPress={() => setIsMuted(!isMuted)}>
              {isMuted ? <MicOff size={24} color="#fff" /> : <Mic size={24} color="#fff" />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.endCallButton}
              onPress={() => setIsCallActive(false)}>
              <PhoneOff size={28} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, isCameraOff && styles.controlButtonActive]}
              onPress={() => setIsCameraOff(!isCameraOff)}>
              {isCameraOff ? <CameraOff size={24} color="#fff" /> : <Camera size={24} color="#fff" />}
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  doctorCard: {
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
  doctorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
  },
  callButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#dc2626',
    borderStyle: 'dashed',
  },
  emergencyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#dc2626',
    marginTop: 12,
  },
  callScreen: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  remoteVideo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#374151',
  },
  doctorAvatarLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarTextLarge: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  callingText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  callStatus: {
    fontSize: 16,
    color: '#9ca3af',
  },
  localVideo: {
    position: 'absolute',
    top: 60,
    right: 16,
    width: 100,
    height: 140,
    backgroundColor: '#4b5563',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  localVideoText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  callControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 20,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4b5563',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonActive: {
    backgroundColor: '#dc2626',
  },
  endCallButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

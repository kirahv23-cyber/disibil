import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MessageCircle, Mic, Volume2, AlertCircle, Lightbulb } from 'lucide-react-native';
import { useState } from 'react';

export default function AssistantScreen() {
  const [isListening, setIsListening] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Assistant</Text>
        <Text style={styles.subtitle}>Voice-activated help</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.conversationContainer}>
          <View style={styles.messageBot}>
            <View style={styles.botAvatar}>
              <MessageCircle size={20} color="#fff" />
            </View>
            <View style={styles.messageBubbleBot}>
              <Text style={styles.messageText}>
                Hello! I'm your AI assistant. How can I help you today? You can ask me about your schedule, medications, or use voice commands.
              </Text>
            </View>
          </View>

          <View style={styles.messageUser}>
            <View style={styles.messageBubbleUser}>
              <Text style={styles.messageTextUser}>What's on my schedule today?</Text>
            </View>
          </View>

          <View style={styles.messageBot}>
            <View style={styles.botAvatar}>
              <MessageCircle size={20} color="#fff" />
            </View>
            <View style={styles.messageBubbleBot}>
              <Text style={styles.messageText}>
                You have 3 activities scheduled today:
                {'\n\n'}
                1. Physical Therapy at 10:00 AM
                {'\n'}
                2. Medication reminder at 2:00 PM
                {'\n'}
                3. Video call with Dr. Johnson at 4:00 PM
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.suggestionsSection}>
          <Text style={styles.suggestionsTitle}>Quick Commands</Text>

          <TouchableOpacity style={styles.suggestionCard}>
            <Lightbulb size={20} color="#2563eb" />
            <Text style={styles.suggestionText}>What's my medication schedule?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.suggestionCard}>
            <Lightbulb size={20} color="#2563eb" />
            <Text style={styles.suggestionText}>Call emergency contact</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.suggestionCard}>
            <Lightbulb size={20} color="#2563eb" />
            <Text style={styles.suggestionText}>Read today's reminders</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.suggestionCard}>
            <Lightbulb size={20} color="#2563eb" />
            <Text style={styles.suggestionText}>Schedule doctor appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.volumeButton}>
          <Volume2 size={24} color="#6b7280" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.micButton, isListening && styles.micButtonActive]}
          onPress={() => setIsListening(!isListening)}>
          <Mic size={32} color="#fff" />
          {isListening && (
            <View style={styles.listeningIndicator}>
              <View style={styles.pulse} />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpButton}>
          <AlertCircle size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {isListening && (
        <View style={styles.listeningBanner}>
          <Text style={styles.listeningText}>Listening...</Text>
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
  conversationContainer: {
    padding: 16,
  },
  messageBot: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  messageUser: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  messageBubbleBot: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderTopLeftRadius: 4,
    padding: 12,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  messageBubbleUser: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    borderTopRightRadius: 4,
    padding: 12,
    maxWidth: '75%',
  },
  messageText: {
    fontSize: 15,
    color: '#111827',
    lineHeight: 20,
  },
  messageTextUser: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 20,
  },
  suggestionsSection: {
    padding: 16,
    paddingTop: 8,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  suggestionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionText: {
    fontSize: 15,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 16,
  },
  volumeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  micButtonActive: {
    backgroundColor: '#dc2626',
  },
  helpButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listeningIndicator: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dc2626',
    opacity: 0.3,
  },
  listeningBanner: {
    position: 'absolute',
    bottom: 110,
    left: 16,
    right: 16,
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  listeningText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

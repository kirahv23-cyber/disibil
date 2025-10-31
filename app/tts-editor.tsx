import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, AccessibilityInfo } from 'react-native';
import { ArrowLeft, Volume2, Copy } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function TTSEditorScreen() {
  const router = useRouter();
  const [text, setText] = useState('');

  const handleSpeak = async () => {
    if (!text.trim()) {
      await AccessibilityInfo.announceForAccessibility('Please enter text to speak');
      return;
    }
    await AccessibilityInfo.announceForAccessibility(`Speaking: ${text}`);
  };

  const handleCopy = async () => {
    if (text.trim()) {
      await AccessibilityInfo.announceForAccessibility('Text copied to clipboard');
    }
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
          <Text style={styles.title}>Text to Speech</Text>
          <Text style={styles.subtitle}>Type and hear your words</Text>
        </View>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.section}>
          <Text style={styles.label}>Enter your text:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Type something to speak..."
            placeholderTextColor="#9ca3af"
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={8}
            accessibilityLabel="Text input for speech"
            accessibilityHint="Enter text that you want the app to read aloud"
          />
          <Text style={styles.charCount}>{text.length} characters</Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.speakButton}
            onPress={handleSpeak}
            accessibilityLabel="Speak text"
            accessibilityRole="button"
            accessibilityHint="The app will read the entered text aloud"
          >
            <Volume2 size={24} color="#fff" />
            <Text style={styles.speakButtonText}>Speak Text</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopy}
            accessibilityLabel="Copy text"
            accessibilityRole="button"
          >
            <Copy size={24} color="#1e40af" />
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Common Phrases:</Text>
          <View style={styles.phraseGrid}>
            {['Hello', 'Thank you', 'Yes', 'No', 'Help', 'Water'].map((phrase) => (
              <TouchableOpacity
                key={phrase}
                style={styles.phraseCard}
                onPress={() => setText(text ? `${text} ${phrase}` : phrase)}
                accessibilityLabel={`Add ${phrase} to text`}
                accessibilityRole="button"
              >
                <Text style={styles.phraseText}>{phrase}</Text>
              </TouchableOpacity>
            ))}
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
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 140,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'right',
  },
  buttonGroup: {
    gap: 12,
    marginBottom: 24,
  },
  speakButton: {
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
  speakButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  copyButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: '#1e40af',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  copyButtonText: {
    color: '#1e40af',
    fontSize: 16,
    fontWeight: '600',
  },
  phraseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  phraseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: '28%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e40af',
  },
  phraseText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
  },
});

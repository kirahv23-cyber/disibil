import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, AccessibilityInfo } from 'react-native';
import { ArrowLeft, Utensils, AlertCircle, Heart, Smile, Home, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface PhraseButton {
  id: string;
  text: string;
  icon: React.ComponentType<any>;
  category: string;
  color: string;
}

const PHRASES: PhraseButton[] = [
  { id: '1', text: 'I need food', icon: Utensils, category: 'needs', color: '#f97316' },
  { id: '2', text: 'Help me', icon: AlertCircle, category: 'emergency', color: '#dc2626' },
  { id: '3', text: 'I am okay', icon: Smile, category: 'status', color: '#10b981' },
  { id: '4', text: 'I need water', icon: Heart, category: 'needs', color: '#3b82f6' },
  { id: '5', text: 'Take me home', icon: Home, category: 'navigation', color: '#8b5cf6' },
  { id: '6', text: 'Where am I', icon: MapPin, category: 'navigation', color: '#14b8a6' },
  { id: '7', text: 'Thank you', icon: Smile, category: 'polite', color: '#06b6d4' },
  { id: '8', text: 'Yes', icon: Smile, category: 'answers', color: '#10b981' },
];

export default function TTSGridScreen() {
  const router = useRouter();
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);

  const handlePhrasePress = async (phrase: PhraseButton) => {
    setSelectedPhrase(phrase.id);
    await AccessibilityInfo.announceForAccessibility(`Speaking: ${phrase.text}`);
    setTimeout(() => setSelectedPhrase(null), 500);
  };

  const categories = Array.from(new Set(PHRASES.map(p => p.category)));

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
          <Text style={styles.title}>Quick Phrases</Text>
          <Text style={styles.subtitle}>Tap to speak</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {categories.map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
            <View style={styles.phraseGrid}>
              {PHRASES.filter(p => p.category === category).map((phrase) => {
                const IconComponent = phrase.icon;
                const isSelected = selectedPhrase === phrase.id;

                return (
                  <TouchableOpacity
                    key={phrase.id}
                    style={[
                      styles.phraseButton,
                      { backgroundColor: isSelected ? phrase.color : '#fff' }
                    ]}
                    onPress={() => handlePhrasePress(phrase)}
                    accessibilityLabel={phrase.text}
                    accessibilityRole="button"
                    accessibilityHint="Double tap to speak this phrase"
                  >
                    <View style={styles.iconContainer}>
                      <IconComponent
                        size={36}
                        color={isSelected ? '#fff' : phrase.color}
                      />
                    </View>
                    <Text style={[styles.phraseText, isSelected && styles.phraseTextActive]}>
                      {phrase.text}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
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
  categorySection: {
    marginBottom: 28,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  phraseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  phraseButton: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 12,
  },
  phraseText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 20,
  },
  phraseTextActive: {
    color: '#fff',
  },
});

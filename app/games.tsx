import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, AccessibilityInfo } from 'react-native';
import { ArrowLeft, Music, Zap, Brain } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface Game {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const GAMES: Game[] = [
  {
    id: 'memory',
    name: 'Audio Memory',
    description: 'Remember and repeat sound sequences',
    icon: Brain,
    color: '#8b5cf6',
  },
  {
    id: 'reaction',
    name: 'Reaction Game',
    description: 'Tap as fast as you can when you hear the sound',
    icon: Zap,
    color: '#f97316',
  },
  {
    id: 'soundquiz',
    name: 'Sound Quiz',
    description: 'Guess what makes each sound',
    icon: Music,
    color: '#06b6d4',
  },
];

export default function GamesScreen() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const handleGameSelect = async (gameId: string, gameName: string) => {
    setSelectedGame(gameId);
    setGameActive(true);
    await AccessibilityInfo.announceForAccessibility(`Starting ${gameName}. Get ready!`);
  };

  const handleQuitGame = async () => {
    setGameActive(false);
    setSelectedGame(null);
    setScore(0);
    await AccessibilityInfo.announceForAccessibility('Game ended');
  };

  if (gameActive && selectedGame) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleQuitGame}
            accessibilityLabel="Quit game"
            accessibilityRole="button"
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>
              {GAMES.find(g => g.id === selectedGame)?.name}
            </Text>
            <Text style={styles.subtitle}>Score: {score}</Text>
          </View>
        </View>

        <View style={styles.gameArea}>
          <View style={styles.gameContent}>
            <Text style={styles.largeText}>Ready?</Text>
            <Text style={styles.instructions}>
              {selectedGame === 'memory'
                ? 'Listen to the sounds in order, then repeat them'
                : selectedGame === 'reaction'
                  ? 'Tap when you hear the sound'
                  : 'Guess what makes this sound'}
            </Text>
          </View>

          <View style={styles.gameButtonsGroup}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                setScore(score + 1);
                AccessibilityInfo.announceForAccessibility(`Score: ${score + 1}`);
              }}
              accessibilityLabel="Play sound"
              accessibilityRole="button"
            >
              <Music size={32} color="#fff" />
              <Text style={styles.playButtonText}>Play Sound</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.answerButton}
              onPress={() => {
                setScore(score + 10);
                AccessibilityInfo.announceForAccessibility('Correct! Score increased');
              }}
              accessibilityLabel="Submit answer"
              accessibilityRole="button"
            >
              <Text style={styles.answerButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

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
          <Text style={styles.title}>Games</Text>
          <Text style={styles.subtitle}>Fun and accessible games</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Games</Text>

          {GAMES.map((game) => {
            const IconComponent = game.icon;
            return (
              <TouchableOpacity
                key={game.id}
                style={[
                  styles.gameCard,
                  { borderLeftColor: game.color, borderLeftWidth: 4 },
                ]}
                onPress={() => handleGameSelect(game.id, game.name)}
                accessibilityLabel={game.name}
                accessibilityRole="button"
                accessibilityHint={game.description}
              >
                <View style={styles.gameCardContent}>
                  <Text style={styles.gameCardTitle}>{game.name}</Text>
                  <Text style={styles.gameCardDescription}>{game.description}</Text>
                </View>
                <IconComponent size={32} color={game.color} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Features</Text>
          <View style={styles.featureCard}>
            <Text style={styles.featureText}>
              - Fully accessible audio-based gameplay{'\n'}
              - Voice feedback on all actions{'\n'}
              - Score tracking and progress{'\n'}
              - Easy to pause and resume
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
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  gameCard: {
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
  gameCardContent: {
    flex: 1,
  },
  gameCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  gameCardDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  gameContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  largeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 16,
  },
  instructions: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  gameButtonsGroup: {
    width: '100%',
    gap: 12,
  },
  playButton: {
    backgroundColor: '#1e40af',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  answerButton: {
    backgroundColor: '#10b981',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  answerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
  },
});

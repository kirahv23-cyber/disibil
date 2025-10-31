# AssistWay - Accessibility-First Mobile Assistant

An innovative mobile application designed specifically for disabled and visually impaired users. AssistWay combines modern accessibility features with AI-powered assistance, creating an inclusive digital experience that prioritizes independence, safety, and ease of use.

## Features

### Core Navigation
- **Bottom Tab Navigation**: Five main sections for easy navigation
  - Home: Quick access hub
  - Video Calls: Doctor consultations and video meetings
  - AI Assistant: Voice commands and help
  - Daily Tasks: Activities and reminders
  - Profile: User settings and preferences

### Home Screen - Quick Access Hub
- **AI Speak**: Voice command recognition for hands-free control
- **Camera Mode**: Real-time object detection and description
- **Add Task**: Quick task creation
- **Navigate**: Voice-guided navigation
- **Persistent SOS Button**: Emergency alert button with long-press activation

### Daily Activities & Tasks
- Complete activity management system
- Add, edit, and delete activities
- Voice input support for task creation
- Priority levels (low, medium, high)
- Recurring activities support
- Reminders with customizable timing
- Progress tracking and completion status
- Category-based organization

### AI Assistant
- Voice command processing
- Conversation history
- Quick command suggestions
- Accessibility announcements
- Real-time transcription

### Camera Mode - Object Detection
- Real-time camera analysis
- Object, person, and animal detection
- Audio descriptions of detected objects
- Capture and analyze still images
- Safety alerts and obstacle detection

### Text-to-Speech (TTS) Features
**TTS Editor**:
- Type custom text for voice output
- Character count display
- Common phrase quick-add buttons
- Real-time speech playback

**Quick Phrases Grid**:
- Pre-recorded accessible phrases
- Categorized buttons (Needs, Emergency, Status, Navigation, Polite, Answers)
- Color-coded icons for easy identification
- One-tap activation

### Accessible Games
- **Audio Memory Game**: Remember and repeat sound sequences
- **Reaction Game**: Tap when hearing sounds
- **Sound Quiz**: Guess what makes each sound
- Score tracking and progress
- Voice feedback on all actions

### Video Calls
- Secure video consultation scheduling
- Doctor appointment integration
- Video call history
- Call recording support
- Real-time communication

### User Profile
- Personal information management
- Accessibility preferences
  - TTS enabled/disabled
  - Screen reader mode toggle
  - High contrast UI toggle
  - Haptics enabled/disabled
- Emergency contacts management
- Blood type and medical information
- Medication tracking

### Emergency SOS System
- Prominent floating SOS button
- Long-press activation for safety
- GPS location tracking
- Emergency contact notification
- Voice confirmation
- Customizable emergency message

## Accessibility Features

### Universal Design
- **Large, Tappable Buttons**: Minimum 48x48px touch targets
- **High Contrast UI**: Dark blue (#1e40af) primary color with light backgrounds
- **Clear Typography**: 16px minimum font size with consistent weights

### Screen Reader Support
- Full VoiceOver/TalkBack compatibility
- Semantic HTML structure
- Accessibility labels on all interactive elements
- Accessibility hints for complex interactions
- ARIA-compliant component structure

### Voice Features
- Voice input for task creation
- Text-to-speech for all content
- Voice commands for navigation
- Audio feedback on all actions
- Customizable speech rate and volume

### Haptic Feedback
- Vibration patterns for confirmations
- Touch feedback on button presses
- Navigation cues through haptics

### Offline Functionality
- Local database for activities and tasks
- Automatic sync when online
- Offline-first operation model
- Data persistence across sessions

## Technology Stack

### Frontend
- **React Native**: Cross-platform mobile development
- **Expo Router**: File-based routing
- **TypeScript**: Type safety and better DX
- **Lucide React Native**: Accessible icon library

### Backend & Database
- **Supabase**: PostgreSQL database with real-time capabilities
- **Row Level Security (RLS)**: User data isolation
- **Authentication**: Email/password with secure session management

### Features & Services
- **Text-to-Speech**: Native Expo Audio APIs
- **Voice Recognition**: Expo Speech Recognition
- **Camera**: Expo Camera with frame analysis
- **Location**: Expo Location for GPS tracking
- **Notifications**: Expo Notifications for reminders
- **Haptics**: Expo Haptics for tactile feedback

## Database Schema

### Users Table
- Profile information
- Accessibility preferences
- Emergency contact count

### Activities Table
- Daily activities and schedules
- Recurring activity support
- Reminder configuration
- Priority levels
- Status tracking

### Tasks Table
- To-do items with priorities
- Voice input transcripts
- Due dates and reminders
- Category organization

### Doctor Appointments Table
- Appointment scheduling
- Video call integration
- Doctor information
- Reminders

### Emergency Contacts Table
- Contact name, phone, relationship
- Priority ordering
- Primary contact flag

### Video Calls Table
- Call history
- Duration tracking
- Recording URLs
- Call status

## Screen Reader Compatibility

All screens are fully compatible with:
- **iOS**: VoiceOver
- **Android**: TalkBack

Features include:
- Semantic component labeling
- Meaningful link descriptions
- Form field associations
- Status change announcements
- Navigation structure clarity

## Color Palette

- **Primary Blue**: #1e40af (main brand color)
- **Light Blue**: #dbeafe (backgrounds)
- **Success Green**: #10b981 (confirmations)
- **Error Red**: #dc2626 (alerts, SOS)
- **Neutral Gray**: #6b7280 (secondary text)
- **White**: #ffffff (surfaces)

## Navigation Structure

```
Root (/)
├── Auth (/(auth))
│   ├── login
│   └── signup
├── Tabs (/(tabs))
│   ├── index (Home)
│   ├── video-call
│   ├── assistant
│   ├── activities
│   └── profile
├── TTS Editor (/tts-editor)
├── TTS Grid (/tts-grid)
├── Camera Mode (/camera-mode)
├── Navigation (/navigation)
└── Games (/games)
```

## Getting Started

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file with:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Running Locally
```bash
npm run dev
```

### Building for Web
```bash
npm run build:web
```

### TypeCheck
```bash
npm run typecheck
```

## Accessibility Testing Checklist

- [ ] Test with screen reader (VoiceOver/TalkBack)
- [ ] Verify minimum touch target size (48x48px)
- [ ] Test keyboard-only navigation
- [ ] Verify color contrast ratios (WCAG AA minimum 4.5:1)
- [ ] Test with high contrast mode enabled
- [ ] Verify haptic feedback works
- [ ] Test voice input functionality
- [ ] Verify offline mode operation
- [ ] Test emergency SOS activation
- [ ] Verify all labels and hints are clear

## Security & Privacy

- All user data encrypted in transit (HTTPS)
- Row-level security enforces user data isolation
- No sensitive data stored in local storage
- Emergency data encrypted at rest
- Privacy policy compliant with GDPR
- User consent for location tracking
- Secure session management

## Offline-First Architecture

AssistWay operates as an offline-first application:
- All activities and tasks stored locally
- Automatic sync when connection available
- No data loss during offline periods
- Responsive UI without network dependency
- Progressive enhancement when online

## Future Enhancements

- Advanced ML-based object recognition
- Real-time navigation guidance
- Multi-language support
- Integration with medical records
- Wearable device support
- Advanced health tracking
- Social features for peer support
- AI-powered activity recommendations
- Integration with smart home devices

## Contributing

We welcome accessibility-focused contributions. Please ensure:
- All new features are fully accessible
- Screen reader compatibility is tested
- Touch targets meet 48x48px minimum
- Color contrast meets WCAG AA standards
- Voice feedback for all interactions

## License

MIT License - See LICENSE file for details

## Support

For accessibility issues or feature requests, please contact:
- Email: support@assistway.app
- Accessibility: accessibility@assistway.app
- Emergency: Use in-app SOS button

## Acknowledgments

AssistWay is built with accessibility at its core, incorporating:
- WCAG 2.1 AA guidelines
- Apple Accessibility guidelines
- Google Android accessibility best practices
- Industry standards for inclusive design
- Feedback from disabled and visually impaired users

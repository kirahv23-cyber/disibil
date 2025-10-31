# AssistWay Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the project root with your Supabase credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from your Supabase project settings.

### 3. Database Setup
The database schema has been automatically created. Tables include:
- `profiles` - User profile information
- `activities` - Daily activities and schedules
- `tasks` - To-do items with priorities
- `doctor_appointments` - Medical appointments
- `emergency_contacts` - Emergency contact list
- `video_calls` - Video call history
- `offline_sync_queue` - Offline-first sync tracking
- `tts_phrases` - Pre-recorded speech phrases

### 4. Run Development Server
```bash
npm run dev
```

This will start the Expo development server. Open the browser or use Expo Go app on your phone.

## Project Structure

```
project/
├── app/
│   ├── _layout.tsx           # Root layout with auth provider
│   ├── index.tsx             # Auth routing
│   ├── (auth)/               # Authentication screens
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)/               # Main tab navigation
│   │   ├── _layout.tsx
│   │   ├── index.tsx         # Home screen
│   │   ├── video-call.tsx
│   │   ├── assistant.tsx
│   │   ├── activities.tsx
│   │   └── profile.tsx
│   ├── camera-mode.tsx       # Camera detection
│   ├── tts-editor.tsx        # Text-to-speech editor
│   ├── tts-grid.tsx          # Quick speech phrases
│   ├── games.tsx             # Accessible games
│   └── navigation.tsx        # Navigation mode (upcoming)
├── contexts/
│   └── AuthContext.tsx       # Authentication context
├── lib/
│   └── supabase.ts           # Supabase client setup
├── components/               # Reusable components (ready for expansion)
├── hooks/
│   └── useFrameworkReady.ts  # Framework initialization
└── README.md                 # Full documentation
```

## Feature Implementation Status

### Completed
- Authentication (signup, login, logout)
- Home screen with quick-access tiles
- AI Assistant with voice commands
- Daily Activities & Tasks
- Camera Mode (object detection placeholder)
- Text-to-Speech Editor and Quick Phrases
- Accessible Games (Audio Memory, Reaction, Sound Quiz)
- Emergency SOS Button
- Database schema with RLS policies
- Accessibility features (screen reader, large buttons, voice feedback)

### Ready for Integration
- Agora/Twilio for video calls
- ML Kit for advanced object detection
- Voice input APIs
- Location services
- Push notifications for reminders

## Accessibility Features Built-In

✓ Screen reader support (VoiceOver/TalkBack)
✓ Large touch targets (48x48px minimum)
✓ High contrast UI (#1e40af primary color)
✓ Voice feedback on all interactions
✓ Semantic accessibility labels
✓ Offline-first architecture
✓ Haptic feedback ready
✓ Text-to-speech throughout

## Testing

### TypeScript Check
```bash
npm run typecheck
```

### Build Web
```bash
npm run build:web
```

### Lint
```bash
npm run lint
```

## Accessibility Testing

Before deployment, test:
1. Screen reader (VoiceOver on iOS, TalkBack on Android)
2. Touch target sizes
3. Color contrast ratios
4. Voice input functionality
5. Offline mode
6. SOS button activation
7. Navigation between all screens
8. Haptic feedback

## Database Queries

### Query Activities for Current User
```typescript
const { data } = await supabase
  .from('activities')
  .select('*')
  .eq('user_id', user.id)
  .order('scheduled_time', { ascending: true });
```

### Create a New Task
```typescript
const { data, error } = await supabase
  .from('tasks')
  .insert({
    user_id: user.id,
    title: 'Example Task',
    priority: 'high',
    description: 'Task description'
  });
```

### Update Emergency Contacts
```typescript
const { error } = await supabase
  .from('emergency_contacts')
  .update({ is_primary: true })
  .eq('id', contactId)
  .eq('user_id', user.id);
```

## Adding New Features

1. **Create a new screen**: Add file in `app/` directory
2. **Add navigation**: Import in tab layout if needed
3. **Database integration**: Use Supabase client from `lib/supabase.ts`
4. **Accessibility**: Include accessibility labels and roles
5. **Styling**: Match the color scheme and spacing system

## Troubleshooting

### Supabase Connection Issues
- Verify `.env` variables are correct
- Check Supabase project is active
- Ensure network connectivity

### Build Errors
- Run `npm install` again
- Clear cache: `npm cache clean --force`
- Delete `node_modules` and reinstall

### Screen Reader Not Working
- Ensure accessibility labels are added to all interactive elements
- Test on actual device (web emulation varies)
- Check OS accessibility settings are enabled

## Next Steps

1. Set up video call infrastructure (Agora/Twilio)
2. Implement offline sync mechanism
3. Add advanced ML-based object detection
4. Create navigation guidance system
5. Set up push notifications
6. Deploy to app stores
7. Gather user feedback
8. Iterate on accessibility features

## Support

For issues or questions:
- Check the README.md for full documentation
- Review Expo documentation: https://docs.expo.dev
- Review Supabase documentation: https://supabase.com/docs
- Test accessibility: https://www.w3.org/WAI/test-evaluate/

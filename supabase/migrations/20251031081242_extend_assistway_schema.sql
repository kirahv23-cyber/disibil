/*
  # Extend AssistWay Database Schema

  This migration extends the existing schema by adding missing tables for tasks, doctor appointments, video calls, and offline sync functionality.

  ## Tables Added:
  1. tasks - Daily to-do items with voice input
  2. doctor_appointments - Doctor booking and consultation records
  3. video_calls - Video call history and records
  4. offline_sync_queue - Track offline changes for sync
  5. tts_phrases - Pre-recorded text-to-speech phrases

  ## Enhancements to Existing Tables:
  - Add accessibility preferences to profiles
  - Add voice input and reminder fields to activities
*/

-- Update profiles table to add accessibility preferences
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'accessibility_preferences'
  ) THEN
    ALTER TABLE profiles ADD COLUMN accessibility_preferences jsonb DEFAULT '{"tts_enabled": true, "screen_reader_mode": true, "high_contrast": true, "haptics_enabled": true}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE profiles ADD COLUMN phone_number text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN avatar_url text;
  END IF;
END $$;

-- Update activities table to add voice input and reminder fields
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'activities' AND column_name = 'reminder_minutes_before'
  ) THEN
    ALTER TABLE activities ADD COLUMN reminder_minutes_before integer DEFAULT 15;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'activities' AND column_name = 'is_completed'
  ) THEN
    ALTER TABLE activities ADD COLUMN is_completed boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'activities' AND column_name = 'priority'
  ) THEN
    ALTER TABLE activities ADD COLUMN priority text DEFAULT 'medium';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'activities' AND column_name = 'recurring'
  ) THEN
    ALTER TABLE activities ADD COLUMN recurring text DEFAULT 'none';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'activities' AND column_name = 'notes'
  ) THEN
    ALTER TABLE activities ADD COLUMN notes text;
  END IF;
END $$;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  is_completed boolean DEFAULT false,
  completed_at timestamptz,
  due_date date,
  voice_input_transcript text,
  category text DEFAULT 'general',
  reminder_time time,
  reminder_enabled boolean DEFAULT true,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
  ON tasks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create doctor_appointments table
CREATE TABLE IF NOT EXISTS doctor_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  doctor_name text NOT NULL,
  specialty text,
  appointment_time timestamptz NOT NULL,
  duration_minutes integer DEFAULT 30,
  location text,
  notes text,
  video_call_enabled boolean DEFAULT true,
  video_call_link text,
  reminder_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE doctor_appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own appointments"
  ON doctor_appointments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own appointments"
  ON doctor_appointments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own appointments"
  ON doctor_appointments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own appointments"
  ON doctor_appointments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create video_calls table
CREATE TABLE IF NOT EXISTS video_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  appointment_id uuid REFERENCES doctor_appointments(id) ON DELETE SET NULL,
  call_start_time timestamptz DEFAULT now(),
  call_end_time timestamptz,
  call_duration_minutes integer,
  call_status text DEFAULT 'pending' CHECK (call_status IN ('pending', 'active', 'completed', 'cancelled')),
  call_recording_url text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE video_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own video calls"
  ON video_calls FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own video calls"
  ON video_calls FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create offline_sync_queue table
CREATE TABLE IF NOT EXISTS offline_sync_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  table_name text NOT NULL,
  operation text NOT NULL CHECK (operation IN ('insert', 'update', 'delete')),
  record_data jsonb NOT NULL,
  synced boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  synced_at timestamptz
);

ALTER TABLE offline_sync_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own sync queue"
  ON offline_sync_queue FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sync queue"
  ON offline_sync_queue FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create tts_phrases table for pre-recorded phrases
CREATE TABLE IF NOT EXISTS tts_phrases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  phrase_text text NOT NULL,
  category text DEFAULT 'general',
  icon_name text,
  order_index integer DEFAULT 999,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tts_phrases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own phrases"
  ON tts_phrases FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own phrases"
  ON tts_phrases FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own phrases"
  ON tts_phrases FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own phrases"
  ON tts_phrases FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_doctor_appointments_user_id ON doctor_appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_doctor_appointments_time ON doctor_appointments(appointment_time);
CREATE INDEX IF NOT EXISTS idx_video_calls_user_id ON video_calls(user_id);
CREATE INDEX IF NOT EXISTS idx_offline_sync_user_id ON offline_sync_queue(user_id, synced);
CREATE INDEX IF NOT EXISTS idx_tts_phrases_user_id ON tts_phrases(user_id);

-- Update emergency_contacts if needed
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'emergency_contacts' AND column_name = 'priority_order'
  ) THEN
    ALTER TABLE emergency_contacts ADD COLUMN priority_order integer DEFAULT 999;
  END IF;
END $$;

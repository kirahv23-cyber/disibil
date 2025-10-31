import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { User, Phone, Heart, Shield, Settings, Bell, LogOut } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={48} color="#fff" />
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
            <Text style={styles.editAvatarText}>Edit Photo</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user?.email?.split('@')[0] || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'No email'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>

        <View style={styles.contactCard}>
          <View style={styles.contactIcon}>
            <Phone size={20} color="#dc2626" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>Emergency Services</Text>
            <Text style={styles.contactNumber}>911</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Phone size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contactCard}>
          <View style={styles.contactIcon}>
            <Heart size={20} color="#2563eb" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>Primary Caregiver</Text>
            <Text style={styles.contactNumber}>Jane Smith - (555) 123-4567</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Phone size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contactCard}>
          <View style={styles.contactIcon}>
            <Shield size={20} color="#10b981" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>Doctor</Text>
            <Text style={styles.contactNumber}>Dr. Sarah Johnson - (555) 987-6543</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Phone size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addContactButton}>
          <Text style={styles.addContactText}>+ Add Emergency Contact</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Information</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Blood Type</Text>
          <TextInput
            style={styles.infoInput}
            value="O+"
            editable={false}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Allergies</Text>
          <TextInput
            style={styles.infoInput}
            value="Penicillin, Peanuts"
            editable={false}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Medical Conditions</Text>
          <TextInput
            style={styles.infoInput}
            value="Type 2 Diabetes"
            editable={false}
          />
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Health Information</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Bell size={20} color="#6b7280" />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Text style={styles.settingValue}>On</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Shield size={20} color="#6b7280" />
            <Text style={styles.settingText}>Privacy & Security</Text>
          </View>
          <Text style={styles.settingValue}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Settings size={20} color="#6b7280" />
            <Text style={styles.settingText}>App Settings</Text>
          </View>
          <Text style={styles.settingValue}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Heart size={20} color="#6b7280" />
            <Text style={styles.settingText}>Health Data Sync</Text>
          </View>
          <Text style={styles.settingValue}>Enabled</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#dc2626" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>AccessCare v1.0.0</Text>
        <Text style={styles.footerText}>© 2025 All rights reserved</Text>
      </View>
    </ScrollView>
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
    paddingBottom: 32,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 4,
    borderColor: '#fff',
  },
  editAvatarButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  editAvatarText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#dbeafe',
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
  contactCard: {
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
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 14,
    color: '#6b7280',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addContactButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  addContactText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  infoInput: {
    fontSize: 16,
    color: '#111827',
    paddingVertical: 4,
  },
  editButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  settingItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 16,
    color: '#6b7280',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginLeft: 8,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
});

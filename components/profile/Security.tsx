import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '@clerk/clerk-expo';

interface SecurityProps {
  navigation: NavigationProp<any>;
}

interface SecuritySetting {
  id: string;
  title: string;
  description: string;
  type: 'toggle' | 'action';
  value?: boolean;
  action?: () => void;
}

export default function Security({ navigation }: SecurityProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [securitySettings, setSecuritySettings] = useState<SecuritySetting[]>([
    {
      id: 'biometric',
      title: 'Biometric Authentication',
      description: 'Use fingerprint or face ID to secure your account',
      type: 'toggle',
      value: false,
    },
    {
      id: 'twoFactor',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      type: 'toggle',
      value: false,
    },
    {
      id: 'appLock',
      title: 'App Lock',
      description: 'Require authentication when opening the app',
      type: 'toggle',
      value: true,
    },
    {
      id: 'password',
      title: 'Change Password',
      description: 'Update your account password',
      type: 'action',
      action: () => navigation.navigate('ChangePassword'),
    },
    {
      id: 'sessions',
      title: 'Active Sessions',
      description: 'Manage devices where you're signed in',
      type: 'action',
      action: () => navigation.navigate('ActiveSessions'),
    },
    {
      id: 'loginHistory',
      title: 'Login History',
      description: 'View your recent account activity',
      type: 'action',
      action: () => navigation.navigate('LoginHistory'),
    },
  ]);

  useEffect(() => {
    fetchSecuritySettings();
  }, []);

  const fetchSecuritySettings = async () => {
    try {
      const response = await fetch('https://your-api.com/user/security-settings');
      const data = await response.json();
      setSecuritySettings(prevSettings =>
        prevSettings.map(setting => ({
          ...setting,
          value: data[setting.id] ?? setting.value,
        }))
      );
    } catch (error) {
      console.error('Error fetching security settings:', error);
      Alert.alert('Error', 'Failed to fetch security settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSecuritySetting = async (id: string, value: boolean) => {
    try {
      await fetch('https://your-api.com/user/security-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [id]: value }),
      });
      setSecuritySettings(prevSettings =>
        prevSettings.map(setting =>
          setting.id === id ? { ...setting, value } : setting
        )
      );
    } catch (error) {
      console.error('Error updating security setting:', error);
      Alert.alert('Error', 'Failed to update security setting');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="shield-check" size={48} color="#FFA500" />
        <Text style={styles.headerTitle}>Account Security</Text>
        <Text style={styles.headerSubtitle}>
          Protect your account with additional security measures
        </Text>
      </View>

      <View style={styles.section}>
        {securitySettings.map(setting => (
          <View key={setting.id} style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>{setting.title}</Text>
              <Text style={styles.settingDescription}>{setting.description}</Text>
            </View>
            {setting.type === 'toggle' ? (
              <Switch
                value={setting.value}
                onValueChange={(value) => updateSecuritySetting(setting.id, value)}
                trackColor={{ false: '#ddd', true: '#FFA50050' }}
                thumbColor={setting.value ? '#FFA500' : '#f4f3f4'}
              />
            ) : (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={setting.action}
              >
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      <View style={styles.infoSection}>
        <MaterialCommunityIcons
          name="information-outline"
          size={20}
          color="#666"
        />
        <Text style={styles.infoText}>
          Last login: {new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteAccountButton}
        onPress={() => {
          Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => navigation.navigate('DeleteAccount'),
              },
            ]
          );
        }}
      >
        <MaterialCommunityIcons name="delete" size={24} color="#FF5252" />
        <Text style={styles.deleteAccountText}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFF9F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    padding: 8,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginTop: 24,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  deleteAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
    borderRadius: 8,
    backgroundColor: '#FFF1F1',
  },
  deleteAccountText: {
    fontSize: 16,
    color: '#FF5252',
    fontWeight: '600',
    marginLeft: 8,
  },
}); 
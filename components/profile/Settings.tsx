import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '@clerk/clerk-expo';

interface SettingsProps {
  navigation: NavigationProp<any>;
}

interface SettingItem {
  id: string;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  type: 'toggle' | 'route';
  route?: string;
  value?: boolean;
}

export default function Settings({ navigation }: SettingsProps) {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: 'notifications',
      title: 'Push Notifications',
      icon: 'bell-outline',
      type: 'toggle',
      value: true,
    },
    {
      id: 'darkMode',
      title: 'Dark Mode',
      icon: 'theme-light-dark',
      type: 'toggle',
      value: false,
    },
    {
      id: 'security',
      title: 'Security',
      icon: 'shield-check-outline',
      type: 'route',
      route: 'Security',
    },
    {
      id: 'language',
      title: 'Language',
      icon: 'translate',
      type: 'route',
      route: 'Language',
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: 'lock-outline',
      type: 'route',
      route: 'Privacy',
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: 'file-document-outline',
      type: 'route',
      route: 'Terms',
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      type: 'route',
      route: 'Support',
    },
    {
      id: 'about',
      title: 'About',
      icon: 'information-outline',
      type: 'route',
      route: 'About',
    },
  ]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('https://your-api.com/user/settings');
      const data = await response.json();
      setSettings(prevSettings =>
        prevSettings.map(setting => ({
          ...setting,
          value: data[setting.id] ?? setting.value,
        }))
      );
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (id: string, value: boolean) => {
    try {
      await fetch('https://your-api.com/user/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [id]: value }),
      });
      setSettings(prevSettings =>
        prevSettings.map(setting =>
          setting.id === id ? { ...setting, value } : setting
        )
      );
    } catch (error) {
      console.error('Error updating setting:', error);
      Alert.alert('Error', 'Failed to update setting');
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Error', 'Failed to sign out');
            }
          },
        },
      ]
    );
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {settings
          .filter(setting => setting.type === 'toggle')
          .map(setting => (
            <View key={setting.id} style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialCommunityIcons
                  name={setting.icon}
                  size={24}
                  color="#666"
                />
                <Text style={styles.settingTitle}>{setting.title}</Text>
              </View>
              <Switch
                value={setting.value}
                onValueChange={(value) => updateSetting(setting.id, value)}
                trackColor={{ false: '#ddd', true: '#FFA50050' }}
                thumbColor={setting.value ? '#FFA500' : '#f4f3f4'}
              />
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        {settings
          .filter(setting => setting.type === 'route')
          .map(setting => (
            <TouchableOpacity
              key={setting.id}
              style={styles.settingItem}
              onPress={() => navigation.navigate(setting.route!)}
            >
              <View style={styles.settingInfo}>
                <MaterialCommunityIcons
                  name={setting.icon}
                  size={24}
                  color="#666"
                />
                <Text style={styles.settingTitle}>{setting.title}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          ))}
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <MaterialCommunityIcons name="logout" size={24} color="#FF5252" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFF1F1',
  },
  signOutText: {
    fontSize: 16,
    color: '#FF5252',
    fontWeight: '600',
    marginLeft: 8,
  },
  version: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
});
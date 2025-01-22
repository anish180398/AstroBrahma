import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

interface LanguageProps {
  navigation: NavigationProp<any>;
}

interface Language {
  id: string;
  name: string;
  code: string;
  isSelected: boolean;
  nativeName: string;
}

export default function Language({ navigation }: LanguageProps) {
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState<Language[]>([
    {
      id: 'en',
      name: 'English',
      code: 'en',
      isSelected: true,
      nativeName: 'English',
    },
    {
      id: 'hi',
      name: 'Hindi',
      code: 'hi',
      isSelected: false,
      nativeName: 'हिंदी',
    },
    {
      id: 'gu',
      name: 'Gujarati',
      code: 'gu',
      isSelected: false,
      nativeName: 'ગુજરાતી',
    },
    {
      id: 'mr',
      name: 'Marathi',
      code: 'mr',
      isSelected: false,
      nativeName: 'मराठी',
    },
    {
      id: 'bn',
      name: 'Bengali',
      code: 'bn',
      isSelected: false,
      nativeName: 'বাংলা',
    },
    {
      id: 'ta',
      name: 'Tamil',
      code: 'ta',
      isSelected: false,
      nativeName: 'தமிழ்',
    },
    {
      id: 'te',
      name: 'Telugu',
      code: 'te',
      isSelected: false,
      nativeName: 'తెలుగు',
    },
    {
      id: 'kn',
      name: 'Kannada',
      code: 'kn',
      isSelected: false,
      nativeName: 'ಕನ್ನಡ',
    },
  ]);

  useEffect(() => {
    fetchCurrentLanguage();
  }, []);

  const fetchCurrentLanguage = async () => {
    try {
      const response = await fetch('https://your-api.com/user/language');
      const data = await response.json();
      setLanguages(prevLanguages =>
        prevLanguages.map(lang => ({
          ...lang,
          isSelected: lang.code === data.languageCode,
        }))
      );
    } catch (error) {
      console.error('Error fetching language settings:', error);
      Alert.alert('Error', 'Failed to fetch language settings');
    } finally {
      setLoading(false);
    }
  };

  const updateLanguage = async (selectedCode: string) => {
    try {
      await fetch('https://your-api.com/user/language', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ languageCode: selectedCode }),
      });

      setLanguages(prevLanguages =>
        prevLanguages.map(lang => ({
          ...lang,
          isSelected: lang.code === selectedCode,
        }))
      );

      Alert.alert(
        'Language Updated',
        'The app language has been updated. Please restart the app for changes to take effect.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error updating language:', error);
      Alert.alert('Error', 'Failed to update language');
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
        <MaterialCommunityIcons name="translate" size={48} color="#FFA500" />
        <Text style={styles.headerTitle}>Select Language</Text>
        <Text style={styles.headerSubtitle}>
          Choose your preferred language for the app
        </Text>
      </View>

      <View style={styles.languageList}>
        {languages.map(language => (
          <TouchableOpacity
            key={language.id}
            style={[
              styles.languageItem,
              language.isSelected && styles.selectedLanguageItem,
            ]}
            onPress={() => updateLanguage(language.code)}
          >
            <View style={styles.languageInfo}>
              <Text style={styles.languageName}>{language.name}</Text>
              <Text style={styles.nativeName}>{language.nativeName}</Text>
            </View>
            {language.isSelected && (
              <MaterialCommunityIcons
                name="check-circle"
                size={24}
                color="#FFA500"
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoSection}>
        <MaterialCommunityIcons
          name="information-outline"
          size={20}
          color="#666"
        />
        <Text style={styles.infoText}>
          Changing the language will require a restart of the app
        </Text>
      </View>
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
  languageList: {
    padding: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedLanguageItem: {
    borderColor: '#FFA500',
    backgroundColor: '#FFF9F0',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  nativeName: {
    fontSize: 14,
    color: '#666',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
}); 
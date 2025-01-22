import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface FormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  specialities: string;
  languages: string;
  description: string;
  password: string;
  confirmPassword: string;
  profileImage: string | null;
  certificates: string[];
}

export default function AstrologerSignUp() {
  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    experience: '',
    specialities: '',
    languages: '',
    description: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
    certificates: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSignUp = async () => {
    if (!signUp || !setActive) {
      setError('Authentication is not initialized');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const signUpAttempt = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' '),
        unsafeMetadata: {
          userType: 'astrologer',
          specialization: formData.specialities,
          experience: formData.experience,
          languages: formData.languages,
          bio: formData.description,
          verified: false,
          phone: formData.phone,
        },
      });

      if (signUpAttempt.status === 'complete' && signUpAttempt.createdSessionId) {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/(astrologer)');
      } else {
        setError('Unable to complete signup');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      Alert.alert('Sign Up Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setFormData({ ...formData, profileImage: result.assets[0].uri });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Join as an Astrologer</Text>
          <Text style={styles.subtitle}>Share your expertise with the world</Text>
        </View>

        <View style={styles.form}>
          {/* Basic Information */}
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="account" size={24} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email" size={24} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="phone" size={24} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock" size={24} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock" size={24} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              secureTextEntry
            />
          </View>

          {/* Professional Information */}
          <Text style={styles.sectionTitle}>Professional Information</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="star" size={24} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Specialities (comma separated)"
              value={formData.specialities}
              onChangeText={(text) => setFormData({ ...formData, specialities: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="clock" size={24} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Years of Experience"
              value={formData.experience}
              onChangeText={(text) => setFormData({ ...formData, experience: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="translate" size={24} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Languages (comma separated)"
              value={formData.languages}
              onChangeText={(text) => setFormData({ ...formData, languages: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="card-text" size={24} color="#666" />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Brief Description"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline
              numberOfLines={4}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={onSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating Account...' : 'Sign Up as Astrologer'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/(auth)/sign-in')}
          >
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.linkTextBold}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
          <Text style={styles.imageUploadText}>
            {formData.profileImage ? 'Change Profile Picture' : 'Upload Profile Picture'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFA500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  form: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  linkButton: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: '#FFA500',
  },
  linkTextBold: {
    fontWeight: 'bold',
  },
  imageUpload: {
    height: 100,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageUploadText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '500',
  },
}); 
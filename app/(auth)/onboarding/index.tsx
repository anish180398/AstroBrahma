import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const OnboardingScreen = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    dob: new Date(),
    birthTime: new Date(),
    birthLocation: '',
    gender: '',
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Save user data and redirect to home
      router.replace('/(home)');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>What's your name?</Text>
            <TextInput
              style={styles.input}
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
              placeholder="Enter your full name"
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>When were you born?</Text>
            <DateTimePicker
              value={userData.dob}
              mode="date"
              onChange={(event, date) => setUserData({ ...userData, dob: date || userData.dob })}
            />
            <Text style={styles.subtitle}>Birth Time</Text>
            <DateTimePicker
              value={userData.birthTime}
              mode="time"
              onChange={(event, time) => setUserData({ ...userData, birthTime: time || userData.birthTime })}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>Where were you born?</Text>
            <GooglePlacesAutocomplete
              placeholder="Search for your birth place"
              onPress={(data, details) => setUserData({ ...userData, birthLocation: data.description })}
              query={{
                key: 'YOUR_GOOGLE_PLACES_API_KEY',
                language: 'en',
              }}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>What's your gender?</Text>
            {['Male', 'Female', 'Other'].map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.genderButton,
                  userData.gender === gender && styles.selectedGender,
                ]}
                onPress={() => setUserData({ ...userData, gender })}
              >
                <Text style={styles.genderText}>{gender}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderStep()}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {step === 4 ? 'Complete' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  genderButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 5,
  },
  selectedGender: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  genderText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OnboardingScreen; 
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

interface TermsProps {
  navigation: NavigationProp<any>;
}

interface TermsSection {
  id: string;
  title: string;
  content: string;
}

const termsSections: TermsSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: 'By accessing or using AstroBrahma, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
  },
  {
    id: 'eligibility',
    title: 'Eligibility',
    content: 'You must be at least 18 years old to use our services. By using AstroBrahma, you represent that you are at least 18 years old and have the legal capacity to enter into these terms.',
  },
  {
    id: 'account',
    title: 'User Account',
    content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You agree to provide accurate and complete information when creating an account.',
  },
  {
    id: 'services',
    title: 'Astrology Services',
    content: 'Our services are for informational and entertainment purposes only. Predictions and readings should not be considered as professional advice for medical, financial, legal, or other important life decisions.',
  },
  {
    id: 'payments',
    title: 'Payments and Refunds',
    content: 'All payments are processed securely through our platform. Refunds are subject to our refund policy and will be processed according to the terms specified for each service.',
  },
  {
    id: 'conduct',
    title: 'User Conduct',
    content: 'You agree not to misuse our services or help anyone else do so. This includes unauthorized access, interference with services, harassment of astrologers or users, and sharing inappropriate content.',
  },
  {
    id: 'intellectual',
    title: 'Intellectual Property',
    content: 'All content and materials available through AstroBrahma are protected by intellectual property rights. You may not use, copy, or distribute our content without authorization.',
  },
  {
    id: 'termination',
    title: 'Account Termination',
    content: 'We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or harm our platform or other users.',
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer of Warranties',
    content: 'Our services are provided "as is" without any warranties. We do not guarantee the accuracy of astrological predictions or the availability of services at all times.',
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    content: 'AstroBrahma shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.',
  },
];

export default function Terms({ navigation }: TermsProps) {
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@astrobrahma.com');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="file-document" size={48} color="#FFA500" />
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <Text style={styles.headerSubtitle}>
          Last updated: {new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.introduction}>
          Welcome to AstroBrahma. These Terms of Service govern your use of our
          app and services. Please read them carefully before using our platform.
        </Text>

        {termsSections.map(section => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Need Clarification?</Text>
          <Text style={styles.contactText}>
            If you have any questions about our Terms of Service, please reach out
            to our support team.
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContactSupport}
          >
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="#FFA500"
            />
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By using our app, you agree to our Terms of Service and Privacy Policy.
        </Text>
        <TouchableOpacity
          style={styles.privacyButton}
          onPress={() => navigation.navigate('Privacy')}
        >
          <Text style={styles.privacyButtonText}>View Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  content: {
    padding: 16,
  },
  introduction: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  contactSection: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 24,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    fontSize: 16,
    color: '#FFA500',
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  privacyButton: {
    padding: 8,
  },
  privacyButtonText: {
    fontSize: 14,
    color: '#FFA500',
    fontWeight: '500',
  },
}); 
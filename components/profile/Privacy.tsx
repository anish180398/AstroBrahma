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

interface PrivacyProps {
  navigation: NavigationProp<any>;
}

interface PrivacySection {
  id: string;
  title: string;
  content: string;
}

const privacySections: PrivacySection[] = [
  {
    id: 'data-collection',
    title: 'Information We Collect',
    content: 'We collect information that you provide directly to us, including your name, email address, phone number, date of birth, and location. We also collect information about your usage of the app and your device information.',
  },
  {
    id: 'data-usage',
    title: 'How We Use Your Information',
    content: 'We use the information we collect to provide, maintain, and improve our services, communicate with you, and personalize your experience. This includes generating your astrological charts, providing predictions, and matching you with astrologers.',
  },
  {
    id: 'data-sharing',
    title: 'Information Sharing',
    content: 'We do not sell your personal information. We may share your information with astrologers you choose to consult with, and with service providers who assist in operating our platform. We may also share anonymized data for analytics purposes.',
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: 'We implement appropriate security measures to protect your personal information. This includes encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.',
  },
  {
    id: 'user-rights',
    title: 'Your Rights',
    content: 'You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications and choose what information to share with our platform.',
  },
  {
    id: 'cookies',
    title: 'Cookies and Tracking',
    content: 'We use cookies and similar technologies to improve your experience, understand usage patterns, and deliver personalized content. You can control cookie settings through your device settings.',
  },
  {
    id: 'children',
    title: 'Children\'s Privacy',
    content: 'Our services are not intended for children under 13. We do not knowingly collect information from children under 13. If you believe we have collected information from a child under 13, please contact us.',
  },
  {
    id: 'updates',
    title: 'Updates to Privacy Policy',
    content: 'We may update this privacy policy from time to time. We will notify you of any material changes through the app or via email. Your continued use of our services after such modifications constitutes acceptance of the updated policy.',
  },
];

export default function Privacy({ navigation }: PrivacyProps) {
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@astrobrahma.com');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="shield-lock" size={48} color="#FFA500" />
        <Text style={styles.headerTitle}>Privacy Policy</Text>
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
          At AstroBrahma, we take your privacy seriously. This policy describes how
          we collect, use, and protect your personal information when you use our
          app and services.
        </Text>

        {privacySections.map(section => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Questions or Concerns?</Text>
          <Text style={styles.contactText}>
            If you have any questions about our privacy policy or how we handle
            your data, please contact our support team.
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
          By using our app, you agree to our Privacy Policy and Terms of Service.
        </Text>
        <TouchableOpacity
          style={styles.termsButton}
          onPress={() => navigation.navigate('Terms')}
        >
          <Text style={styles.termsButtonText}>View Terms of Service</Text>
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
  termsButton: {
    padding: 8,
  },
  termsButtonText: {
    fontSize: 14,
    color: '#FFA500',
    fontWeight: '500',
  },
}); 
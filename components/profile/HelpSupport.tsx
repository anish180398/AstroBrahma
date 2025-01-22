import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HelpSupportProps {
  navigation: NavigationProp<any>;
}

const faqs: FAQItem[] = [
  {
    id: 'account-1',
    question: 'How do I reset my password?',
    answer: 'Go to the login screen and tap "Forgot Password". Enter your registered email address to receive password reset instructions.',
    category: 'Account',
  },
  {
    id: 'account-2',
    question: 'How can I update my profile information?',
    answer: 'Navigate to Profile > Edit Profile to update your personal information, including name, contact details, and birth information.',
    category: 'Account',
  },
  {
    id: 'payments-1',
    question: 'What payment methods are accepted?',
    answer: 'We accept credit/debit cards, UPI, net banking, and wallet payments. All transactions are processed securely.',
    category: 'Payments',
  },
  {
    id: 'consultations-1',
    question: 'How do I book a consultation?',
    answer: 'Browse available astrologers, select your preferred time slot, and proceed with the booking. You can pay using your preferred payment method.',
    category: 'Consultations',
  },
  {
    id: 'technical-1',
    question: 'The app is running slow. What should I do?',
    answer: 'Try clearing the app cache, ensure you have a stable internet connection, and restart the app. If the issue persists, contact support.',
    category: 'Technical',
  },
];

export default function HelpSupport({ navigation }: HelpSupportProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = ['All', 'Account', 'Payments', 'Consultations', 'Technical'];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@astrobrahma.com?subject=Support Request');
  };

  const handleCallSupport = () => {
    Alert.alert(
      'Call Support',
      'Our support team is available 24/7',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => Linking.openURL('tel:+1234567890') }
      ]
    );
  };

  const handleChatSupport = () => {
    navigation.navigate('ChatRoom', { supportChat: true });
  };

  const handleFAQPress = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
    
    // Navigate to relevant screens based on FAQ category
    const faq = faqs.find(f => f.id === faqId);
    if (faq) {
      switch (faq.category) {
        case 'Account':
          if (faq.id === 'account-2') {
            navigation.navigate('EditProfile');
          }
          break;
        case 'Payments':
          navigation.navigate('PaymentScreen');
          break;
        case 'Consultations':
          navigation.navigate('BookingScreen');
          break;
        default:
          break;
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search FAQs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.supportOptions}>
        <TouchableOpacity style={styles.supportCard} onPress={handleEmailSupport}>
          <MaterialCommunityIcons name="email-outline" size={32} color="#FFA500" />
          <Text style={styles.supportTitle}>Email Support</Text>
          <Text style={styles.supportDescription}>Get help via email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.supportCard} onPress={handleCallSupport}>
          <MaterialCommunityIcons name="phone-outline" size={32} color="#FFA500" />
          <Text style={styles.supportTitle}>Call Support</Text>
          <Text style={styles.supportDescription}>24/7 phone support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.supportCard} onPress={handleChatSupport}>
          <MaterialCommunityIcons name="chat-outline" size={32} color="#FFA500" />
          <Text style={styles.supportTitle}>Live Chat</Text>
          <Text style={styles.supportDescription}>Chat with support</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.faqContainer}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {filteredFAQs.map((faq) => (
          <TouchableOpacity
            key={faq.id}
            style={styles.faqItem}
            onPress={() => handleFAQPress(faq.id)}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.question}>{faq.question}</Text>
              <MaterialCommunityIcons
                name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#666"
              />
            </View>
            {expandedFAQ === faq.id && (
              <Text style={styles.answer}>{faq.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    margin: 16,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  supportOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  supportCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  supportDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#FFA500',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: '500',
  },
  faqContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  answer: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },
}); 
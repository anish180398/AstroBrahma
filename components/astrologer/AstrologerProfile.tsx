import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Speciality {
  id: string;
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function AstrologerProfile() {
  const specialities: Speciality[] = [
    { id: '1', name: 'Vedic Astrology', icon: 'zodiac-aries' },
    { id: '2', name: 'Numerology', icon: 'numeric' },
    { id: '3', name: 'Tarot Reading', icon: 'cards' },
    { id: '4', name: 'Palmistry', icon: 'hand-front-right' },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      userName: 'John Doe',
      rating: 5,
      comment: 'Excellent reading! Very accurate and insightful.',
      date: '2 days ago',
    },
    // Add more reviews
  ];

  const renderSpeciality = ({ item }: { item: Speciality }) => (
    <View style={styles.specialityItem}>
      <MaterialCommunityIcons name={item.icon} size={24} color="#FFA500" />
      <Text style={styles.specialityText}>{item.name}</Text>
    </View>
  );

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{item.userName}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <MaterialCommunityIcons
              key={index}
              name={index < item.rating ? 'star' : 'star-outline'}
              size={16}
              color="#FFC107"
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      <Text style={styles.reviewDate}>{item.date}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/astrologer-profile.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Dr. Sharma</Text>
          <Text style={styles.experience}>15 years experience</Text>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={20} color="#FFC107" />
            <Text style={styles.rating}>4.8</Text>
            <Text style={styles.reviews}>(128 reviews)</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Experienced Vedic astrologer with expertise in birth chart analysis,
          relationship compatibility, and career guidance. Certified by the Indian
          Council of Astrological Sciences.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specialities</Text>
        <FlatList
          data={specialities}
          renderItem={renderSpeciality}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        <View style={styles.languagesContainer}>
          <Text style={styles.language}>English</Text>
          <Text style={styles.language}>Hindi</Text>
          <Text style={styles.language}>Sanskrit</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.reviewsHeader}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.button, styles.chatButton]}>
          <MaterialCommunityIcons name="chat" size={24} color="#FFA500" />
          <Text style={[styles.buttonText, styles.chatButtonText]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.callButton]}>
          <MaterialCommunityIcons name="video" size={24} color="#fff" />
          <Text style={[styles.buttonText, styles.callButtonText]}>Call Now</Text>
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
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  experience: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  specialityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  specialityText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  language: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
    color: '#FFA500',
  },
  reviewCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  chatButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  callButton: {
    backgroundColor: '#FFA500',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  chatButtonText: {
    color: '#FFA500',
  },
  callButtonText: {
    color: '#fff',
  },
}); 
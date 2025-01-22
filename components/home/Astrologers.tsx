import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const astrologers = [
  {
    id: 1,
    name: 'Dr. Sharma',
    speciality: 'Vedic Astrology',
    experience: '15 years',
    rating: 4.8,
    image: 'https://res.cloudinary.com/dn8ouckig/image/upload/v1737410439/icon_lql6hg.png',
    online: true,
  },
  {
    id: 2,
    name: 'Mrs. Patel',
    speciality: 'Tarot Reading',
    experience: '10 years',
    rating: 4.7,
    image: 'https://res.cloudinary.com/dn8ouckig/image/upload/v1737410439/icon_lql6hg.png',
    online: true,
  },
];

export default function Astrologers() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Astrologers</Text>
        <TouchableOpacity onPress={() => router.push('/(screens)/astrologers')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {astrologers.map((astrologer) => (
          <TouchableOpacity
            key={astrologer.id}
            style={styles.card}
            onPress={() => router.push(`/(astrologers)/astrologersProfile/${astrologer.id}` as any)}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: astrologer.image }} style={styles.image} />
              {astrologer.online && <View style={styles.onlineBadge} />}
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.name}>{astrologer.name}</Text>
              <Text style={styles.speciality}>{astrologer.speciality}</Text>
              <View style={styles.ratingContainer}>
                <MaterialCommunityIcons name="star" size={16} color="#FFA500" />
                <Text style={styles.rating}>{astrologer.rating}</Text>
                <Text style={styles.experience}>{astrologer.experience}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#FFA500',
    fontWeight: '500',
  },
  scrollContent: {
    paddingRight: 16,
  },
  card: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  onlineBadge: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cardContent: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  speciality: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
    marginRight: 8,
  },
  experience: {
    fontSize: 14,
    color: '#666',
  },
}); 
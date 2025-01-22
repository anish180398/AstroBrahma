import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Astrologer {
  id: string;
  name: string;
  expertise: string;
  experience: string;
  rating: number;
  price: number;
  waitTime: string;
  image: string;
  online: boolean;
}

const astrologers: Astrologer[] = [
  {
    id: '1',
    name: 'Acharya Vinod',
    expertise: 'Vedic, Numerology',
    experience: '15 years',
    rating: 4.8,
    price: 20,
    waitTime: '2 mins',
    image: 'https://placekitten.com/100/100',
    online: true,
  },
  {
    id: '2',
    name: 'Pandit Sharma',
    expertise: 'Tarot, Palmistry',
    experience: '10 years',
    rating: 4.5,
    price: 15,
    waitTime: '5 mins',
    image: 'https://placekitten.com/100/100',
    online: true,
  },
  {
    id: '3',
    name: 'Dr. Jyoti',
    expertise: 'Astrology, Vastu',
    experience: '12 years',
    rating: 4.7,
    price: 25,
    waitTime: 'Available',
    image: 'https://placekitten.com/100/100',
    online: true,
  },
];

export default function ChatScreen() {
  const renderAstrologer = ({ item }: { item: Astrologer }) => (
    <TouchableOpacity style={styles.astrologerCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={[styles.statusDot, { backgroundColor: item.online ? '#4CAF50' : '#666' }]} />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.expertise}>{item.expertise}</Text>
        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.experience}>• {item.experience}</Text>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>₹{item.price}/min</Text>
        <Text style={styles.waitTime}>{item.waitTime}</Text>
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.chatButtonText}>Chat Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat with Astrologer</Text>
      </View>

      <FlatList
        data={astrologers}
        renderItem={renderAstrologer}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFA500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  astrologerCard: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  expertise: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  experience: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  waitTime: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
  chatButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 4,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 
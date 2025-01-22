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
  status: 'Live' | 'Busy' | 'Offline';
  viewers: number;
  image: string;
}

const astrologers: Astrologer[] = [
  {
    id: '1',
    name: 'Guruji Ashok',
    expertise: 'Vedic, Numerology',
    experience: '20 years',
    rating: 4.9,
    price: 30,
    status: 'Live',
    viewers: 245,
    image: 'https://placekitten.com/100/100',
  },
  {
    id: '2',
    name: 'Dr. Priya',
    expertise: 'Tarot, Palmistry',
    experience: '15 years',
    rating: 4.7,
    price: 25,
    status: 'Live',
    viewers: 178,
    image: 'https://placekitten.com/100/100',
  },
  {
    id: '3',
    name: 'Acharya Rahul',
    expertise: 'Astrology, Vastu',
    experience: '18 years',
    rating: 4.8,
    price: 35,
    status: 'Busy',
    viewers: 0,
    image: 'https://placekitten.com/100/100',
  },
];

export default function LiveScreen() {
  const renderAstrologer = ({ item }: { item: Astrologer }) => (
    <TouchableOpacity style={styles.astrologerCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={[styles.statusBadge, { 
          backgroundColor: item.status === 'Live' ? '#FF4444' : 
                         item.status === 'Busy' ? '#FFA500' : '#666'
        }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.expertise}>{item.expertise}</Text>
        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.experience}>• {item.experience}</Text>
        </View>
        {item.status === 'Live' && (
          <View style={styles.viewersContainer}>
            <MaterialCommunityIcons name="eye" size={16} color="#666" />
            <Text style={styles.viewers}>{item.viewers} watching</Text>
          </View>
        )}
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>₹{item.price}/min</Text>
        {item.status === 'Live' && (
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Live</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Consultations</Text>
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
  statusBadge: {
    position: 'absolute',
    bottom: -5,
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
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
  viewersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  viewers: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
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
  joinButton: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 4,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 
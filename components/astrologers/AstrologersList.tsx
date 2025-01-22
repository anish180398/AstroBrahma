import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const astrologers = [
  {
    id: 1,
    name: 'Dr. Sharma',
    speciality: 'Vedic Astrology',
    experience: '15 years',
    rating: 4.8,
    price: 499,
    languages: ['English', 'Hindi'],
    image: 'https://res.cloudinary.com/dn8ouckig/image/upload/v1737410439/icon_lql6hg.png',
    online: true,
  },
  {
    id: 2,
    name: 'Mrs. Patel',
    speciality: 'Tarot Reading',
    experience: '10 years',
    rating: 4.7,
    price: 399,
    languages: ['English', 'Gujarati'],
    image: 'https://res.cloudinary.com/dn8ouckig/image/upload/v1737410439/icon_lql6hg.png',
    online: false,
  },
  // Add more astrologers
];

export default function AstrologersList() {
  const router = useRouter();

  const renderAstrologer = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({
        pathname: '/(home)/astrologer/[id]',
        params: { id: item.id }
      } as any)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
          {item.online && <View style={styles.onlineBadge} />}
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.speciality}>{item.speciality}</Text>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFA500" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.experience}>• {item.experience}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.languages}>
            {item.languages.join(' • ')}
          </Text>
          <Text style={styles.price}>₹{item.price}/min</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionButton, styles.chatButton]}>
            <MaterialCommunityIcons name="chat" size={20} color="#FFA500" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
            <MaterialCommunityIcons name="phone" size={20} color="#FFA500" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={astrologers}
      renderItem={renderAstrologer}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  onlineBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
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
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  experience: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  languages: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  chatButton: {
    backgroundColor: '#fff',
  },
  callButton: {
    backgroundColor: '#fff',
  },
}); 
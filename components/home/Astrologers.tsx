import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const Astrologers = () => {
  const astrologers = [
    { id: 1, name: 'John Doe', specialty: 'Horoscope', rating: 4.8, price: 25 },
    { id: 2, name: 'John Doe', specialty: 'Numerology', rating: 4.8, price: 30 },
    { id: 3, name: 'John Doe', specialty: 'Horoscope', rating: 5.0, price: 25 },
    { id: 4, name: 'John Doe', specialty: 'Horoscope', rating: 4.9, price: 35 },
  ];
  const profileImageUrl = 'https://res.cloudinary.com/dn8ouckig/image/upload/v1737410439/icon_lql6hg.png';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Astrologers</Text>
        <TouchableOpacity>
          <Text style={styles.showAll}>Show all</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {astrologers.map((astrologer) => (
          <View key={astrologer.id} style={styles.card}>
            {astrologer.id === 1 && (
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredText}>Featured</Text>
              </View>
            )}
            <Image
              source={{ uri: profileImageUrl }}
              style={styles.profileImage}
            />
            <Text style={styles.name}>{astrologer.name}</Text>
            <Text style={styles.specialty}>{astrologer.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.price}>${astrologer.price}/min</Text>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>⭐ {astrologer.rating}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectText}>Connect</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  showAll: {
    color: '#FFA500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginLeft: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'red',
    borderRadius: 4,
    padding: 4,
    zIndex: 1,
  },
  featuredText: {
    color: 'white',
    fontSize: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  specialty: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  price: {
    fontSize: 12,
    color: '#666',
  },
  rating: {
    backgroundColor: '#FFF9E6',
    padding: 4,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#FFA500',
  },
  connectButton: {
    backgroundColor: '#FFA500',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
  },
  connectText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Astrologers; 
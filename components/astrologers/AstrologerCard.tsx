import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AstrologerCardProps {
  name: string;
  specialty: string;
  languages: string;
  experience: string;
  price: string;
  image: string;
  rating: number;
  online?: boolean;
}

export const AstrologerCard = ({
  name,
  specialty,
  languages,
  experience,
  price,
  image,
  rating,
  online = true,
}: AstrologerCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.specialtyContainer}>
          <Text style={styles.specialty}>{specialty}</Text>
          {online && <View style={styles.onlineDot} />}
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.languages}>{languages}</Text>
        <Text style={styles.experience}>Exp: {experience}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  ratingBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 4,
    gap: 2,
  },
  ratingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  specialtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  specialty: {
    color: '#FF9800',
    fontSize: 14,
    fontWeight: '500',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  languages: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  experience: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  chatButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chatButtonText: {
    color: 'white',
    fontWeight: '500',
  },
}); 
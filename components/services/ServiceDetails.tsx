import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ServiceDetails {
  title: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  features: string[];
  image: any;
}

export default function ServiceDetails() {
  const service: ServiceDetails = {
    title: 'Birth Chart Reading',
    description: 'Get a detailed analysis of your birth chart and understand your life path, strengths, and challenges.',
    price: 1999,
    duration: '45 mins',
    rating: 4.8,
    reviews: 128,
    features: [
      'Detailed birth chart analysis',
      'Personalized life path guidance',
      'Career and relationship insights',
      'Future trends and predictions',
      'Q&A session included',
    ],
    image: require('@/assets/images/birth-chart.png'),
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={service.image} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{service.title}</Text>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={20} color="#FFC107" />
            <Text style={styles.rating}>{service.rating}</Text>
            <Text style={styles.reviews}>({service.reviews} reviews)</Text>
          </View>
        </View>

        <Text style={styles.description}>{service.description}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="#666" />
            <Text style={styles.infoText}>{service.duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="currency-inr" size={24} color="#666" />
            <Text style={styles.infoText}>₹{service.price}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>What's Included</Text>
        {service.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
  },
  bookButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 
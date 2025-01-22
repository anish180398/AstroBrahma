import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FreeService {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: string;
}

const FREE_SERVICES: FreeService[] = [
  {
    id: '1',
    title: 'Daily Horoscope',
    description: 'Get your personalized daily horoscope based on your birth chart',
    icon: 'zodiac-aries',
    route: 'DailyHoroscope'
  },
  {
    id: '2',
    title: 'Birth Chart',
    description: 'View your detailed birth chart and planetary positions',
    icon: 'chart-bubble',
    route: 'BirthChart'
  },
  {
    id: '3',
    title: 'Compatibility',
    description: 'Check your compatibility with another person',
    icon: 'heart',
    route: 'Compatibility'
  },
  {
    id: '4',
    title: 'Lucky Numbers & Colors',
    description: 'Discover your lucky numbers and colors for today',
    icon: 'dice-multiple',
    route: 'LuckyPredictions'
  }
];

export default function FreeServices({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Free Astrology Services</Text>
        <Text style={styles.headerSubtitle}>
          Explore our complimentary astrological services
        </Text>
      </View>

      <View style={styles.servicesGrid}>
        {FREE_SERVICES.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => navigation.navigate(service.route)}
          >
            <MaterialCommunityIcons
              name={service.icon}
              size={32}
              color="#FFA500"
            />
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceDescription}>
              {service.description}
            </Text>
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
  header: {
    padding: 16,
    backgroundColor: '#FFF3E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  servicesGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 
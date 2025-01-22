import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface QuickLink {
  id: string;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: string;
  color: string;
}

const quickLinks: QuickLink[] = [
  {
    id: '1',
    title: 'Daily Horoscope',
    icon: 'zodiac-aries',
    route: '/(screens)/daily-horoscope',
    color: '#FF6B6B',
  },
  {
    id: '2',
    title: 'Live Consultation',
    icon: 'video',
    route: '/(screens)/live-consultation',
    color: '#4ECDC4',
  },
  {
    id: '3',
    title: 'Chat with Astrologer',
    icon: 'chat',
    route: '/(screens)/chat-astrologer',
    color: '#45B7D1',
  },
  {
    id: '4',
    title: 'Remedies',
    icon: 'star-four-points',
    route: '/(screens)/remedies',
    color: '#96CEB4',
  },
];

export default function QuickLinks() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quick Links</Text>
      </View>
      <View style={styles.grid}>
        {quickLinks.map((link) => (
          <TouchableOpacity
            key={link.id}
            style={styles.linkCard}
            onPress={() => router.push(link.route as any)}
          >
            <View style={[styles.iconContainer, { backgroundColor: link.color + '15' }]}>
              <MaterialCommunityIcons name={link.icon} size={32} color={link.color} />
            </View>
            <Text style={styles.linkTitle}>{link.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  linkCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  linkTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
}); 
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const newItems = [
  {
    id: 1,
    title: 'Live Astrology Workshop',
    description: 'Learn the basics of astrology from experts',
    image: 'https://res.cloudinary.com/dn8ouckig/image/upload/v1737410439/icon_lql6hg.png',
    route: '/(home)/workshop',
  },
  {
    id: 2,
    title: 'New Astrologers',
    description: 'Expert astrologers joined our platform',
    image: 'https://res.cloudinary.com/dn8ouckig/image/upload/v1737410439/icon_lql6hg.png',
    route: '/(home)/astrologers',
  },
];

export default function WhatsNew() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's New</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {newItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => router.push(item.route as any)}
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  scrollContent: {
    paddingRight: 16,
  },
  card: {
    width: 280,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
}); 
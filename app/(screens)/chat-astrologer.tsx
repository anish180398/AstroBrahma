import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Astrologer {
  id: string;
  name: string;
  speciality: string;
  experience: string;
  rating: number;
  price: number;
  image: string;
  online: boolean;
  languages: string[];
  waitTime: string;
}

const astrologers: Astrologer[] = [
  {
    id: '1',
    name: 'Dr. Sharma',
    speciality: 'Vedic Astrology',
    experience: '15 years',
    rating: 4.8,
    price: 499,
    image: 'https://example.com/astrologer1.jpg',
    online: true,
    languages: ['English', 'Hindi'],
    waitTime: '2 mins',
  },
  {
    id: '2',
    name: 'Mrs. Patel',
    speciality: 'Numerology',
    experience: '10 years',
    rating: 4.7,
    price: 399,
    image: 'https://example.com/astrologer2.jpg',
    online: true,
    languages: ['English', 'Gujarati'],
    waitTime: '5 mins',
  },
  // Add more astrologers
];

export default function ChatAstrologerScreen() {
  const router = useRouter();

  const renderAstrologer = ({ item }: { item: Astrologer }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({
        pathname: '/(home)/astrologer/[id]',
        params: { id: item.id }
      } as any)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            // defaultSource={require('@/assets/images/placeholder.png')}
          />
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
        <View style={styles.chatInfo}>
          <View style={styles.waitTimeContainer}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
            <Text style={styles.waitTime}>Wait {item.waitTime}</Text>
          </View>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => router.push({
              pathname: '/(home)/chat/[id]',
              params: { id: item.id }
            } as any)}
          >
            <MaterialCommunityIcons name="chat" size={20} color="#fff" />
            <Text style={styles.chatButtonText}>Chat Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat with Astrologer</Text>
        <Text style={styles.subtitle}>Get instant answers to your questions</Text>
      </View>

      <FlatList
        data={astrologers}
        renderItem={renderAstrologer}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
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
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    width: 16,
    height: 16,
    borderRadius: 8,
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
  },
  speciality: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  experience: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  languages: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  chatInfo: {
    alignItems: 'flex-end',
  },
  waitTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  waitTime: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#45B7D1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
}); 
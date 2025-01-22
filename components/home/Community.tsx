import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Community() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <TouchableOpacity onPress={() => router.push('/(home)/community')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.joinCard}
          onPress={() => router.push('/(home)/community/join')}
        >
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.image}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Join Our Community</Text>
            <Text style={styles.cardDescription}>
              Connect with like-minded people and share your spiritual journey
            </Text>
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="account-group" size={24} color="#FFA500" />
                <Text style={styles.statText}>10K+ Members</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="message-text" size={24} color="#FFA500" />
                <Text style={styles.statText}>Active Discussions</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
  viewAll: {
    fontSize: 14,
    color: '#FFA500',
    fontWeight: '500',
  },
  content: {
    marginBottom: 16,
  },
  joinCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
}); 
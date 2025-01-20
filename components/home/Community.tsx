import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Community = () => {
  const communities = [
    {
      id: 1,
      title: 'Love Astrology',
      description: 'A Synastry chart is used in relationship astrology to see how planets connect from chart-to-chart...',
      members: '500+',
      online: '10k',
      image: require('../../assets/love-astrology.jpg'),
    },
    {
      id: 2,
      title: 'Vedic Astrology',
      description: 'Vedic astrology is based on the belief that the stars and planets have a powerful...',
      members: '20k+',
      online: '8k',
      image: require('../../assets/vedic-astrology.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {communities.map((community) => (
        <View key={community.id} style={styles.card}>
          <Image source={community.image} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.communityTitle}>{community.title}</Text>
            <Text style={styles.description}>{community.description}</Text>
            <View style={styles.stats}>
              <Text style={styles.statText}>👥 {community.members}</Text>
              <Text style={styles.statText}>🟢 {community.online}</Text>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  },
  seeAll: {
    color: '#FFA500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#666',
    marginBottom: 12,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statText: {
    marginRight: 16,
    color: '#666',
  },
  joinButton: {
    backgroundColor: '#FFA500',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  joinText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Community; 
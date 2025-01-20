import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, Line } from 'react-native-svg';

const ConstellationBackground = () => (
  <View style={[StyleSheet.absoluteFill, { padding: 4 }]}>
    <Svg height="100%" width="100%" viewBox="0 0 100 160">
      {/* Main constellation stars - Added more points */}
      <Circle cx="15" cy="20" r="2.5" fill="white" opacity={0.5} />
      <Circle cx="35" cy="30" r="2.5" fill="white" opacity={0.5} />
      <Circle cx="60" cy="25" r="2.5" fill="white" opacity={0.5} />
      <Circle cx="85" cy="40" r="2.5" fill="white" opacity={0.5} />
      <Circle cx="75" cy="70" r="2.5" fill="white" opacity={0.5} />
      <Circle cx="45" cy="80" r="2.5" fill="white" opacity={0.5} />
      <Circle cx="20" cy="95" r="2.5" fill="white" opacity={0.5} />
      <Circle cx="50" cy="110" r="2.5" fill="white" opacity={0.5} />
      <Circle cx="80" cy="120" r="2.5" fill="white" opacity={0.5} />
      
      {/* Star shine effects - Added more glowing stars */}
      {[15, 60, 75, 50].map((cx, i) => (
        <Circle 
          key={`shine-${i}`}
          cx={cx} 
          cy={i === 0 ? 20 : i === 1 ? 25 : i === 2 ? 70 : 110} 
          r="4" 
          fill="white" 
          opacity={0.4} 
        />
      ))}

      {/* Constellation connecting lines - Extended pattern */}
      <Line x1="15" y1="20" x2="35" y2="30" stroke="white" strokeWidth="0.8" opacity={0.5} />
      <Line x1="35" y1="30" x2="60" y2="25" stroke="white" strokeWidth="0.8" opacity={0.5} />
      <Line x1="60" y1="25" x2="85" y2="40" stroke="white" strokeWidth="0.8" opacity={0.5} />
      <Line x1="85" y1="40" x2="75" y2="70" stroke="white" strokeWidth="0.8" opacity={0.5} />
      <Line x1="75" y1="70" x2="45" y2="80" stroke="white" strokeWidth="0.8" opacity={0.5} />
      <Line x1="45" y1="80" x2="20" y2="95" stroke="white" strokeWidth="0.8" opacity={0.5} />
      <Line x1="20" y1="95" x2="50" y2="110" stroke="white" strokeWidth="0.8" opacity={0.5} />
      <Line x1="50" y1="110" x2="80" y2="120" stroke="white" strokeWidth="0.8" opacity={0.5} />
      
      {/* Additional cross connections */}
      <Line x1="35" y1="30" x2="75" y2="70" stroke="white" strokeWidth="0.8" opacity={0.5} />
      <Line x1="60" y1="25" x2="45" y2="80" stroke="white" strokeWidth="0.8" opacity={0.5} />
      <Line x1="85" y1="40" x2="50" y2="110" stroke="white" strokeWidth="0.8" opacity={0.5} />
      <Line x1="20" y1="95" x2="80" y2="120" stroke="white" strokeWidth="0.8" opacity={0.5} />
      
      {/* Small background stars - Increased quantity */}
      {[...Array(30)].map((_, i) => (
        <Circle
          key={`star-${i}`}
          cx={Math.random() * 100}
          cy={Math.random() * 160}
          r={0.8}
          fill="white"
          opacity={0.6}
        />
      ))}
      
      {/* Extra tiny stars - Increased quantity */}
      {[...Array(25)].map((_, i) => (
        <Circle
          key={`tiny-${i}`}
          cx={Math.random() * 100}
          cy={Math.random() * 160}
          r={0.5}
          fill="white"
          opacity={0.5}
        />
      ))}
    </Svg>
  </View>
);

const DiscoverServices = () => {
  const services = [
    { id: 1, title: 'Horoscope Forecast', icon: 'zodiac-aries', description: 'Get your daily, weekly, and monthly predictions based on your zodiac sign.' },
    { id: 2, title: 'Compatibility', icon: 'heart-circle', description: 'Evaluate the compatibility between two people based on their birth charts.' },
    { id: 3, title: 'Kundli Generation', icon: 'star-circle', description: 'Create a detailed birth chart analysis with predictions and insights.' },
    { id: 4, title: 'Tarot Reading', icon: 'cards', description: 'Get insights into your past, present, and future through tarot cards.' },
    { id: 5, title: 'Mindfulness', icon: 'meditation', description: 'Practice guided meditation and achieve inner peace.' },
    { id: 6, title: 'Astro Ed', icon: 'book-open-variant', description: 'Learn the fundamentals of astrology and cosmic influences.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <View style={styles.grid}>
        {services.map((service) => (
          <TouchableOpacity key={service.id} style={styles.card}>
            <ConstellationBackground />
            <View style={styles.cardContent}>
              <MaterialCommunityIcons name={service.icon} size={32} color="white" />
              <Text style={styles.cardTitle}>{service.title}</Text>
              <Text style={styles.description}>{service.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    width: '45%',
    height: 160,
    backgroundColor: '#FF8C00',
    borderRadius: 12,
    // marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  cardContent: {
    padding: 12,
    height: '100%',
    zIndex: 1,
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  description: {
    color: 'white',
    fontSize: 12,
  },
});

export default DiscoverServices; 
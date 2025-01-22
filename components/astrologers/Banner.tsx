import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Banner = () => {
  return (
    <View style={styles.banner}>
      <Ionicons name="planet" size={24} color="#FF9800" />
      <Text style={styles.bannerTitle}>Track your planets</Text>
      <Text style={styles.bannerSubtitle}>Track movements of your planets</Text>
      <View style={styles.dots}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9800',
    marginTop: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FF9800',
    marginTop: 4,
  },
  dots: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFE0B2',
  },
  activeDot: {
    backgroundColor: '#FF9800',
  },
}); 
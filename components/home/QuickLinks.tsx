import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QuickLinks = () => {
  const links = [
    {
      id: 1,
      title: 'HOROSCOPE',
      icon: 'zodiac-pisces', // or any other zodiac icon you prefer
      color: '#FFA500',
    },
    {
      id: 2,
      title: 'REMEDIES',
      icon: 'meditation',
      color: '#FFA500',
    },
    {
      id: 3,
      title: 'BLOGS',
      icon: 'book-open-variant',
      color: '#FFA500',
    },
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {links.map((link) => (
        <TouchableOpacity 
          key={link.id} 
          style={styles.linkItem}
        >
          <View style={[styles.iconContainer, { backgroundColor: link.color }]}>
            <MaterialCommunityIcons 
              name={link.icon} 
              size={24} 
              color="white" 
            />
          </View>
          <Text style={styles.linkText}>{link.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  linkItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
});

export default QuickLinks; 
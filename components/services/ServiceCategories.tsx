import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const categories = [
  { id: 1, name: 'All', icon: 'apps' },
  { id: 2, name: 'Kundli', icon: 'zodiac-aries' },
  { id: 3, name: 'Matchmaking', icon: 'heart' },
  { id: 4, name: 'Remedies', icon: 'star' },
  { id: 5, name: 'Gemstones', icon: 'diamond-stone' },
  { id: 6, name: 'Puja', icon: 'candle' },
];

export default function ServiceCategories() {
  const [selectedCategory, setSelectedCategory] = useState(1);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            selectedCategory === category.id && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory(category.id)}
        >
          <MaterialCommunityIcons
            name={category.icon as any}
            size={24}
            color={selectedCategory === category.id ? '#fff' : '#666'}
          />
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category.id && styles.selectedCategoryText,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#f5f5f5',
  },
  selectedCategory: {
    backgroundColor: '#FFA500',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
  },
}); 
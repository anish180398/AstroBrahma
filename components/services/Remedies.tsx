import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface RemedyCategory {
  id: string;
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

interface Remedy {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const categories: RemedyCategory[] = [
  { id: '1', name: 'Career', icon: 'briefcase' },
  { id: '2', name: 'Love', icon: 'heart' },
  { id: '3', name: 'Health', icon: 'heart-pulse' },
  { id: '4', name: 'Wealth', icon: 'cash' },
  { id: '5', name: 'Family', icon: 'account-group' },
  { id: '6', name: 'Education', icon: 'school' },
];

const remedies: Remedy[] = [
  {
    id: '1',
    title: 'Crystal Healing',
    description: 'Use specific crystals to enhance positive energy and remove negative vibrations.',
    category: 'Career',
    image: 'https://example.com/crystal.jpg',
    duration: '21 days',
    difficulty: 'Easy',
  },
  {
    id: '2',
    title: 'Vastu Correction',
    description: 'Align your living space according to Vastu principles for better energy flow.',
    category: 'Wealth',
    image: 'https://example.com/vastu.jpg',
    duration: '45 days',
    difficulty: 'Medium',
  },
  // Add more remedies
];

export default function Remedies() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Career');

  const filteredRemedies = remedies.filter(
    (remedy) => remedy.category === selectedCategory
  );

  const getDifficultyColor = (difficulty: Remedy['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return '#4CAF50';
      case 'Medium':
        return '#FFA500';
      case 'Hard':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const renderRemedy = ({ item }: { item: Remedy }) => (
    <TouchableOpacity style={styles.remedyCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.remedyImage}
      />
      <View style={styles.remedyContent}>
        <Text style={styles.remedyTitle}>{item.title}</Text>
        <Text style={styles.remedyDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.remedyFooter}>
          <View style={styles.remedyDetail}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
            <Text style={styles.remedyDetailText}>{item.duration}</Text>
          </View>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(item.difficulty) + '20' },
            ]}
          >
            <Text
              style={[
                styles.difficultyText,
                { color: getDifficultyColor(item.difficulty) },
              ]}
            >
              {item.difficulty}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Astrological Remedies</Text>
        <Text style={styles.subtitle}>
          Discover powerful remedies for various aspects of life
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.name && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category.name)}
          >
            <MaterialCommunityIcons
              name={category.icon}
              size={24}
              color={selectedCategory === category.name ? '#FFA500' : '#666'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.name && styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredRemedies}
        renderItem={renderRemedy}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.remediesList}
      />
    </View>
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
  categoriesContainer: {
    padding: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  selectedCategory: {
    backgroundColor: '#FFF3E0',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  selectedCategoryText: {
    color: '#FFA500',
    fontWeight: '600',
  },
  remediesList: {
    padding: 16,
  },
  remedyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  remedyImage: {
    width: 100,
    height: 100,
  },
  remedyContent: {
    flex: 1,
    padding: 12,
  },
  remedyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  remedyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  remedyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remedyDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remedyDetailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
}); 
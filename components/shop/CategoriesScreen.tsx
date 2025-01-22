import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Category {
  id: string;
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  image: string;
  productCount: number;
  description: string;
}

interface SubCategory {
  id: string;
  name: string;
  parentId: string;
  image: string;
  productCount: number;
}

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/categories');
      const data = await response.json();
      setCategories(data);
      if (data.length > 0) {
        setSelectedCategory(data[0].id);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCategories = async (categoryId: string) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://your-api.com/categories/${categoryId}/subcategories`);
      const data = await response.json();
      setSubCategories(data);
    } catch (err) {
      console.error('Error fetching subcategories:', err);
    }
  };

  const renderCategoryCard = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.selectedCategoryCard,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <MaterialCommunityIcons
        name={item.icon}
        size={32}
        color={selectedCategory === item.id ? '#FFA500' : '#666'}
      />
      <Text
        style={[
          styles.categoryName,
          selectedCategory === item.id && styles.selectedCategoryName,
        ]}
      >
        {item.name}
      </Text>
      <Text style={styles.productCount}>{item.productCount} Products</Text>
    </TouchableOpacity>
  );

  const renderSubCategoryCard = ({ item }: { item: SubCategory }) => (
    <TouchableOpacity
      style={styles.subCategoryCard}
      onPress={() =>
        navigation.navigate('ProductList', {
          categoryId: selectedCategory,
          subCategoryId: item.id,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.subCategoryImage} />
      <View style={styles.subCategoryInfo}>
        <Text style={styles.subCategoryName}>{item.name}</Text>
        <Text style={styles.subCategoryCount}>
          {item.productCount} Products
        </Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color="#666"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );

  const selectedCategoryData = categories.find(
    (category) => category.id === selectedCategory
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFA500" style={styles.loader} />
      ) : (
        <>
          {/* Categories List */}
          <View style={styles.categoriesContainer}>
            <FlatList
              data={categories}
              renderItem={renderCategoryCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>

          {/* Selected Category Header */}
          {selectedCategoryData && (
            <View style={styles.selectedCategoryHeader}>
              <Image
                source={{ uri: selectedCategoryData.image }}
                style={styles.categoryHeaderImage}
              />
              <View style={styles.categoryHeaderOverlay}>
                <Text style={styles.categoryHeaderTitle}>
                  {selectedCategoryData.name}
                </Text>
                <Text style={styles.categoryHeaderDescription}>
                  {selectedCategoryData.description}
                </Text>
              </View>
            </View>
          )}

          {/* Subcategories Grid */}
          <FlatList
            data={subCategories}
            renderItem={renderSubCategoryCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.subCategoriesList}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoriesList: {
    padding: 16,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 100,
  },
  selectedCategoryCard: {
    backgroundColor: '#FFF3E0',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedCategoryName: {
    color: '#FFA500',
  },
  productCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  selectedCategoryHeader: {
    height: 200,
    width: width,
    position: 'relative',
  },
  categoryHeaderImage: {
    width: '100%',
    height: '100%',
  },
  categoryHeaderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  categoryHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  categoryHeaderDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  subCategoriesList: {
    padding: 16,
  },
  subCategoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subCategoryImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  subCategoryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  subCategoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subCategoryCount: {
    fontSize: 14,
    color: '#666',
  },
  chevron: {
    marginLeft: 8,
  },
}); 
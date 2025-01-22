import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

interface Filter {
  priceRange: {
    min: number;
    max: number;
  };
  categories: string[];
  rating: number | null;
  sortBy: 'price_low' | 'price_high' | 'rating' | 'newest';
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filter>({
    priceRange: { min: 0, max: 10000 },
    categories: [],
    rating: null,
    sortBy: 'newest',
  });

  const filterHeight = new Animated.Value(0);

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchProducts();
    }
  }, [searchQuery, filters]);

  const toggleFilters = () => {
    Animated.timing(filterHeight, {
      toValue: showFilters ? 0 : 300,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setShowFilters(!showFilters);
  };

  const searchProducts = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(
        `https://your-api.com/products/search?q=${searchQuery}&${new URLSearchParams({
          min_price: filters.priceRange.min.toString(),
          max_price: filters.priceRange.max.toString(),
          categories: filters.categories.join(','),
          rating: filters.rating?.toString() || '',
          sort: filters.sortBy,
        })}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Crystals',
    'Books',
    'Gemstones',
    'Accessories',
    'Tarot Cards',
    'Healing Stones',
  ];

  const sortOptions = [
    { id: 'price_low', label: 'Price: Low to High' },
    { id: 'price_high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'newest', label: 'Newest First' },
  ];

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews} reviews)</Text>
        </View>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[styles.filterButton, showFilters && styles.activeFilterButton]}
          onPress={toggleFilters}
        >
          <MaterialCommunityIcons
            name="filter-variant"
            size={24}
            color={showFilters ? '#FFA500' : '#333'}
          />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.filtersContainer, { height: filterHeight }]}>
        {/* Price Range */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Price Range</Text>
          <View style={styles.priceInputs}>
            <TextInput
              style={styles.priceInput}
              placeholder="Min"
              keyboardType="numeric"
              value={filters.priceRange.min.toString()}
              onChangeText={(value) =>
                setFilters(prev => ({
                  ...prev,
                  priceRange: { ...prev.priceRange, min: parseInt(value) || 0 },
                }))
              }
            />
            <Text style={styles.priceSeparator}>-</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Max"
              keyboardType="numeric"
              value={filters.priceRange.max.toString()}
              onChangeText={(value) =>
                setFilters(prev => ({
                  ...prev,
                  priceRange: { ...prev.priceRange, max: parseInt(value) || 0 },
                }))
              }
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Categories</Text>
          <View style={styles.categoryTags}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTag,
                  filters.categories.includes(category) && styles.activeTag,
                ]}
                onPress={() =>
                  setFilters(prev => ({
                    ...prev,
                    categories: prev.categories.includes(category)
                      ? prev.categories.filter(c => c !== category)
                      : [...prev.categories, category],
                  }))
                }
              >
                <Text
                  style={[
                    styles.categoryTagText,
                    filters.categories.includes(category) && styles.activeTagText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rating Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Minimum Rating</Text>
          <View style={styles.ratingButtons}>
            {[4, 3, 2, 1].map((rating) => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.ratingButton,
                  filters.rating === rating && styles.activeRating,
                ]}
                onPress={() =>
                  setFilters(prev => ({
                    ...prev,
                    rating: prev.rating === rating ? null : rating,
                  }))
                }
              >
                <MaterialCommunityIcons
                  name="star"
                  size={16}
                  color={filters.rating === rating ? '#FFA500' : '#666'}
                />
                <Text
                  style={[
                    styles.ratingButtonText,
                    filters.rating === rating && styles.activeRatingText,
                  ]}
                >
                  {rating}+ Stars
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sort Options */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Sort By</Text>
          <View style={styles.sortOptions}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.sortOption,
                  filters.sortBy === option.id && styles.activeSortOption,
                ]}
                onPress={() =>
                  setFilters(prev => ({ ...prev, sortBy: option.id as Filter['sortBy'] }))
                }
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    filters.sortBy === option.id && styles.activeSortOptionText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>

      {loading ? (
        <ActivityIndicator size="large" color="#FFA500" style={styles.loader} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productsList}
          ListEmptyComponent={
            searchQuery.length > 0 ? (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="file-search-outline"
                  size={64}
                  color="#ccc"
                />
                <Text style={styles.emptyStateText}>
                  No products found for "{searchQuery}"
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  activeFilterButton: {
    backgroundColor: '#FFF3E0',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    overflow: 'hidden',
  },
  filterSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  priceSeparator: {
    marginHorizontal: 12,
    fontSize: 16,
    color: '#666',
  },
  categoryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  activeTag: {
    backgroundColor: '#FFF3E0',
  },
  categoryTagText: {
    color: '#666',
    fontSize: 14,
  },
  activeTagText: {
    color: '#FFA500',
    fontWeight: '500',
  },
  ratingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeRating: {
    backgroundColor: '#FFF3E0',
  },
  ratingButtonText: {
    marginLeft: 4,
    color: '#666',
  },
  activeRatingText: {
    color: '#FFA500',
    fontWeight: '500',
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  sortOption: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  activeSortOption: {
    backgroundColor: '#FFF3E0',
  },
  sortOptionText: {
    color: '#666',
    fontSize: 14,
  },
  activeSortOptionText: {
    color: '#FFA500',
    fontWeight: '500',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsList: {
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
}); 
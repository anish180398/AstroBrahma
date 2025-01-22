import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    inStock: boolean;
  };
  addedAt: string;
}

export default function WishlistScreen() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/wishlist');
      const data = await response.json();
      setWishlistItems(data);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (itemId: string) => {
    Alert.alert(
      'Remove from Wishlist',
      'Are you sure you want to remove this item from your wishlist?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              // Replace with your actual API endpoint
              await fetch(`https://your-api.com/wishlist/${itemId}`, {
                method: 'DELETE',
              });
              setWishlistItems((prev) =>
                prev.filter((item) => item.id !== itemId)
              );
            } catch (err) {
              console.error('Error removing from wishlist:', err);
            }
          },
        },
      ]
    );
  };

  const addToCart = async (productId: string) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (response.ok) {
        Alert.alert(
          'Success',
          'Item added to cart successfully!',
          [
            {
              text: 'Continue Shopping',
              style: 'cancel',
            },
            {
              text: 'View Cart',
              onPress: () => navigation.navigate('Cart'),
            },
          ]
        );
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const renderWishlistItem = ({ item }: { item: WishlistItem }) => (
    <View style={styles.itemCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { id: item.product.id })}
      >
        <Image source={{ uri: item.product.image }} style={styles.productImage} />
      </TouchableOpacity>
      
      <View style={styles.productInfo}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetails', { id: item.product.id })}
        >
          <Text style={styles.productName}>{item.product.name}</Text>
        </TouchableOpacity>
        
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.product.description}
        </Text>
        
        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
          <Text style={styles.rating}>{item.product.rating}</Text>
          <Text style={styles.reviews}>({item.product.reviews} reviews)</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.product.price}</Text>
          <Text style={styles.addedDate}>
            Added {new Date(item.addedAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              !item.product.inStock && styles.disabledButton,
            ]}
            onPress={() => item.product.inStock && addToCart(item.product.id)}
            disabled={!item.product.inStock}
          >
            <MaterialCommunityIcons
              name="cart-plus"
              size={20}
              color={item.product.inStock ? '#FFF' : '#999'}
            />
            <Text
              style={[
                styles.actionButtonText,
                !item.product.inStock && styles.disabledButtonText,
              ]}
            >
              {item.product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.removeButton]}
            onPress={() => removeFromWishlist(item.id)}
          >
            <MaterialCommunityIcons name="delete-outline" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFA500" style={styles.loader} />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>My Wishlist</Text>
            <Text style={styles.itemCount}>
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
            </Text>
          </View>

          <FlatList
            data={wishlistItems}
            renderItem={renderWishlistItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={64}
                  color="#ccc"
                />
                <Text style={styles.emptyStateTitle}>
                  Your wishlist is empty
                </Text>
                <Text style={styles.emptyStateText}>
                  Start adding items you love to your wishlist
                </Text>
                <TouchableOpacity
                  style={styles.browseButton}
                  onPress={() => navigation.navigate('Shop')}
                >
                  <Text style={styles.browseButtonText}>Browse Products</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </>
      )}
    </View>
  );
}

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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  itemCard: {
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
    width: 120,
    height: 120,
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
    marginBottom: 8,
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
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  addedDate: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA500',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeButton: {
    backgroundColor: '#FF4444',
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  disabledButtonText: {
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
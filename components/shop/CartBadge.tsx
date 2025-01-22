import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface CartBadgeProps {
  size?: number;
  color?: string;
  badgeColor?: string;
}

export default function CartBadge({
  size = 24,
  color = '#333',
  badgeColor = '#FF4444',
}: CartBadgeProps) {
  const [itemCount, setItemCount] = useState(0);
  const [bounceAnim] = useState(new Animated.Value(1));
  const navigation = useNavigation();

  useEffect(() => {
    fetchCartItemCount();
    // Subscribe to cart updates
    // You might want to use a state management solution like Redux or Context
    // to handle cart updates across the app
  }, []);

  useEffect(() => {
    if (itemCount > 0) {
      Animated.sequence([
        Animated.spring(bounceAnim, {
          toValue: 1.2,
          useNativeDriver: true,
          speed: 20,
          bounciness: 12,
        }),
        Animated.spring(bounceAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
          bounciness: 12,
        }),
      ]).start();
    }
  }, [itemCount]);

  const fetchCartItemCount = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/cart/count');
      const data = await response.json();
      setItemCount(data.count);
    } catch (err) {
      console.error('Error fetching cart count:', err);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Cart')}
    >
      <MaterialCommunityIcons
        name="cart-outline"
        size={size}
        color={color}
      />
      {itemCount > 0 && (
        <Animated.View
          style={[
            styles.badge,
            {
              backgroundColor: badgeColor,
              transform: [{ scale: bounceAnim }],
            },
          ]}
        >
          <Text style={styles.badgeText}>
            {itemCount > 99 ? '99+' : itemCount}
          </Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
}); 
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface OrderConfirmationProps {
  route: {
    params: {
      orderId: string;
      totalAmount: number;
      deliveryDate: string;
    };
  };
}

export default function OrderConfirmationScreen({ route }: OrderConfirmationProps) {
  const { orderId, totalAmount, deliveryDate } = route.params;
  const navigation = useNavigation();
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleTrackOrder = () => {
    navigation.navigate('TrackOrder', { orderId });
  };

  const handleContinueShopping = () => {
    navigation.navigate('Shop');
  };

  const handleViewOrders = () => {
    navigation.navigate('Orders');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Success Animation */}
        <Animated.View
          style={[
            styles.successIconContainer,
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <View style={styles.successCircle}>
            <MaterialCommunityIcons
              name="check"
              size={64}
              color="#fff"
            />
          </View>
        </Animated.View>

        {/* Success Message */}
        <Text style={styles.successTitle}>Order Placed Successfully!</Text>
        <Text style={styles.successMessage}>
          Thank you for your order. We'll notify you once your order is confirmed.
        </Text>

        {/* Order Details */}
        <View style={styles.orderDetails}>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Order ID</Text>
            <Text style={styles.orderInfoValue}>{orderId}</Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Amount Paid</Text>
            <Text style={styles.orderInfoValue}>₹{totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Estimated Delivery</Text>
            <Text style={styles.orderInfoValue}>
              {new Date(deliveryDate).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Delivery Instructions */}
        <View style={styles.instructionsCard}>
          <MaterialCommunityIcons
            name="information"
            size={24}
            color="#FFA500"
          />
          <Text style={styles.instructionsTitle}>Delivery Instructions</Text>
          <Text style={styles.instructionsText}>
            Our delivery partner will call you before delivering your order.
            Please keep your phone handy.
          </Text>
        </View>

        {/* Support Section */}
        <View style={styles.supportSection}>
          <Text style={styles.supportTitle}>Need Help?</Text>
          <TouchableOpacity
            style={styles.supportButton}
            onPress={() => navigation.navigate('Support')}
          >
            <MaterialCommunityIcons
              name="headphones"
              size={24}
              color="#666"
            />
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.trackButton}
            onPress={handleTrackOrder}
          >
            <MaterialCommunityIcons
              name="truck-delivery"
              size={24}
              color="#FFA500"
            />
            <Text style={styles.trackButtonText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewOrdersButton}
            onPress={handleViewOrders}
          >
            <MaterialCommunityIcons
              name="clipboard-list"
              size={24}
              color="#666"
            />
            <Text style={styles.viewOrdersButtonText}>View All Orders</Text>
          </TouchableOpacity>
        </View>

        {/* Continue Shopping Button */}
        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={handleContinueShopping}
        >
          <MaterialCommunityIcons
            name="shopping"
            size={24}
            color="#fff"
          />
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </TouchableOpacity>

        {/* Share Order Button */}
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => {
            // Implement share functionality
          }}
        >
          <MaterialCommunityIcons
            name="share-variant"
            size={20}
            color="#666"
          />
          <Text style={styles.shareButtonText}>Share Order Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  successIconContainer: {
    marginVertical: 24,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  orderDetails: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  orderInfoLabel: {
    fontSize: 14,
    color: '#666',
  },
  orderInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  instructionsCard: {
    width: '100%',
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  supportSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  supportButtonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  actionButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  trackButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3E0',
    paddingVertical: 16,
    borderRadius: 8,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFA500',
    marginLeft: 8,
  },
  viewOrdersButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    borderRadius: 8,
  },
  viewOrdersButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 8,
  },
  continueShoppingButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA500',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  continueShoppingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  shareButtonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
}); 
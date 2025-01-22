import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface OrderItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  variant?: {
    name: string;
    value: string;
  };
}

interface OrderSummary {
  orderId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  paymentMethod: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  pricing: {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
  };
  deliveryDate?: string;
  trackingId?: string;
}

export default function OrderSummaryScreen() {
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/orders/current');
      const data = await response.json();
      setOrder(data);
    } catch (err) {
      console.error('Error fetching order details:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: OrderSummary['status']) => {
    switch (status) {
      case 'confirmed':
        return '#4CAF50';
      case 'shipped':
        return '#2196F3';
      case 'delivered':
        return '#4CAF50';
      case 'cancelled':
        return '#FF5252';
      default:
        return '#FFA500';
    }
  };

  const getStatusIcon = (status: OrderSummary['status']) => {
    switch (status) {
      case 'confirmed':
        return 'check-circle';
      case 'shipped':
        return 'truck-delivery';
      case 'delivered':
        return 'package-variant-closed-check';
      case 'cancelled':
        return 'close-circle';
      default:
        return 'clock-outline';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons name="alert-circle" size={64} color="#FF5252" />
        <Text style={styles.errorText}>Failed to load order details</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchOrderDetails}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Order Status */}
      <View style={styles.section}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>Order #{order.orderId}</Text>
            <Text style={styles.orderDate}>
              Placed on {new Date(order.date).toLocaleDateString()}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
            <MaterialCommunityIcons
              name={getStatusIcon(order.status)}
              size={20}
              color={getStatusColor(order.status)}
            />
            <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Text>
          </View>
        </View>

        {order.trackingId && (
          <View style={styles.trackingInfo}>
            <Text style={styles.trackingLabel}>Tracking ID:</Text>
            <Text style={styles.trackingId}>{order.trackingId}</Text>
          </View>
        )}

        {order.deliveryDate && (
          <View style={styles.deliveryInfo}>
            <MaterialCommunityIcons name="calendar-clock" size={20} color="#666" />
            <Text style={styles.deliveryText}>
              Expected Delivery by {new Date(order.deliveryDate).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>

      {/* Order Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {order.items.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <Image source={{ uri: item.product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.product.name}</Text>
              {item.variant && (
                <Text style={styles.variantText}>
                  {item.variant.name}: {item.variant.value}
                </Text>
              )}
              <View style={styles.quantityPrice}>
                <Text style={styles.quantity}>Qty: {item.quantity}</Text>
                <Text style={styles.price}>₹{item.product.price}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Shipping Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <View style={styles.addressCard}>
          <Text style={styles.addressName}>{order.shippingAddress.name}</Text>
          <Text style={styles.addressText}>{order.shippingAddress.address}</Text>
          <Text style={styles.addressText}>
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
          </Text>
          <Text style={styles.addressPhone}>Phone: {order.shippingAddress.phone}</Text>
        </View>
      </View>

      {/* Payment Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.paymentMethod}>
          <MaterialCommunityIcons name="credit-card" size={24} color="#666" />
          <Text style={styles.paymentMethodText}>{order.paymentMethod}</Text>
        </View>
      </View>

      {/* Price Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Details</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Subtotal</Text>
          <Text style={styles.priceValue}>₹{order.pricing.subtotal.toFixed(2)}</Text>
        </View>
        {order.pricing.discount > 0 && (
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, styles.discountLabel]}>Discount</Text>
            <Text style={[styles.priceValue, styles.discountValue]}>
              -₹{order.pricing.discount.toFixed(2)}
            </Text>
          </View>
        )}
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Shipping</Text>
          <Text style={styles.priceValue}>
            {order.pricing.shipping === 0 ? 'FREE' : `₹${order.pricing.shipping.toFixed(2)}`}
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Tax (18% GST)</Text>
          <Text style={styles.priceValue}>₹{order.pricing.tax.toFixed(2)}</Text>
        </View>
        <View style={[styles.priceRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{order.pricing.total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.trackButton]}
          onPress={() => navigation.navigate('TrackOrder', { orderId: order.orderId })}
        >
          <MaterialCommunityIcons name="truck-delivery" size={20} color="#FFA500" />
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.supportButton]}
          onPress={() => navigation.navigate('Support', { orderId: order.orderId })}
        >
          <MaterialCommunityIcons name="headphones" size={20} color="#666" />
          <Text style={styles.supportButtonText}>Need Help?</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  trackingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  trackingLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  trackingId: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  deliveryText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  variantText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  quantityPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFA500',
  },
  addressCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  addressPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  discountLabel: {
    color: '#4CAF50',
  },
  discountValue: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  trackButton: {
    backgroundColor: '#FFF3E0',
  },
  trackButtonText: {
    color: '#FFA500',
    fontSize: 14,
    fontWeight: '600',
  },
  supportButton: {
    backgroundColor: '#f5f5f5',
  },
  supportButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
}); 
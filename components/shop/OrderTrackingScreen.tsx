import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface OrderStatus {
  id: string;
  title: string;
  description: string;
  time: string;
  completed: boolean;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  status: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  timeline: OrderStatus[];
}

export default function OrderTrackingScreen() {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/orders/123');
      const data = await response.json();
      setOrder(data);
    } catch (err) {
      console.error('Error fetching order details:', err);
    } finally {
      setLoading(false);
    }
  };

  const orderStatuses: OrderStatus[] = [
    {
      id: '1',
      title: 'Order Placed',
      description: 'Your order has been placed successfully',
      time: '10:30 AM',
      completed: true,
      icon: 'checkbox-marked-circle',
    },
    {
      id: '2',
      title: 'Order Confirmed',
      description: 'Seller has processed your order',
      time: '11:00 AM',
      completed: true,
      icon: 'check-circle',
    },
    {
      id: '3',
      title: 'Shipped',
      description: 'Your order has been shipped',
      time: '2:00 PM',
      completed: true,
      icon: 'truck-delivery',
    },
    {
      id: '4',
      title: 'Out for Delivery',
      description: 'Our delivery partner is delivering your order',
      time: 'Expected by 5:00 PM',
      completed: false,
      icon: 'truck-fast',
    },
    {
      id: '5',
      title: 'Delivered',
      description: 'Order will be delivered soon',
      time: 'Expected by 6:00 PM',
      completed: false,
      icon: 'home',
    },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderNumber}>Order #123456</Text>
        <Text style={styles.orderDate}>Placed on 15 Mar, 2024</Text>
      </View>

      <View style={styles.statusContainer}>
        {orderStatuses.map((status, index) => (
          <View key={status.id} style={styles.statusItem}>
            <View style={styles.statusIconContainer}>
              <View
                style={[
                  styles.statusLine,
                  index === 0 && styles.hideTopLine,
                  index === orderStatuses.length - 1 && styles.hideBottomLine,
                  status.completed ? styles.completedLine : styles.pendingLine,
                ]}
              />
              <View
                style={[
                  styles.statusIcon,
                  status.completed ? styles.completedIcon : styles.pendingIcon,
                ]}
              >
                <MaterialCommunityIcons
                  name={status.icon}
                  size={24}
                  color={status.completed ? '#fff' : '#ccc'}
                />
              </View>
            </View>
            <View style={styles.statusContent}>
              <Text style={styles.statusTitle}>{status.title}</Text>
              <Text style={styles.statusDescription}>{status.description}</Text>
              <Text style={styles.statusTime}>{status.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.addressText}>
          John Doe{'\n'}
          123 Main Street, Apartment 4B{'\n'}
          New York, NY 10001{'\n'}
          Phone: +1 234 567 8900
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.orderItems}>
          {order?.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          ))}
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{order?.total}</Text>
        </View>
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
  header: {
    padding: 16,
    backgroundColor: '#FFA500',
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  orderDate: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  statusContainer: {
    padding: 16,
  },
  statusItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statusIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  statusLine: {
    position: 'absolute',
    width: 2,
    height: '100%',
    backgroundColor: '#ccc',
    left: 19,
  },
  hideTopLine: {
    top: '50%',
  },
  hideBottomLine: {
    height: '50%',
  },
  completedLine: {
    backgroundColor: '#4CAF50',
  },
  pendingLine: {
    backgroundColor: '#ccc',
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  completedIcon: {
    backgroundColor: '#4CAF50',
  },
  pendingIcon: {
    backgroundColor: '#f5f5f5',
  },
  statusContent: {
    flex: 1,
    marginLeft: 12,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statusTime: {
    fontSize: 12,
    color: '#999',
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  addressText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  orderItems: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
}); 
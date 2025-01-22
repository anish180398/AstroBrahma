import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface DeliveryAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'cod';
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export default function CheckoutScreen() {
  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  const [selectedPayment, setSelectedPayment] = useState<string>('');

  const paymentMethods: PaymentMethod[] = [
    { id: 'card', type: 'card', title: 'Credit/Debit Card', icon: 'credit-card' },
    { id: 'upi', type: 'upi', title: 'UPI Payment', icon: 'qrcode' },
    { id: 'cod', type: 'cod', title: 'Cash on Delivery', icon: 'cash' },
  ];

  const placeOrder = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          paymentMethod: selectedPayment,
        }),
      });

      if (response.ok) {
        Alert.alert(
          'Success',
          'Your order has been placed successfully!',
          [{ text: 'OK', onPress: () => {/* Navigate to Order Confirmation */} }]
        );
      } else {
        throw new Error('Failed to place order');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <View style={styles.addressForm}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={address.fullName}
            onChangeText={(text) => setAddress(prev => ({ ...prev, fullName: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Address Line 1"
            value={address.addressLine1}
            onChangeText={(text) => setAddress(prev => ({ ...prev, addressLine1: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Address Line 2 (Optional)"
            value={address.addressLine2}
            onChangeText={(text) => setAddress(prev => ({ ...prev, addressLine2: text }))}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={address.city}
              onChangeText={(text) => setAddress(prev => ({ ...prev, city: text }))}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="State"
              value={address.state}
              onChangeText={(text) => setAddress(prev => ({ ...prev, state: text }))}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Pincode"
              value={address.pincode}
              keyboardType="numeric"
              onChangeText={(text) => setAddress(prev => ({ ...prev, pincode: text }))}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Phone Number"
              value={address.phone}
              keyboardType="phone-pad"
              onChangeText={(text) => setAddress(prev => ({ ...prev, phone: text }))}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentOption,
              selectedPayment === method.id && styles.selectedPayment,
            ]}
            onPress={() => setSelectedPayment(method.id)}
          >
            <MaterialCommunityIcons
              name={method.icon}
              size={24}
              color={selectedPayment === method.id ? '#FFA500' : '#666'}
            />
            <Text
              style={[
                styles.paymentText,
                selectedPayment === method.id && styles.selectedPaymentText,
              ]}
            >
              {method.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹1,999</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>₹49</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryTotal}>₹2,048</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.placeOrderButton,
          (!selectedPayment || !address.fullName) && styles.disabledButton,
        ]}
        onPress={placeOrder}
        disabled={!selectedPayment || !address.fullName}
      >
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  addressForm: {
    gap: 12,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 12,
  },
  selectedPayment: {
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  selectedPaymentText: {
    color: '#FFA500',
    fontWeight: '500',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  summaryTotal: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  placeOrderButton: {
    backgroundColor: '#FFA500',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  placeOrderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
}); 
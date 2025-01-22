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

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'wallet';
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  details?: string;
}

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [upiId, setUpiId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card1',
      type: 'card',
      title: '•••• •••• •••• 4242',
      icon: 'credit-card',
      details: 'Expires 12/24',
    },
    {
      id: 'upi',
      type: 'upi',
      title: 'UPI',
      icon: 'qrcode',
    },
    {
      id: 'wallet',
      type: 'wallet',
      title: 'Wallet Balance',
      icon: 'wallet',
      details: '₹2,500',
    },
  ];

  const handlePayment = () => {
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Payment completed successfully!');
    }, 2000);
  };

  const renderPaymentMethod = (method: PaymentMethod) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.paymentMethod,
        selectedMethod === method.id && styles.selectedMethod,
      ]}
      onPress={() => setSelectedMethod(method.id)}
    >
      <View style={styles.methodIcon}>
        <MaterialCommunityIcons name={method.icon} size={24} color="#FFA500" />
      </View>
      <View style={styles.methodInfo}>
        <Text style={styles.methodTitle}>{method.title}</Text>
        {method.details && (
          <Text style={styles.methodDetails}>{method.details}</Text>
        )}
      </View>
      <View style={styles.radioButton}>
        {selectedMethod === method.id && (
          <View style={styles.radioButtonSelected} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Details</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount to Pay</Text>
          <Text style={styles.amount}>₹1,999</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        {paymentMethods.map(renderPaymentMethod)}
      </View>

      {selectedMethod === 'upi' && (
        <View style={styles.upiContainer}>
          <Text style={styles.upiLabel}>Enter UPI ID</Text>
          <TextInput
            style={styles.upiInput}
            value={upiId}
            onChangeText={setUpiId}
            placeholder="username@upi"
            autoCapitalize="none"
          />
        </View>
      )}

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹1,999</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>GST (18%)</Text>
          <Text style={styles.summaryValue}>₹359.82</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹2,358.82</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.payButton, (!selectedMethod || isLoading) && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={!selectedMethod || isLoading}
      >
        {isLoading ? (
          <Text style={styles.payButtonText}>Processing...</Text>
        ) : (
          <>
            <MaterialCommunityIcons name="lock" size={20} color="#fff" />
            <Text style={styles.payButtonText}>Pay Securely</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 16,
  },
  amountContainer: {
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedMethod: {
    borderColor: '#FFA500',
    backgroundColor: '#FFF8E7',
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  methodDetails: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFA500',
  },
  upiContainer: {
    padding: 16,
  },
  upiLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  upiInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  summary: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 12,
    marginTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA500',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
}); 
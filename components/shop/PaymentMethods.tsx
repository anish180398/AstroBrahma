import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet';
  title: string;
  subtitle?: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  isDefault?: boolean;
  details?: {
    cardNumber?: string;
    upiId?: string;
    bankName?: string;
    walletName?: string;
  };
}

interface SavedCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingCard, setAddingCard] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // New card form state
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: true,
  });

  // UPI ID state
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoints
      const [methodsResponse, cardsResponse] = await Promise.all([
        fetch('https://your-api.com/payment-methods'),
        fetch('https://your-api.com/saved-cards'),
      ]);
      
      const [methodsData, cardsData] = await Promise.all([
        methodsResponse.json(),
        cardsResponse.json(),
      ]);
      
      setPaymentMethods(methodsData);
      setSavedCards(cardsData);
      
      // Set default method if available
      const defaultMethod = methodsData.find((method: PaymentMethod) => method.isDefault);
      if (defaultMethod) {
        setSelectedMethod(defaultMethod.id);
      }
    } catch (err) {
      console.error('Error fetching payment methods:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = async () => {
    if (!validateCardDetails()) return;

    try {
      setAddingCard(true);
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        const newCardData = await response.json();
        setSavedCards(prev => [...prev, newCardData]);
        setAddingCard(false);
        setNewCard({
          cardNumber: '',
          cardHolder: '',
          expiryMonth: '',
          expiryYear: '',
          cvv: '',
          saveCard: true,
        });
        Alert.alert('Success', 'Card added successfully!');
      } else {
        throw new Error('Failed to add card');
      }
    } catch (err) {
      console.error('Error adding card:', err);
      Alert.alert('Error', 'Failed to add card. Please try again.');
    } finally {
      setAddingCard(false);
    }
  };

  const validateCardDetails = () => {
    if (!newCard.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      Alert.alert('Error', 'Please enter a valid 16-digit card number');
      return false;
    }
    if (!newCard.cardHolder.trim()) {
      Alert.alert('Error', 'Please enter the card holder name');
      return false;
    }
    if (!newCard.expiryMonth.match(/^(0[1-9]|1[0-2])$/)) {
      Alert.alert('Error', 'Please enter a valid expiry month (01-12)');
      return false;
    }
    if (!newCard.expiryYear.match(/^\d{2}$/)) {
      Alert.alert('Error', 'Please enter a valid expiry year');
      return false;
    }
    if (!newCard.cvv.match(/^\d{3}$/)) {
      Alert.alert('Error', 'Please enter a valid CVV');
      return false;
    }
    return true;
  };

  const validateUpiId = (id: string) => {
    return /^[\w.-]+@[\w.-]+$/.test(id);
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    if (selectedMethod === 'upi' && !validateUpiId(upiId)) {
      Alert.alert('Error', 'Please enter a valid UPI ID');
      return;
    }

    try {
      setProcessingPayment(true);
      // Replace with your actual payment processing logic
      const response = await fetch('https://your-api.com/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          methodId: selectedMethod,
          upiId: upiId,
          // Add other necessary payment details
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Payment processed successfully!');
        // Navigate to success screen or order confirmation
      } else {
        throw new Error('Payment failed');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      Alert.alert('Error', 'Payment failed. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const renderPaymentMethod = (method: PaymentMethod) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.methodCard,
        selectedMethod === method.id && styles.selectedMethodCard,
      ]}
      onPress={() => setSelectedMethod(method.id)}
    >
      <MaterialCommunityIcons
        name={method.icon}
        size={24}
        color={selectedMethod === method.id ? '#FFA500' : '#666'}
      />
      <View style={styles.methodInfo}>
        <Text style={styles.methodTitle}>{method.title}</Text>
        {method.subtitle && (
          <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
        )}
      </View>
      <MaterialCommunityIcons
        name={selectedMethod === method.id ? 'radiobox-marked' : 'radiobox-blank'}
        size={24}
        color={selectedMethod === method.id ? '#FFA500' : '#666'}
      />
    </TouchableOpacity>
  );

  const renderSavedCard = (card: SavedCard) => (
    <TouchableOpacity
      key={card.id}
      style={[
        styles.savedCardCard,
        selectedMethod === card.id && styles.selectedMethodCard,
      ]}
      onPress={() => setSelectedMethod(card.id)}
    >
      <MaterialCommunityIcons
        name="credit-card"
        size={24}
        color={selectedMethod === card.id ? '#FFA500' : '#666'}
      />
      <View style={styles.savedCardInfo}>
        <Text style={styles.savedCardNumber}>
          •••• {card.cardNumber.slice(-4)}
        </Text>
        <Text style={styles.savedCardExpiry}>
          Expires {card.expiryMonth}/{card.expiryYear}
        </Text>
      </View>
      <MaterialCommunityIcons
        name={selectedMethod === card.id ? 'radiobox-marked' : 'radiobox-blank'}
        size={24}
        color={selectedMethod === card.id ? '#FFA500' : '#666'}
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Saved Cards */}
        {savedCards.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved Cards</Text>
            {savedCards.map(renderSavedCard)}
          </View>
        )}

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          {paymentMethods.map(renderPaymentMethod)}
        </View>

        {/* Add New Card Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add New Card</Text>
          <View style={styles.cardForm}>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              value={newCard.cardNumber}
              onChangeText={(text) =>
                setNewCard((prev) => ({ ...prev, cardNumber: text }))
              }
              keyboardType="numeric"
              maxLength={16}
            />
            <TextInput
              style={styles.input}
              placeholder="Card Holder Name"
              value={newCard.cardHolder}
              onChangeText={(text) =>
                setNewCard((prev) => ({ ...prev, cardHolder: text }))
              }
            />
            <View style={styles.expiryRow}>
              <TextInput
                style={[styles.input, styles.expiryInput]}
                placeholder="MM"
                value={newCard.expiryMonth}
                onChangeText={(text) =>
                  setNewCard((prev) => ({ ...prev, expiryMonth: text }))
                }
                keyboardType="numeric"
                maxLength={2}
              />
              <Text style={styles.expirySeparator}>/</Text>
              <TextInput
                style={[styles.input, styles.expiryInput]}
                placeholder="YY"
                value={newCard.expiryYear}
                onChangeText={(text) =>
                  setNewCard((prev) => ({ ...prev, expiryYear: text }))
                }
                keyboardType="numeric"
                maxLength={2}
              />
              <TextInput
                style={[styles.input, styles.cvvInput]}
                placeholder="CVV"
                value={newCard.cvv}
                onChangeText={(text) =>
                  setNewCard((prev) => ({ ...prev, cvv: text }))
                }
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
            <TouchableOpacity
              style={styles.saveCardToggle}
              onPress={() =>
                setNewCard((prev) => ({ ...prev, saveCard: !prev.saveCard }))
              }
            >
              <MaterialCommunityIcons
                name={newCard.saveCard ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={24}
                color="#FFA500"
              />
              <Text style={styles.saveCardText}>Save card for future use</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addCardButton, addingCard && styles.disabledButton]}
              onPress={handleAddCard}
              disabled={addingCard}
            >
              {addingCard ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.addCardButtonText}>Add Card</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* UPI Section */}
        {selectedMethod === 'upi' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Enter UPI ID</Text>
            <TextInput
              style={styles.input}
              placeholder="username@bank"
              value={upiId}
              onChangeText={setUpiId}
              autoCapitalize="none"
            />
          </View>
        )}
      </ScrollView>

      {/* Payment Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.payButton,
            (!selectedMethod || processingPayment) && styles.disabledButton,
          ]}
          onPress={handlePayment}
          disabled={!selectedMethod || processingPayment}
        >
          {processingPayment ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={styles.payButtonText}>Pay Now</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
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
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedMethodCard: {
    backgroundColor: '#FFF3E0',
  },
  methodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  methodSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  savedCardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  savedCardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  savedCardNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  savedCardExpiry: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  cardForm: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  expiryInput: {
    width: 60,
    textAlign: 'center',
    marginRight: 8,
  },
  expirySeparator: {
    fontSize: 20,
    color: '#666',
    marginRight: 8,
  },
  cvvInput: {
    width: 80,
    marginLeft: 'auto',
  },
  saveCardToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  saveCardText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  addCardButton: {
    backgroundColor: '#FFA500',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addCardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  payButton: {
    backgroundColor: '#FFA500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
}); 
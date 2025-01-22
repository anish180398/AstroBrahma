import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  selectedVariant?: {
    name: string;
    value: string;
  };
}

interface PriceBreakdown {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

export default function CartSummary() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown>({
    subtotal: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [loading, setLoading] = useState(true);
  const [applyingPromo, setApplyingPromo] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/cart');
      const data = await response.json();
      setCartItems(data.items);
      calculatePriceBreakdown(data.items, appliedPromo);
    } catch (err) {
      console.error('Error fetching cart data:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculatePriceBreakdown = (items: CartItem[], promo: PromoCode | null) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    let discount = 0;
    if (promo) {
      discount = promo.type === 'percentage'
        ? subtotal * (promo.discount / 100)
        : promo.discount;
    }

    const shipping = subtotal > 1000 ? 0 : 100; // Free shipping over ₹1000
    const tax = (subtotal - discount) * 0.18; // 18% GST
    const total = subtotal - discount + shipping + tax;

    setPriceBreakdown({
      subtotal,
      discount,
      shipping,
      tax,
      total,
    });
  };

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;

    try {
      setApplyingPromo(true);
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/promo/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: promoCode }),
      });

      const data = await response.json();
      if (response.ok) {
        setAppliedPromo(data);
        calculatePriceBreakdown(cartItems, data);
        Alert.alert('Success', 'Promo code applied successfully!');
      } else {
        Alert.alert('Error', data.message || 'Invalid promo code');
      }
    } catch (err) {
      console.error('Error applying promo code:', err);
      Alert.alert('Error', 'Failed to apply promo code');
    } finally {
      setApplyingPromo(false);
      setPromoCode('');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    calculatePriceBreakdown(cartItems, null);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }
    navigation.navigate('Checkout');
  };

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
        {/* Price Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>₹{priceBreakdown.subtotal.toFixed(2)}</Text>
          </View>
          {priceBreakdown.discount > 0 && (
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, styles.discountLabel]}>
                Discount
                {appliedPromo && ` (${appliedPromo.code})`}
              </Text>
              <Text style={[styles.priceValue, styles.discountValue]}>
                -₹{priceBreakdown.discount.toFixed(2)}
              </Text>
            </View>
          )}
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Shipping</Text>
            <Text style={styles.priceValue}>
              {priceBreakdown.shipping === 0
                ? 'FREE'
                : `₹${priceBreakdown.shipping.toFixed(2)}`}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax (18% GST)</Text>
            <Text style={styles.priceValue}>₹{priceBreakdown.tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{priceBreakdown.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Promo Code Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Have a Promo Code?</Text>
          {appliedPromo ? (
            <View style={styles.appliedPromoContainer}>
              <View style={styles.appliedPromo}>
                <MaterialCommunityIcons name="tag" size={20} color="#4CAF50" />
                <Text style={styles.appliedPromoText}>{appliedPromo.code}</Text>
                <TouchableOpacity onPress={removePromoCode}>
                  <MaterialCommunityIcons name="close" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              <Text style={styles.promoSavings}>
                You saved ₹{priceBreakdown.discount.toFixed(2)}
              </Text>
            </View>
          ) : (
            <View style={styles.promoInputContainer}>
              <TextInput
                style={styles.promoInput}
                placeholder="Enter promo code"
                value={promoCode}
                onChangeText={setPromoCode}
                autoCapitalize="characters"
              />
              <TouchableOpacity
                style={[
                  styles.applyButton,
                  (!promoCode.trim() || applyingPromo) && styles.disabledButton,
                ]}
                onPress={applyPromoCode}
                disabled={!promoCode.trim() || applyingPromo}
              >
                {applyingPromo ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.applyButtonText}>Apply</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            cartItems.length === 0 && styles.disabledButton,
          ]}
          onPress={proceedToCheckout}
          disabled={cartItems.length === 0}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
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
  promoInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  appliedPromoContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 12,
  },
  appliedPromo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appliedPromoText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 8,
  },
  promoSavings: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  checkoutButton: {
    backgroundColor: '#FFA500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
}); 
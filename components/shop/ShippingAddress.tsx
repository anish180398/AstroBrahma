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

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
}

export default function ShippingAddressScreen() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingAddress, setAddingAddress] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    type: 'home' as const,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/addresses');
      const data = await response.json();
      setAddresses(data);
      
      // Set default address if available
      const defaultAddress = data.find((addr: Address) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateAddress = () => {
    if (!newAddress.name.trim()) {
      Alert.alert('Error', 'Please enter the full name');
      return false;
    }
    if (!newAddress.phone.match(/^\d{10}$/)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return false;
    }
    if (!newAddress.address.trim()) {
      Alert.alert('Error', 'Please enter the address');
      return false;
    }
    if (!newAddress.city.trim()) {
      Alert.alert('Error', 'Please enter the city');
      return false;
    }
    if (!newAddress.state.trim()) {
      Alert.alert('Error', 'Please enter the state');
      return false;
    }
    if (!newAddress.pincode.match(/^\d{6}$/)) {
      Alert.alert('Error', 'Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const handleAddAddress = async () => {
    if (!validateAddress()) return;

    try {
      setAddingAddress(true);
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });

      if (response.ok) {
        const newAddressData = await response.json();
        setAddresses(prev => [...prev, newAddressData]);
        setShowAddForm(false);
        setNewAddress({
          name: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          type: 'home',
        });
        Alert.alert('Success', 'Address added successfully!');
      } else {
        throw new Error('Failed to add address');
      }
    } catch (err) {
      console.error('Error adding address:', err);
      Alert.alert('Error', 'Failed to add address. Please try again.');
    } finally {
      setAddingAddress(false);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://your-api.com/addresses/${addressId}/default`, {
        method: 'PUT',
      });

      if (response.ok) {
        setAddresses(prev =>
          prev.map(addr => ({
            ...addr,
            isDefault: addr.id === addressId,
          }))
        );
      } else {
        throw new Error('Failed to set default address');
      }
    } catch (err) {
      console.error('Error setting default address:', err);
      Alert.alert('Error', 'Failed to set default address. Please try again.');
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://your-api.com/addresses/${addressId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAddresses(prev => prev.filter(addr => addr.id !== addressId));
        if (selectedAddress === addressId) {
          setSelectedAddress(null);
        }
      } else {
        throw new Error('Failed to delete address');
      }
    } catch (err) {
      console.error('Error deleting address:', err);
      Alert.alert('Error', 'Failed to delete address. Please try again.');
    }
  };

  const renderAddress = (address: Address) => (
    <TouchableOpacity
      key={address.id}
      style={[
        styles.addressCard,
        selectedAddress === address.id && styles.selectedAddressCard,
      ]}
      onPress={() => setSelectedAddress(address.id)}
    >
      <View style={styles.addressHeader}>
        <View style={styles.addressType}>
          <MaterialCommunityIcons
            name={address.type === 'home' ? 'home' : address.type === 'work' ? 'briefcase' : 'map-marker'}
            size={24}
            color={selectedAddress === address.id ? '#FFA500' : '#666'}
          />
          <Text style={styles.addressTypeText}>{address.type.toUpperCase()}</Text>
        </View>
        {address.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>DEFAULT</Text>
          </View>
        )}
      </View>

      <Text style={styles.name}>{address.name}</Text>
      <Text style={styles.phone}>{address.phone}</Text>
      <Text style={styles.addressText}>{address.address}</Text>
      <Text style={styles.addressText}>
        {address.city}, {address.state} {address.pincode}
      </Text>

      <View style={styles.actionButtons}>
        {!address.isDefault && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleSetDefault(address.id)}
          >
            <MaterialCommunityIcons name="star-outline" size={20} color="#666" />
            <Text style={styles.actionButtonText}>Set as Default</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteAddress(address.id)}
        >
          <MaterialCommunityIcons name="delete-outline" size={20} color="#FF5252" />
          <Text style={[styles.actionButtonText, styles.deleteText]}>Delete</Text>
        </TouchableOpacity>
      </View>
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
        {/* Saved Addresses */}
        {addresses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved Addresses</Text>
            {addresses.map(renderAddress)}
          </View>
        )}

        {/* Add New Address Form */}
        <View style={styles.section}>
          {!showAddForm ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddForm(true)}
            >
              <MaterialCommunityIcons name="plus" size={24} color="#FFA500" />
              <Text style={styles.addButtonText}>Add New Address</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.addressForm}>
              <Text style={styles.formTitle}>Add New Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={newAddress.name}
                onChangeText={(text) =>
                  setNewAddress((prev) => ({ ...prev, name: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={newAddress.phone}
                onChangeText={(text) =>
                  setNewAddress((prev) => ({ ...prev, phone: text }))
                }
                keyboardType="numeric"
                maxLength={10}
              />
              <TextInput
                style={[styles.input, styles.addressInput]}
                placeholder="Address"
                value={newAddress.address}
                onChangeText={(text) =>
                  setNewAddress((prev) => ({ ...prev, address: text }))
                }
                multiline
                numberOfLines={3}
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={newAddress.city}
                onChangeText={(text) =>
                  setNewAddress((prev) => ({ ...prev, city: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="State"
                value={newAddress.state}
                onChangeText={(text) =>
                  setNewAddress((prev) => ({ ...prev, state: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Pincode"
                value={newAddress.pincode}
                onChangeText={(text) =>
                  setNewAddress((prev) => ({ ...prev, pincode: text }))
                }
                keyboardType="numeric"
                maxLength={6}
              />

              <View style={styles.addressTypeSelector}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    newAddress.type === 'home' && styles.selectedTypeButton,
                  ]}
                  onPress={() => setNewAddress((prev) => ({ ...prev, type: 'home' }))}
                >
                  <MaterialCommunityIcons
                    name="home"
                    size={20}
                    color={newAddress.type === 'home' ? '#FFA500' : '#666'}
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      newAddress.type === 'home' && styles.selectedTypeText,
                    ]}
                  >
                    Home
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    newAddress.type === 'work' && styles.selectedTypeButton,
                  ]}
                  onPress={() => setNewAddress((prev) => ({ ...prev, type: 'work' }))}
                >
                  <MaterialCommunityIcons
                    name="briefcase"
                    size={20}
                    color={newAddress.type === 'work' ? '#FFA500' : '#666'}
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      newAddress.type === 'work' && styles.selectedTypeText,
                    ]}
                  >
                    Work
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    newAddress.type === 'other' && styles.selectedTypeButton,
                  ]}
                  onPress={() => setNewAddress((prev) => ({ ...prev, type: 'other' }))}
                >
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color={newAddress.type === 'other' ? '#FFA500' : '#666'}
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      newAddress.type === 'other' && styles.selectedTypeText,
                    ]}
                  >
                    Other
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={() => {
                    setShowAddForm(false);
                    setNewAddress({
                      name: '',
                      phone: '',
                      address: '',
                      city: '',
                      state: '',
                      pincode: '',
                      type: 'home',
                    });
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.formButton, styles.saveButton, addingAddress && styles.disabledButton]}
                  onPress={handleAddAddress}
                  disabled={addingAddress}
                >
                  {addingAddress ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save Address</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedAddress && styles.disabledButton]}
          disabled={!selectedAddress}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  addressCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedAddressCard: {
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressTypeText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  defaultBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  deleteText: {
    color: '#FF5252',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFA500',
    borderStyle: 'dashed',
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FFA500',
    fontWeight: '600',
  },
  addressForm: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  addressInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  addressTypeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  selectedTypeButton: {
    backgroundColor: '#FFF3E0',
  },
  typeButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  selectedTypeText: {
    color: '#FFA500',
    fontWeight: '600',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  formButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#FFA500',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  continueButton: {
    backgroundColor: '#FFA500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
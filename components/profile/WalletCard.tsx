import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WalletCard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="wallet" size={24} color="#FFA500" />
          <Text style={styles.title}>Wallet Balance</Text>
        </View>
        <TouchableOpacity style={styles.historyButton}>
          <Text style={styles.historyText}>History</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
        </TouchableOpacity>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>₹1,500</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Money</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recentTransactions}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.transaction}>
            <View style={styles.transactionInfo}>
              <MaterialCommunityIcons 
                name={item % 2 === 0 ? "cash-plus" : "cash-minus"} 
                size={24} 
                color={item % 2 === 0 ? "#4CAF50" : "#F44336"} 
              />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>
                  {item % 2 === 0 ? "Added Money" : "Consultation Fee"}
                </Text>
                <Text style={styles.transactionDate}>22 Mar, 2024</Text>
              </View>
            </View>
            <Text style={[
              styles.transactionAmount,
              { color: item % 2 === 0 ? "#4CAF50" : "#F44336" }
            ]}>
              {item % 2 === 0 ? "+" : "-"}₹500
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyText: {
    fontSize: 14,
    color: '#666',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  recentTransactions: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 16,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDetails: {
    marginLeft: 12,
  },
  transactionTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 
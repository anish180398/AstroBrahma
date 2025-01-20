import { Link } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function AstrologersPage() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../../../assets/images/icon.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Astrologers</Text>
        <View style={styles.headerIcons}>
          <Text style={styles.walletAmount}>100 ₹</Text>
          <Image source={require('../../../assets/images/icon.png')} style={styles.icon} />
          <Image source={require('../../../assets/images/icon.png')} style={styles.icon} />
        </View>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Track your planets</Text>
        <Text style={styles.bannerSubtitle}>Track movements of your planets</Text>
      </View>

      {/* Filter Options */}
      <View style={styles.filters}>
        <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
          <Text style={styles.filterTextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Love</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Marriage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Life</Text>
        </TouchableOpacity>
      </View>
      <Link href="/(astrologers)/astrologersProfile">
        <Text style={{ color: 'blue', marginTop: 20 }}>Go to AstrologersProfile</Text>
      </Link>
      {/* Astrologers List */}
      {[
        {
          name: 'John Doe',
          specialty: 'Numerology',
          languages: 'Malayalam, Tamil',
          experience: '4 yrs',
          price: '₹36 / min',
          image: 'https://via.placeholder.com/150',
          chatColor: 'red',
        },
        {
          name: 'John Doe',
          specialty: 'Vedic',
          languages: 'Malayalam, Tamil',
          experience: '4 yrs',
          price: '₹12 / min',
          image: 'https://via.placeholder.com/150',
          chatColor: 'green',
        },
        {
          name: 'John Doe',
          specialty: 'Numerology',
          languages: 'Malayalam, Tamil',
          experience: '4 yrs',
          price: '₹16 / min',
          image: 'https://via.placeholder.com/150',
          chatColor: 'green',
        },
      ].map((astrologer, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: astrologer.image }} style={styles.cardImage} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardSpecialty}>{astrologer.specialty}</Text>
            <Text style={styles.cardName}>{astrologer.name}</Text>
            <Text style={styles.cardDetails}>{astrologer.languages}</Text>
            <Text style={styles.cardDetails}>Exp: {astrologer.experience}</Text>
            <Text style={styles.cardPrice}>{astrologer.price}</Text>
          </View>
          <TouchableOpacity style={[styles.chatButton, { backgroundColor: astrologer.chatColor }]}>
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 4,
  },
  banner: {
    backgroundColor: '#FFEDCC',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8A4B08',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#8A4B08',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: '#FFEDCC',
  },
  filterText: {
    color: '#8A4B08',
  },
  filterTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 8,
    elevation: 4,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardSpecialty: {
    fontSize: 12,
    color: '#8A4B08',
    fontWeight: 'bold',
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#8A8A8A',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  chatButton: {
    padding: 10,
    borderRadius: 8,
  },
  chatButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

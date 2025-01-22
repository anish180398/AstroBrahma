import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { router } from 'expo-router';

interface MenuItem {
  id: string;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: string;
  color: string;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    title: 'Daily Horoscope',
    icon: 'zodiac-aries',
    route: '/daily-horoscope',
    color: '#FF6B6B',
  },
  {
    id: '2',
    title: 'Remedies',
    icon: 'star-four-points',
    route: '/remedies',
    color: '#96CEB4',
  },
  {
    id: '3',
    title: 'My Profile',
    icon: 'account',
    route: '/profile',
    color: '#4ECDC4',
  },
  {
    id: '4',
    title: 'Consultation History',
    icon: 'history',
    route: '/consultation-history',
    color: '#45B7D1',
  },
  {
    id: '5',
    title: 'Wallet',
    icon: 'wallet',
    route: '/wallet',
    color: '#96CEB4',
  },
  {
    id: '6',
    title: 'Orders',
    icon: 'package',
    route: '/orders',
    color: '#FFD93D',
  },
  {
    id: '7',
    title: 'Favorite Astrologers',
    icon: 'star',
    route: '/favorite-astrologers',
    color: '#FF6B6B',
  },
  {
    id: '8',
    title: 'Settings',
    icon: 'cog',
    route: '/settings',
    color: '#6C757D',
  },
  {
    id: '9',
    title: 'Help & Support',
    icon: 'help-circle',
    route: '/help-support',
    color: '#20C997',
  },
  {
    id: '10',
    title: 'About Us',
    icon: 'information',
    route: '/about',
    color: '#6610F2',
  },
];

export default function MoreScreen() {
  const router = useRouter();

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => router.push(item.route)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
        <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>More Options</Text>
      </View>

      <ScrollView style={styles.menuContainer}>
        {menuItems.map(renderMenuItem)}
      </ScrollView>

      <TouchableOpacity 
        onPress={() => router.push('/(screens)/profile')}
        style={{ padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 }}
      >
        <Text>Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => router.push('/(screens)/services')}
        style={{ padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 }}
      >
        <Text>Services</Text>
      </TouchableOpacity>
    </View>
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
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
  },
}); 
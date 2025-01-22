import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ZodiacSign {
  id: string;
  name: string;
  date: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}

const zodiacSigns: ZodiacSign[] = [
  {
    id: '1',
    name: 'Aries',
    date: 'Mar 21 - Apr 19',
    icon: 'zodiac-aries',
    color: '#FF6B6B',
  },
  {
    id: '2',
    name: 'Taurus',
    date: 'Apr 20 - May 20',
    icon: 'zodiac-taurus',
    color: '#4ECDC4',
  },
  {
    id: '3',
    name: 'Gemini',
    date: 'May 21 - Jun 20',
    icon: 'zodiac-gemini',
    color: '#45B7D1',
  },
  {
    id: '4',
    name: 'Cancer',
    date: 'Jun 21 - Jul 22',
    icon: 'zodiac-cancer',
    color: '#96CEB4',
  },
  {
    id: '5',
    name: 'Leo',
    date: 'Jul 23 - Aug 22',
    icon: 'zodiac-leo',
    color: '#FFD93D',
  },
  {
    id: '6',
    name: 'Virgo',
    date: 'Aug 23 - Sep 22',
    icon: 'zodiac-virgo',
    color: '#FF8B94',
  },
  {
    id: '7',
    name: 'Libra',
    date: 'Sep 23 - Oct 22',
    icon: 'zodiac-libra',
    color: '#6C5B7B',
  },
  {
    id: '8',
    name: 'Scorpio',
    date: 'Oct 23 - Nov 21',
    icon: 'zodiac-scorpio',
    color: '#C06C84',
  },
  {
    id: '9',
    name: 'Sagittarius',
    date: 'Nov 22 - Dec 21',
    icon: 'zodiac-sagittarius',
    color: '#F8B195',
  },
  {
    id: '10',
    name: 'Capricorn',
    date: 'Dec 22 - Jan 19',
    icon: 'zodiac-capricorn',
    color: '#355C7D',
  },
  {
    id: '11',
    name: 'Aquarius',
    date: 'Jan 20 - Feb 18',
    icon: 'zodiac-aquarius',
    color: '#2A363B',
  },
  {
    id: '12',
    name: 'Pisces',
    date: 'Feb 19 - Mar 20',
    icon: 'zodiac-pisces',
    color: '#E84A5F',
  },
];

interface HoroscopeCategory {
  id: string;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  prediction: string;
  rating: number;
}

const horoscopeCategories: HoroscopeCategory[] = [
  {
    id: '1',
    title: 'Love',
    icon: 'heart',
    prediction: 'A special someone might catch your attention today. Be open to new connections and let your heart guide you.',
    rating: 4,
  },
  {
    id: '2',
    title: 'Career',
    icon: 'briefcase',
    prediction: 'Your professional life is looking bright. New opportunities for growth and advancement are on the horizon.',
    rating: 5,
  },
  {
    id: '3',
    title: 'Health',
    icon: 'heart-pulse',
    prediction: 'Focus on maintaining balance in your life. Take time for self-care and mental well-being.',
    rating: 3,
  },
  {
    id: '4',
    title: 'Finance',
    icon: 'currency-usd',
    prediction: 'Be cautious with your spending today. A unexpected financial opportunity may present itself.',
    rating: 4,
  },
];

export default function DailyHoroscopeScreen() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign>(zodiacSigns[0]);

  const renderZodiacSign = (sign: ZodiacSign) => (
    <TouchableOpacity
      key={sign.id}
      style={[
        styles.signCard,
        selectedSign.id === sign.id && { borderColor: sign.color },
      ]}
      onPress={() => setSelectedSign(sign)}
    >
      <MaterialCommunityIcons name={sign.icon} size={32} color={sign.color} />
      <Text style={styles.signName}>{sign.name}</Text>
      <Text style={styles.signDate}>{sign.date}</Text>
    </TouchableOpacity>
  );

  const renderHoroscopeCategory = (category: HoroscopeCategory) => (
    <View key={category.id} style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <View style={styles.categoryTitleContainer}>
          <MaterialCommunityIcons name={category.icon} size={24} color="#FFA500" />
          <Text style={styles.categoryTitle}>{category.title}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <MaterialCommunityIcons
              key={index}
              name="star"
              size={16}
              color={index < category.rating ? '#FFD700' : '#E0E0E0'}
            />
          ))}
        </View>
      </View>
      <Text style={styles.prediction}>{category.prediction}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Horoscope</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.signSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {zodiacSigns.map(renderZodiacSign)}
          </ScrollView>
        </View>

        <View style={styles.selectedSignContainer}>
          <MaterialCommunityIcons
            name={selectedSign.icon}
            size={48}
            color={selectedSign.color}
          />
          <View style={styles.selectedSignInfo}>
            <Text style={styles.selectedSignName}>{selectedSign.name}</Text>
            <Text style={styles.selectedSignDate}>{selectedSign.date}</Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          {horoscopeCategories.map(renderHoroscopeCategory)}
        </View>
      </ScrollView>
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
  date: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  signSelector: {
    padding: 16,
  },
  signCard: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  signDate: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
  selectedSignContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF5E6',
    marginHorizontal: 16,
    borderRadius: 12,
  },
  selectedSignInfo: {
    marginLeft: 16,
  },
  selectedSignName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedSignDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  categoriesContainer: {
    padding: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  prediction: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 
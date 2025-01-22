import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Header } from '@/components/astrologers/Header';
import { Banner } from '@/components/astrologers/Banner';
import { FilterTabs } from '@/components/astrologers/FilterTabs';
import { AstrologerCard } from '@/components/astrologers/AstrologerCard';

const astrologers = [
  {
    id: 1,
    name: 'John Doe',
    specialty: 'Numerology',
    languages: 'Malayalam, Tamil',
    experience: '4yrs',
    price: '₹36/min',
    image: 'https://via.placeholder.com/150',
    rating: 5.0,
  },
  {
    id: 2,
    name: 'John Doe',
    specialty: 'Vedic',
    languages: 'Malayalam, Tamil',
    experience: '4yrs',
    price: '₹12/min',
    image: 'https://via.placeholder.com/150',
    rating: 5.0,
  },
  {
    id: 3,
    name: 'John Doe',
    specialty: 'Numerology',
    languages: 'Malayalam, Tamil',
    experience: '4yrs',
    price: '₹16/min',
    image: 'https://via.placeholder.com/150',
    rating: 5.0,
  },
];

export default function AstrologersListScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Banner />
      <FilterTabs />
      {astrologers.map((astrologer) => (
        <AstrologerCard key={astrologer.id} {...astrologer} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

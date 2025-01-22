import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Header from '@/components/home/Header';
import SearchBar from '@/components/home/SearchBar';
import QuickLinks from '@/components/home/QuickLinks';
import WhatsNew from '@/components/home/WhatsNew';
import Astrologers from '@/components/home/Astrologers';
import DiscoverServices from '@/components/home/DiscoverServices';
import Community from '@/components/home/Community';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar />
        <QuickLinks />
        <WhatsNew />
        <Astrologers />
        <DiscoverServices />
        <Community />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

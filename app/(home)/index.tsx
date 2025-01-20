import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Header from '@/components/home/Header';
import SearchBar from '@/components/home/SearchBar';
import QuickLinks from '@/components/home/QuickLinks';
import WhatsNew from '@/components/home/WhatsNew';
import Astrologers from '@/components/home/Astrologers';
import DiscoverServices from '@/components/home/DiscoverServices';
import Community from '@/components/home/Community';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <SearchBar />
      <QuickLinks />
      <WhatsNew />
      <Astrologers />
      <DiscoverServices />
      {/* <Community /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;

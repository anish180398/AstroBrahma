import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import AstrologersHeader from '@/components/astrologers/Header';
import FilterTabs from '@/components/astrologers/FilterTabs';
import AstrologersList from '@/components/astrologers/AstrologersList';

export default function AstrologersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AstrologersHeader />
      <FilterTabs />
      <AstrologersList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 
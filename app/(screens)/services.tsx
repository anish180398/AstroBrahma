import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import ServicesHeader from '@/components/services/Header';
import ServicesList from '@/components/services/ServicesList';
import ServiceCategories from '@/components/services/ServiceCategories';

export default function ServicesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ServicesHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ServiceCategories />
        <ServicesList />
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
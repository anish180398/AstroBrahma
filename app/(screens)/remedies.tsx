import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Remedies from '@/components/services/Remedies';

export default function RemediesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Remedies />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 
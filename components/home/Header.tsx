import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';  
import { CLOUDINARY_IMAGES } from '@/constants/images';
import { getCloudinaryImage } from '@/utils/cloudinary';

const Header = () => {

    const headerImage = "https://res.cloudinary.com/dn8ouckig/image/upload/v1737410439/icon_lql6hg.png"
console.log(headerImage)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Header</Text>
      <View style={styles.header}>
        <TouchableOpacity>
        <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
        {headerImage && (
        <Image
          source={{ uri: headerImage }}
          style={styles.logo}
          resizeMode="cover"
        />
      )}
          <Text style={styles.title}>Astro Brahma</Text>
        </View>
        <TouchableOpacity>
        {headerImage && (
        <Image
          source={{ uri: headerImage }}
          style={styles.logo}
          resizeMode="cover"
        />
      )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

export default Header; 
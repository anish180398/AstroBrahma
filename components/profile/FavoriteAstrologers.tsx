import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PLACEHOLDER_IMAGES } from '../../constants/images';
import { NavigationProp } from '@react-navigation/native';

interface FavoriteAstrologersProps {
  navigation: NavigationProp<any>;
}

interface Astrologer {
  id: string;
  name: string;
  image: string;
  specialities: string[];
  experience: number;
  rating: number;
  totalConsultations: number;
  price: number;
  languages: string[];
  isOnline: boolean;
}

export default function FavoriteAstrologers({ navigation }: FavoriteAstrologersProps) {
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavoriteAstrologers();
  }, []);

  const fetchFavoriteAstrologers = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/user/favorite-astrologers');
      const data = await response.json();
      setAstrologers(data);
    } catch (error) {
      console.error('Error fetching favorite astrologers:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (astrologerId: string) => {
    try {
      // Replace with your actual API endpoint
      await fetch(`https://your-api.com/user/favorite-astrologers/${astrologerId}`, {
        method: 'DELETE',
      });
      setAstrologers(prev => prev.filter(a => a.id !== astrologerId));
    } catch (error) {
      console.error('Error removing astrologer from favorites:', error);
    }
  };

  const renderAstrologerItem = ({ item }: { item: Astrologer }) => (
    <View style={styles.astrologerCard}>
      <View style={styles.cardHeader}>
        <TouchableOpacity
          style={styles.profileSection}
          onPress={() => navigation.navigate('AstrologerProfile', { id: item.id })}
        >
          <Image
            source={item.image ? { uri: item.image } : PLACEHOLDER_IMAGES.profile}
            style={styles.astrologerImage}
          />
          {item.isOnline && <View style={styles.onlineBadge} />}
        </TouchableOpacity>

        <View style={styles.astrologerInfo}>
          <Text style={styles.astrologerName}>{item.name}</Text>
          <Text style={styles.specialities}>
            {item.specialities.slice(0, 2).join(' • ')}
          </Text>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFA500" />
            <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
            <Text style={styles.consultations}>
              ({item.totalConsultations} consultations)
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => removeFromFavorites(item.id)}
        >
          <MaterialCommunityIcons name="heart" size={24} color="#FF5252" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="briefcase" size={16} color="#666" />
          <Text style={styles.detailText}>{item.experience}+ years</Text>
        </View>

        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="translate" size={16} color="#666" />
          <Text style={styles.detailText}>
            {item.languages.slice(0, 2).join(', ')}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="currency-inr" size={16} color="#666" />
          <Text style={styles.detailText}>₹{item.price}/min</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.chatButton]}
          onPress={() => navigation.navigate('Chat', { astrologerId: item.id })}
        >
          <MaterialCommunityIcons name="chat" size={20} color="#FFA500" />
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={() => navigation.navigate('Call', { astrologerId: item.id })}
        >
          <MaterialCommunityIcons name="phone" size={20} color="#4CAF50" />
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {astrologers.length > 0 ? (
        <FlatList
          data={astrologers}
          renderItem={renderAstrologerItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="heart-outline" size={64} color="#666" />
          <Text style={styles.emptyText}>No favorite astrologers yet</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Astrologers')}
          >
            <Text style={styles.browseButtonText}>Browse Astrologers</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  astrologerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileSection: {
    position: 'relative',
  },
  astrologerImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  astrologerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  astrologerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  specialities: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFA500',
    marginLeft: 4,
  },
  consultations: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  favoriteButton: {
    padding: 8,
  },
  cardDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  chatButton: {
    backgroundColor: '#FFF3E0',
  },
  callButton: {
    backgroundColor: '#E8F5E9',
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFA500',
    marginLeft: 8,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
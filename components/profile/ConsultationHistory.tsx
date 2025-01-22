import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PLACEHOLDER_IMAGES } from '../../constants/images';
import { NavigationProp } from '@react-navigation/native';

interface Consultation {
  id: string;
  astrologerId: string;
  astrologerName: string;
  astrologerImage: string;
  date: string;
  duration: number;
  type: 'chat' | 'call' | 'video';
  amount: number;
  status: 'completed' | 'cancelled' | 'scheduled';
  rating?: number;
}

interface ConsultationHistoryProps {
  navigation: NavigationProp<any>;
}

export default function ConsultationHistory({ navigation }: ConsultationHistoryProps) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed'>('all');

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/consultations/history');
      const data = await response.json();
      setConsultations(data);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Consultation['status']) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#FF5252';
      case 'scheduled':
        return '#FFA500';
      default:
        return '#666';
    }
  };

  const renderConsultationItem = ({ item }: { item: Consultation }) => (
    <TouchableOpacity
      style={styles.consultationCard}
      onPress={() => navigation.navigate('ConsultationDetails', { id: item.id })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.astrologerInfo}>
          <Image
            source={
              item.astrologerImage
                ? { uri: item.astrologerImage }
                : PLACEHOLDER_IMAGES.profile
            }
            style={styles.astrologerImage}
          />
          <View>
            <Text style={styles.astrologerName}>{item.astrologerName}</Text>
            <Text style={styles.consultationType}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Consultation
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={20} color="#666" />
          <Text style={styles.detailText}>
            {new Date(item.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="clock-outline" size={20} color="#666" />
          <Text style={styles.detailText}>{item.duration} minutes</Text>
        </View>

        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="currency-inr" size={20} color="#666" />
          <Text style={styles.detailText}>₹{item.amount.toFixed(2)}</Text>
        </View>
      </View>

      {item.status === 'completed' && (
        <View style={styles.ratingContainer}>
          {item.rating ? (
            <View style={styles.ratingDisplay}>
              <MaterialCommunityIcons name="star" size={20} color="#FFA500" />
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.rateButton}
              onPress={() =>
                navigation.navigate('RateConsultation', { id: item.id })
              }
            >
              <Text style={styles.rateButtonText}>Rate Consultation</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {['all', 'scheduled', 'completed'].map((filterType) => (
          <TouchableOpacity
            key={filterType}
            style={[
              styles.filterButton,
              filter === filterType && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(filterType as typeof filter)}
          >
            <Text
              style={[
                styles.filterText,
                filter === filterType && styles.filterTextActive,
              ]}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#FFA500" />
      ) : (
        <FlatList
          data={consultations.filter(
            (consultation) =>
              filter === 'all' || consultation.status === filter
          )}
          renderItem={renderConsultationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 4,
  },
  filterButtonActive: {
    backgroundColor: '#FFF3E0',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  filterTextActive: {
    color: '#FFA500',
    fontWeight: '600',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  consultationCard: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  astrologerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  astrologerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  astrologerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  consultationType: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
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
  ratingContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
    marginTop: 16,
    alignItems: 'flex-end',
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFA500',
    marginLeft: 4,
  },
  rateButton: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rateButtonText: {
    color: '#FFA500',
    fontSize: 14,
    fontWeight: '600',
  },
}); 
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { PLACEHOLDER_IMAGES } from '../../constants/images';

interface BirthChartStorageProps {
  navigation: NavigationProp<any>;
}

interface BirthChart {
  id: string;
  name: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  chartType: 'vedic' | 'kp' | 'western';
  createdAt: string;
  chartImage: string;
  notes?: string;
}

export default function BirthChartStorage({ navigation }: BirthChartStorageProps) {
  const [charts, setCharts] = useState<BirthChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCharts();
  }, []);

  const fetchCharts = async () => {
    try {
      const response = await fetch('https://your-api.com/user/birth-charts');
      const data = await response.json();
      setCharts(data);
    } catch (error) {
      console.error('Error fetching birth charts:', error);
      Alert.alert('Error', 'Failed to fetch birth charts');
    } finally {
      setLoading(false);
    }
  };

  const deleteChart = async (chartId: string) => {
    try {
      await fetch(`https://your-api.com/birth-charts/${chartId}`, {
        method: 'DELETE',
      });
      setCharts(prev => prev.filter(chart => chart.id !== chartId));
    } catch (error) {
      console.error('Error deleting chart:', error);
      Alert.alert('Error', 'Failed to delete birth chart');
    }
  };

  const getChartTypeIcon = (type: BirthChart['chartType']) => {
    switch (type) {
      case 'vedic':
        return 'zodiac-aries';
      case 'kp':
        return 'star-four-points';
      case 'western':
        return 'zodiac-libra';
      default:
        return 'chart-bubble';
    }
  };

  const renderChartItem = ({ item }: { item: BirthChart }) => (
    <TouchableOpacity
      style={styles.chartCard}
      onPress={() => navigation.navigate('ChartViewer', { chart: item })}
    >
      <View style={styles.chartHeader}>
        <View style={styles.chartInfo}>
          <MaterialCommunityIcons
            name={getChartTypeIcon(item.chartType)}
            size={24}
            color="#FFA500"
          />
          <View style={styles.chartTitleContainer}>
            <Text style={styles.chartTitle}>{item.name}</Text>
            <Text style={styles.chartDate}>
              {new Date(item.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              'Delete Chart',
              'Are you sure you want to delete this birth chart?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => deleteChart(item.id),
                },
              ]
            );
          }}
        >
          <MaterialCommunityIcons name="delete" size={24} color="#FF5252" />
        </TouchableOpacity>
      </View>

      <View style={styles.chartDetails}>
        <Image
          source={item.chartImage ? { uri: item.chartImage } : PLACEHOLDER_IMAGES.chart}
          style={styles.chartImage}
        />
        <View style={styles.chartInfo}>
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Birth Date: </Text>
            {item.dateOfBirth}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Birth Time: </Text>
            {item.birthTime}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Birth Place: </Text>
            {item.birthPlace}
          </Text>
        </View>
      </View>

      {item.notes && (
        <Text style={styles.notes} numberOfLines={2}>
          {item.notes}
        </Text>
      )}

      <View style={styles.chartFooter}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            // Implement download functionality
          }}
        >
          <MaterialCommunityIcons name="download" size={20} color="#FFA500" />
          <Text style={styles.actionButtonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            // Implement share functionality
          }}
        >
          <MaterialCommunityIcons name="share-variant" size={20} color="#666" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateChart')}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#FFA500" />
        <Text style={styles.addButtonText}>Create New Birth Chart</Text>
      </TouchableOpacity>

      {charts.length > 0 ? (
        <FlatList
          data={charts}
          renderItem={renderChartItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchCharts().finally(() => setRefreshing(false));
          }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="chart-bubble"
            size={64}
            color="#666"
          />
          <Text style={styles.emptyText}>No birth charts saved</Text>
          <Text style={styles.emptySubtext}>
            Create your first birth chart to get started
          </Text>
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3E0',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: '#FFA500',
    fontWeight: '600',
    marginLeft: 8,
  },
  listContainer: {
    padding: 16,
  },
  chartCard: {
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
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chartTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  chartDate: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    padding: 8,
  },
  chartDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chartImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#666',
  },
  notes: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 
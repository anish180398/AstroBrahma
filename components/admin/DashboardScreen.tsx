import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

interface StatCard {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  time: string;
}

export default function DashboardScreen() {
  const screenWidth = Dimensions.get('window').width;

  const stats: StatCard[] = [
    {
      id: '1',
      title: 'Total Revenue',
      value: '₹1,25,000',
      change: 12.5,
      icon: 'currency-inr',
      color: '#4CAF50',
    },
    {
      id: '2',
      title: 'Active Users',
      value: '2,450',
      change: 8.2,
      icon: 'account-group',
      color: '#2196F3',
    },
    {
      id: '3',
      title: 'Consultations',
      value: '384',
      change: -2.4,
      icon: 'video',
      color: '#FFA500',
    },
    {
      id: '4',
      title: 'New Orders',
      value: '156',
      change: 5.8,
      icon: 'shopping',
      color: '#9C27B0',
    },
  ];

  const activities: RecentActivity[] = [
    {
      id: '1',
      type: 'user',
      title: 'New User Registration',
      subtitle: 'John Doe registered as a new user',
      time: '2 minutes ago',
    },
    // Add more activities
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [20, 45, 28, 80, 99, 43],
    }],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
    strokeWidth: 2,
  };

  const renderStatCard = ({ item }: { item: StatCard }) => (
    <View style={styles.statCard}>
      <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
        <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statTitle}>{item.title}</Text>
      <View style={styles.changeContainer}>
        <MaterialCommunityIcons
          name={item.change >= 0 ? 'arrow-up' : 'arrow-down'}
          size={16}
          color={item.change >= 0 ? '#4CAF50' : '#F44336'}
        />
        <Text
          style={[
            styles.changeText,
            { color: item.change >= 0 ? '#4CAF50' : '#F44336' },
          ]}
        >
          {Math.abs(item.change)}%
        </Text>
      </View>
    </View>
  );

  const renderActivity = ({ item }: { item: RecentActivity }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <MaterialCommunityIcons
          name={item.type === 'user' ? 'account' : 'shopping'}
          size={20}
          color="#fff"
        />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.activityTime}>{item.time}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <FlatList
          data={stats}
          renderItem={renderStatCard}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Revenue Trend</Text>
        <LineChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.activitiesContainer}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <FlatList
          data={activities}
          renderItem={renderActivity}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    padding: 8,
  },
  statCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  chartContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 12,
  },
  activitiesContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#666',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
}); 
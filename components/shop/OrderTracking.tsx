import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending';
  location?: string;
}

interface TrackingDetails {
  orderId: string;
  trackingId: string;
  courierName: string;
  courierContact: string;
  estimatedDelivery: string;
  currentLocation: string;
  steps: TrackingStep[];
}

export default function OrderTrackingScreen({ route }) {
  const { orderId } = route.params;
  const [tracking, setTracking] = useState<TrackingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrackingDetails();
  }, []);

  const fetchTrackingDetails = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(`https://your-api.com/orders/${orderId}/tracking`);
      const data = await response.json();
      setTracking(data);
    } catch (err) {
      console.error('Error fetching tracking details:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStepIcon = (status: TrackingStep['status']) => {
    switch (status) {
      case 'completed':
        return 'check-circle';
      case 'current':
        return 'circle-slice-8';
      default:
        return 'circle-outline';
    }
  };

  const getStepColor = (status: TrackingStep['status']) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'current':
        return '#FFA500';
      default:
        return '#ccc';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  if (!tracking) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons name="alert-circle" size={64} color="#FF5252" />
        <Text style={styles.errorText}>Failed to load tracking details</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchTrackingDetails}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Delivery Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Text style={styles.statusTitle}>Estimated Delivery</Text>
          <Text style={styles.deliveryDate}>{tracking.estimatedDelivery}</Text>
        </View>

        <View style={styles.locationInfo}>
          <MaterialCommunityIcons
            name="map-marker"
            size={24}
            color="#FFA500"
          />
          <View style={styles.locationText}>
            <Text style={styles.locationLabel}>Current Location</Text>
            <Text style={styles.locationValue}>{tracking.currentLocation}</Text>
          </View>
        </View>
      </View>

      {/* Tracking Info Card */}
      <View style={styles.trackingCard}>
        <View style={styles.trackingHeader}>
          <View>
            <Text style={styles.trackingLabel}>Tracking ID</Text>
            <Text style={styles.trackingId}>{tracking.trackingId}</Text>
          </View>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => {
              // Implement copy to clipboard
            }}
          >
            <MaterialCommunityIcons name="content-copy" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.courierInfo}>
          <Text style={styles.courierName}>{tracking.courierName}</Text>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => Linking.openURL(`tel:${tracking.courierContact}`)}
          >
            <MaterialCommunityIcons name="phone" size={20} color="#FFA500" />
            <Text style={styles.callButtonText}>Call Courier</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tracking Timeline */}
      <View style={styles.timeline}>
        {tracking.steps.map((step, index) => (
          <View key={step.id} style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <Text style={styles.timelineTime}>
                {new Date(step.timestamp).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </Text>
              <Text style={styles.timelineDate}>
                {new Date(step.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>

            <View style={styles.timelineCenter}>
              <View
                style={[
                  styles.timelineLine,
                  index === 0 && styles.timelineFirstLine,
                  index === tracking.steps.length - 1 && styles.timelineLastLine,
                  { backgroundColor: getStepColor(step.status) },
                ]}
              />
              <View
                style={[
                  styles.timelineDot,
                  { backgroundColor: getStepColor(step.status) },
                ]}
              >
                <MaterialCommunityIcons
                  name={getStepIcon(step.status)}
                  size={16}
                  color="#fff"
                />
              </View>
            </View>

            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>{step.title}</Text>
              <Text style={styles.timelineDescription}>{step.description}</Text>
              {step.location && (
                <Text style={styles.timelineLocation}>{step.location}</Text>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Support Section */}
      <View style={styles.supportSection}>
        <Text style={styles.supportTitle}>Need Help?</Text>
        <TouchableOpacity
          style={styles.supportButton}
          onPress={() => {
            // Navigate to support screen
          }}
        >
          <MaterialCommunityIcons name="headphones" size={24} color="#666" />
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  statusHeader: {
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  deliveryDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationText: {
    flex: 1,
    marginLeft: 12,
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 14,
    color: '#333',
  },
  trackingCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  trackingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trackingLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  trackingId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  copyButton: {
    padding: 8,
  },
  courierInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courierName: {
    fontSize: 14,
    color: '#666',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  callButtonText: {
    fontSize: 14,
    color: '#FFA500',
    marginLeft: 4,
  },
  timeline: {
    padding: 16,
    paddingTop: 0,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineLeft: {
    width: 80,
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  timelineTime: {
    fontSize: 12,
    color: '#666',
  },
  timelineDate: {
    fontSize: 12,
    color: '#666',
  },
  timelineCenter: {
    width: 24,
    alignItems: 'center',
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#ccc',
  },
  timelineFirstLine: {
    top: 12,
  },
  timelineLastLine: {
    bottom: 12,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 24,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timelineLocation: {
    fontSize: 12,
    color: '#666',
  },
  supportSection: {
    padding: 16,
    alignItems: 'center',
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  supportButtonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});
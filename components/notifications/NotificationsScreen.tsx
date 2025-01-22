import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Notification {
  id: string;
  type: 'appointment' | 'payment' | 'promotion' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionable?: boolean;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Upcoming Consultation',
      message: 'Your consultation with Dr. Sharma is scheduled for tomorrow at 10:00 AM',
      time: '2 hours ago',
      read: false,
      actionable: true,
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Successful',
      message: 'Payment of ₹1,999 for consultation has been received',
      time: '1 day ago',
      read: true,
    },
    {
      id: '3',
      type: 'promotion',
      title: 'Special Offer!',
      message: 'Get 20% off on your next consultation booking',
      time: '2 days ago',
      read: false,
      actionable: true,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'calendar-clock';
      case 'payment':
        return 'credit-card-check';
      case 'promotion':
        return 'tag';
      default:
        return 'bell';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.unreadCard]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={[styles.iconContainer, styles[`${item.type}Icon`]]}>
        <MaterialCommunityIcons
          name={getNotificationIcon(item.type)}
          size={24}
          color="#fff"
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
        {item.actionable && (
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  unreadCard: {
    backgroundColor: '#FFF8E7',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentIcon: {
    backgroundColor: '#4CAF50',
  },
  paymentIcon: {
    backgroundColor: '#2196F3',
  },
  promotionIcon: {
    backgroundColor: '#FFA500',
  },
  systemIcon: {
    backgroundColor: '#9C27B0',
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  message: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionContainer: {
    marginTop: 12,
  },
  actionButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFA500',
    position: 'absolute',
    top: 16,
    right: 16,
  },
}); 
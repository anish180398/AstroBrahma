import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Appointment {
  id: number;
  customerName: string;
  time: string;
  duration: string;
  type: 'video' | 'chat';
  status: 'upcoming' | 'ongoing' | 'completed';
}

const appointments: Appointment[] = [
  {
    id: 1,
    customerName: 'John Doe',
    time: '10:30 AM',
    duration: '30 mins',
    type: 'video',
    status: 'upcoming',
  },
  // Add more appointments
];

export default function AppointmentsList() {
  const renderAppointment = ({ item }: { item: Appointment }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.appointmentTime}>{item.time} • {item.duration}</Text>
        </View>
        <MaterialCommunityIcons
          name={item.type === 'video' ? 'video' : 'chat'}
          size={24}
          color="#FFA500"
        />
      </View>
      <View style={styles.cardFooter}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status).bg }
        ]}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor(item.status).text }
          ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
        <View style={styles.actions}>
          {item.status === 'upcoming' && (
            <>
              <TouchableOpacity style={[styles.actionButton, styles.startButton]}>
                <Text style={styles.actionButtonText}>Start</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.rescheduleButton]}>
                <Text style={[styles.actionButtonText, { color: '#666' }]}>Reschedule</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return { bg: '#FFF3E0', text: '#FFA500' };
      case 'ongoing':
        return { bg: '#E8F5E9', text: '#4CAF50' };
      case 'completed':
        return { bg: '#E3F2FD', text: '#2196F3' };
      default:
        return { bg: '#f5f5f5', text: '#666' };
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  startButton: {
    backgroundColor: '#FFA500',
  },
  rescheduleButton: {
    backgroundColor: '#f5f5f5',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
}); 
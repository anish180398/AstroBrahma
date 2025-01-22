import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export default function BookingScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notes, setNotes] = useState('');

  const timeSlots: TimeSlot[] = [
    { id: '1', time: '10:00 AM', available: true },
    { id: '2', time: '11:00 AM', available: true },
    { id: '3', time: '12:00 PM', available: false },
    { id: '4', time: '2:00 PM', available: true },
    { id: '5', time: '3:00 PM', available: true },
    { id: '6', time: '4:00 PM', available: true },
  ];

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const renderTimeSlot = (slot: TimeSlot) => (
    <TouchableOpacity
      key={slot.id}
      style={[
        styles.timeSlot,
        selectedSlot === slot.id && styles.selectedSlot,
        !slot.available && styles.unavailableSlot,
      ]}
      onPress={() => slot.available && setSelectedSlot(slot.id)}
      disabled={!slot.available}
    >
      <Text
        style={[
          styles.timeSlotText,
          selectedSlot === slot.id && styles.selectedSlotText,
          !slot.available && styles.unavailableSlotText,
        ]}
      >
        {slot.time}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Consultation</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <TouchableOpacity
          style={styles.dateSelector}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialCommunityIcons name="calendar" size={24} color="#FFA500" />
          <Text style={styles.dateText}>
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map(renderTimeSlot)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Consultation Details</Text>
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="account" size={24} color="#666" />
            <Text style={styles.detailText}>Dr. Sharma</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="video" size={24} color="#666" />
            <Text style={styles.detailText}>Video Consultation</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="#666" />
            <Text style={styles.detailText}>45 minutes</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="currency-inr" size={24} color="#666" />
            <Text style={styles.detailText}>₹1,999</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any specific questions or concerns..."
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity
        style={[styles.bookButton, !selectedSlot && styles.bookButtonDisabled]}
        disabled={!selectedSlot}
      >
        <Text style={styles.bookButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFA500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  timeSlot: {
    width: '30%',
    margin: '1.5%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  selectedSlot: {
    backgroundColor: '#FFA500',
  },
  unavailableSlot: {
    backgroundColor: '#f0f0f0',
    opacity: 0.6,
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSlotText: {
    color: '#fff',
    fontWeight: '600',
  },
  unavailableSlotText: {
    color: '#999',
  },
  detailsCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  notesInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
  },
  bookButton: {
    backgroundColor: '#FFA500',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
}); 
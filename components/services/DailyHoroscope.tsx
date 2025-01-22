import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ZodiacSign {
  name: string;
  date: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const zodiacSigns: ZodiacSign[] = [
  { name: 'Aries', date: 'Mar 21 - Apr 19', icon: 'zodiac-aries' },
  { name: 'Taurus', date: 'Apr 20 - May 20', icon: 'zodiac-taurus' },
  { name: 'Gemini', date: 'May 21 - Jun 20', icon: 'zodiac-gemini' },
  { name: 'Cancer', date: 'Jun 21 - Jul 22', icon: 'zodiac-cancer' },
  { name: 'Leo', date: 'Jul 23 - Aug 22', icon: 'zodiac-leo' },
  { name: 'Virgo', date: 'Aug 23 - Sep 22', icon: 'zodiac-virgo' },
  { name: 'Libra', date: 'Sep 23 - Oct 22', icon: 'zodiac-libra' },
  { name: 'Scorpio', date: 'Oct 23 - Nov 21', icon: 'zodiac-scorpio' },
  { name: 'Sagittarius', date: 'Nov 22 - Dec 21', icon: 'zodiac-sagittarius' },
  { name: 'Capricorn', date: 'Dec 22 - Jan 19', icon: 'zodiac-capricorn' },
  { name: 'Aquarius', date: 'Jan 20 - Feb 18', icon: 'zodiac-aquarius' },
  { name: 'Pisces', date: 'Feb 19 - Mar 20', icon: 'zodiac-pisces' },
];

interface HoroscopeData {
  prediction: string;
  lucky_number: string;
  lucky_color: string;
  mood: string;
}

export default function DailyHoroscope() {
  const [selectedSign, setSelectedSign] = useState<string>('Aries');
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchHoroscope(selectedSign);
  }, [selectedSign]);

  const fetchHoroscope = async (sign: string) => {
    setLoading(true);
    try {
      // Simulated API response for now
      const mockHoroscope: HoroscopeData = {
        prediction: "Today brings exciting opportunities for personal growth. Trust your intuition and take calculated risks. Your creative energy is at its peak.",
        lucky_number: "7",
        lucky_color: "Blue",
        mood: "Optimistic"
      };
      
      setTimeout(() => {
        setHoroscope(mockHoroscope);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching horoscope:', error);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Horoscope</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.signsScroll}
      >
        {zodiacSigns.map((sign) => (
          <TouchableOpacity
            key={sign.name}
            style={[
              styles.signCard,
              selectedSign === sign.name && styles.selectedSignCard,
            ]}
            onPress={() => setSelectedSign(sign.name)}
          >
            <MaterialCommunityIcons
              name={sign.icon}
              size={32}
              color={selectedSign === sign.name ? '#FFA500' : '#666'}
            />
            <Text
              style={[
                styles.signName,
                selectedSign === sign.name && styles.selectedSignText,
              ]}
            >
              {sign.name}
            </Text>
            <Text
              style={[
                styles.signDate,
                selectedSign === sign.name && styles.selectedSignText,
              ]}
            >
              {sign.date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.horoscopeCard}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFA500" />
        ) : (
          horoscope && (
            <>
              <Text style={styles.prediction}>{horoscope.prediction}</Text>
              
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <MaterialCommunityIcons name="numeric" size={24} color="#FFA500" />
                  <View>
                    <Text style={styles.detailLabel}>Lucky Number</Text>
                    <Text style={styles.detailValue}>{horoscope.lucky_number}</Text>
                  </View>
                </View>

                <View style={styles.detailItem}>
                  <MaterialCommunityIcons name="palette" size={24} color="#FFA500" />
                  <View>
                    <Text style={styles.detailLabel}>Lucky Color</Text>
                    <Text style={styles.detailValue}>{horoscope.lucky_color}</Text>
                  </View>
                </View>

                <View style={styles.detailItem}>
                  <MaterialCommunityIcons name="emoticon" size={24} color="#FFA500" />
                  <View>
                    <Text style={styles.detailLabel}>Mood</Text>
                    <Text style={styles.detailValue}>{horoscope.mood}</Text>
                  </View>
                </View>
              </View>
            </>
          )
        )}
      </View>
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
  date: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  signsScroll: {
    padding: 16,
  },
  signCard: {
    alignItems: 'center',
    padding: 12,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    width: 100,
  },
  selectedSignCard: {
    backgroundColor: '#FFF3E0',
  },
  signName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  signDate: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  selectedSignText: {
    color: '#FFA500',
  },
  horoscopeCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 200,
    justifyContent: 'center',
  },
  prediction: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
}); 
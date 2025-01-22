import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CallControls {
  video: boolean;
  audio: boolean;
  speaker: boolean;
}

export default function VideoCall() {
  const [controls, setControls] = useState<CallControls>({
    video: true,
    audio: true,
    speaker: true,
  });
  const [callDuration, setCallDuration] = useState('00:00');

  const toggleControl = (control: keyof CallControls) => {
    setControls(prev => ({
      ...prev,
      [control]: !prev[control],
    }));
  };

  return (
    <View style={styles.container}>
      {/* Remote User's Video */}
      <View style={styles.remoteVideo}>
        <Text style={styles.remoteUserName}>Dr. Sharma</Text>
        <View style={styles.callTimer}>
          <MaterialCommunityIcons name="clock-outline" size={16} color="#fff" />
          <Text style={styles.timerText}>{callDuration}</Text>
        </View>
      </View>

      {/* Local User's Video */}
      <View style={styles.localVideo}>
        <MaterialCommunityIcons 
          name="account"
          size={24}
          color="#fff"
          style={styles.localVideoIcon}
        />
      </View>

      {/* Call Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.controlButton, !controls.audio && styles.controlButtonOff]}
            onPress={() => toggleControl('audio')}
          >
            <MaterialCommunityIcons
              name={controls.audio ? 'microphone' : 'microphone-off'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.endCallButton]}
            onPress={() => {/* Handle end call */}}
          >
            <MaterialCommunityIcons name="phone-hangup" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, !controls.video && styles.controlButtonOff]}
            onPress={() => toggleControl('video')}
          >
            <MaterialCommunityIcons
              name={controls.video ? 'video' : 'video-off'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.secondaryControls}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => toggleControl('speaker')}
          >
            <MaterialCommunityIcons
              name={controls.speaker ? 'volume-high' : 'volume-off'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <MaterialCommunityIcons name="camera-flip" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <MaterialCommunityIcons name="chat" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  remoteVideo: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  remoteUserName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  callTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timerText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
  },
  localVideo: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 100,
    height: 150,
    backgroundColor: '#666',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  localVideoIcon: {
    opacity: 0.7,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  controlButtonOff: {
    backgroundColor: '#ff4444',
  },
  endCallButton: {
    backgroundColor: '#ff4444',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
}); 
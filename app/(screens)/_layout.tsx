import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
        }} 
      />
      <Stack.Screen 
        name="services" 
        options={{ 
          title: 'Services',
        }} 
      />
      <Stack.Screen 
        name="astrology" 
        options={{ 
          title: 'Astrology',
        }} 
      />
      <Stack.Screen 
        name="chat-detail" 
        options={{ 
          title: 'Chat',
        }} 
      />
      <Stack.Screen 
        name="daily" 
        options={{ 
          title: 'Daily',
        }} 
      />
      <Stack.Screen 
        name="live-stream" 
        options={{ 
          title: 'Live Stream',
        }} 
      />
    </Stack>
  );
} 
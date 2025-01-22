import { Stack } from 'expo-router';

export default function AstrologersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="astrologersList"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="astrologersProfile"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 
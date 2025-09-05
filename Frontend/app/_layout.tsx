import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "./global.css"; // Import NativeWind global styles
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Set a global background color for the app */}
      <View className="flex-1 bg-background-dark">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="light" />
      </View>
    </SafeAreaProvider>
  );
}
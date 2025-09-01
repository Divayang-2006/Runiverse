import './global.css';
import { useColorScheme } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      {/* Any global providers would go here */}
      <Slot />
    </SafeAreaProvider>
  );
}
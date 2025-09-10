import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router'; // --- 1. Import useRouter ---
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const router = useRouter(); // --- 2. Get the router instance ---

  // --- 3. Create the function to handle login ---
  const handleLogin = () => {
    // TODO: Add your real authentication logic here (e.g., API call)
    
    // For now, we'll just navigate to the main app screen
    router.replace('/(tabs)'); 
  };

  const bgClass = isDarkMode ? "bg-background-dark" : "bg-gray-100";
  const textClass = isDarkMode ? "text-text-primary" : "text-gray-900";
  const secondaryTextClass = isDarkMode ? "text-text-secondary" : "text-gray-500";
  const inputBgClass = isDarkMode ? "bg-card-dark" : "bg-gray-200";
  const inputTextClass = isDarkMode ? "text-white" : "text-black";
  const iconColor = isDarkMode ? "white" : "black";

  return (
    <SafeAreaView className={`flex-1 ${bgClass}`}>
      <View className="px-6 py-4">
        <Link href="/index" asChild>
          <TouchableOpacity className="p-2 self-start">
            <Ionicons name="arrow-back" size={28} color={iconColor} />
          </TouchableOpacity>
        </Link>
      </View>
      
      <View className="flex-1 justify-center p-6">
        <Text className={`text-4xl font-bold mb-2 ${textClass}`}>Welcome Back!</Text>
        <Text className={`text-lg mb-8 ${secondaryTextClass}`}>Log in to continue your journey.</Text>

        {/* Email Input */}
        <View className={`rounded-xl mb-4 ${inputBgClass}`}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor={isDarkMode ? '#A9A9A9' : '#6B7280'}
            className={`p-4 text-base ${inputTextClass}`}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View className={`rounded-xl mb-6 ${inputBgClass}`}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={isDarkMode ? '#A9A9A9' : '#6B7280'}
            className={`p-4 text-base ${inputTextClass}`}
            secureTextEntry
          />
        </View>

        {/* --- 4. Attach the handleLogin function to the button --- */}
        <TouchableOpacity 
          onPress={handleLogin} 
          className="bg-primary-green p-4 rounded-xl items-center justify-center shadow-md"
        >
          <Text className="text-black text-lg font-bold">Log In</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className={`text-base ${secondaryTextClass}`}>Don't have an account? </Text>
          <Link href="/register">
            <Text className="text-primary-green font-bold text-base">Sign Up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
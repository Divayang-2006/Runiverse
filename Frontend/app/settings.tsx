import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const bgClass = isDarkMode ? "bg-background-dark" : "bg-gray-100";
  const textClass = isDarkMode ? "text-text-primary" : "text-gray-900";
  const cardBgClass = isDarkMode ? "bg-card-dark" : "bg-white";

  return (
    <SafeAreaView className={`flex-1 ${bgClass}`}>
      <View className="flex-row justify-between items-center px-6 py-4">
        <Link href="/(tabs)/profile" asChild>
          <TouchableOpacity className="p-2">
            <Ionicons name="arrow-back" size={28} color={isDarkMode ? 'white' : 'black'} />
          </TouchableOpacity>
        </Link>
        <Text className={`text-2xl font-bold ${textClass}`}>Settings</Text>
        <View className="w-8" />
      </View>

      <View className="flex-1 p-6">
        <View className={`rounded-xl p-6 shadow-md ${cardBgClass} mb-6`}>
          <Text className={`text-xl font-semibold mb-4 ${textClass}`}>App Theme</Text>
          <TouchableOpacity
            onPress={toggleTheme}
            className={`flex-row items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          >
            <View className="flex-row items-center">
              <Ionicons 
                name={isDarkMode ? 'moon' : 'sunny'} 
                size={24} 
                color={isDarkMode ? 'white' : 'orange'} 
                className="mr-3" 
              />
              <Text className={`text-lg font-medium ${textClass}`}>
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
            <Ionicons 
              name="swap-horizontal" 
              size={24} 
              color={isDarkMode ? 'white' : 'black'} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
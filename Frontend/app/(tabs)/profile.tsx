import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const bgClass = isDarkMode ? "bg-background-dark" : "bg-gray-100";
  const textClass = isDarkMode ? "text-text-primary" : "text-gray-900";
  const secondaryTextClass = isDarkMode ? "text-text-secondary" : "text-gray-600";
  const cardBgClass = isDarkMode ? "bg-card-dark" : "bg-white";
  const iconColor = isDarkMode ? "white" : "black";

  return (
    <SafeAreaView className={`flex-1 ${bgClass}`}>
      <View className="flex-1 p-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className={`text-3xl font-bold ${textClass}`}>Profile</Text>
          <Link href="/settings" asChild>
            <TouchableOpacity className="p-2 rounded-full">
              <Ionicons name="settings-outline" size={28} color={iconColor} />
            </TouchableOpacity>
          </Link>
        </View>

        <View className={`rounded-xl p-6 mb-6 shadow-md ${cardBgClass}`}>
          <View className="flex-row items-center">
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
              className="w-24 h-24 rounded-full mr-4 border-2 border-primary-green"
            />
            <View>
              <Text className={`text-2xl font-bold ${textClass}`}>Ronak Dev</Text>
              <Text className={`text-base ${secondaryTextClass}`}>Explorer</Text>
            </View>
          </View>
          <Text className={`mt-4 text-base ${secondaryTextClass}`}>
            "Every mile is a memory, every run a new discovery in the Runiverse."
          </Text>
        </View>

        <View className={`rounded-xl shadow-md ${cardBgClass}`}>
          <ProfileOption icon="trophy" text="My Achievements" isDarkMode={isDarkMode} />
          <ProfileOption icon="route" text="Route History" isDarkMode={isDarkMode} />
          <ProfileOption icon="user-friends" text="Friends & Community" isDarkMode={isDarkMode} />
        </View>
      </View>
    </SafeAreaView>
  );
};

interface ProfileOptionProps {
  icon: keyof typeof FontAwesome5.glyphMap;
  text: string;
  isDarkMode: boolean;
}

const ProfileOption = ({ icon, text, isDarkMode }: ProfileOptionProps) => (
  <TouchableOpacity className={`flex-row items-center py-4 px-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} last:border-b-0`}>
    <FontAwesome5 name={icon} size={20} color={isDarkMode ? '#FFFFFF' : '#000000'} className="mr-4" />
    <Text className={`flex-1 text-lg ${isDarkMode ? 'text-text-primary' : 'text-gray-900'}`}>{text}</Text>
    <Ionicons name="chevron-forward" size={20} color={isDarkMode ? '#A9A9A9' : '#666666'} />
  </TouchableOpacity>
);

export default ProfileScreen;
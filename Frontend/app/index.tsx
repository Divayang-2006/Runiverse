import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <View className="flex-1 p-6 justify-between">
        {/* Background Image */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b' }}
          className="absolute top-0 left-0 right-0 h-3/5"
          resizeMode="cover"
        />
        <View className="absolute top-0 left-0 right-0 h-3/5 bg-black/40" />

        {/* Spacer to push content down */}
        <View className="h-3/5" />

        {/* Content */}
        <View>
          <Text className="text-text-primary text-4xl font-bold">
            Welcome to Runiverse
          </Text>
          <Text className="text-text-secondary text-base mt-4">
            Step into the Runiverse, where every stride connects you to a global community. Track your runs, conquer virtual worlds, and challenge friends.
          </Text>
        </View>

        {/* Navigation */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row space-x-2">
            <View className="h-2 w-5 bg-primary-green rounded-full" />
            <View className="h-2 w-2 bg-text-secondary rounded-full" />
            <View className="h-2 w-2 bg-text-secondary rounded-full" />
          </View>
          <Link href="/login" asChild>
            <TouchableOpacity className="bg-primary-green h-16 w-16 rounded-full items-center justify-center">
              <FontAwesome name="arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
import { Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native'; // Using standard RN components
import { mockGroups } from '@/services/leaderboardService';
import Mapbox from "@rnmapbox/maps"
Mapbox.setAccessToken("pk.eyJ1IjoiaW1hZ2luZS14IiwiYSI6ImNtZXhnemd6ODAwZXIyanF0ZWhqM3BrM2IifQ.Leh68KuE8z7Lm70Ce60NLA");


export default function MapScreen() {

   return (
      <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
         <ScrollView>
            <View className="p-6">
               <Text className="text-3xl font-bold text-text-light dark:text-text-dark">Territories</Text>
               <Text className="text-md text-subtle-light dark:text-subtle-dark">Map view is temporarily disabled for UI testing.</Text>
            </View>

            {/* Placeholder Image */}
            <View className="px-6">
               <Image
                  source={require('@/assets/images/adaptive-icon.png')}
                  className="w-full h-96 rounded-2xl border border-border-light dark:border-border-dark"
                  resizeMode="cover"
               />
            </View>

            {/* The original UI for the legend remains for testing */}
            <View className="m-6 mt-8 bg-card-light dark:bg-card-dark p-4 rounded-2xl shadow-lg">
               <Text className="font-bold text-lg text-text-light dark:text-text-dark">Territory Legend</Text>
               {mockGroups.map(group => (
                  <View key={group.id} className="flex-row items-center mt-2">
                     <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: group.color }} />
                     <Text className="ml-2 text-text-light dark:text-text-dark">{group.name}</Text>
                  </View>
               ))}
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}
import { Image, ScrollView, StyleSheet} from 'react-native';
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native'; // Using standard RN components
import { mockGroups } from '@/services/leaderboardService';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoiaW1hZ2luZS14IiwiYSI6ImNtZXhnemd6ODAwZXIyanF0ZWhqM3BrM2IifQ.Leh68KuE8z7Lm70Ce60NLA');



export default function MapScreen() {
   const INITIAL_COORD = { lng: 72.6369, lat: 23.2156 }
   useEffect(() => {
      // Optional: any runtime checks or telemetry disable
      Mapbox.setTelemetryEnabled(false);
   }, []);

   return (
      <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
         <ScrollView>
            <View className="p-6">
               <Text className="text-3xl font-bold text-text-light dark:text-text-dark">Territories</Text>
               <Text className="text-md text-subtle-light dark:text-subtle-dark">Map view is temporarily disabled for UI testing.</Text>
            </View>


            <View style={styles.page}>
               <View style={styles.container}>
                  <Mapbox.MapView style={styles.map} />
               </View>
            </View>
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

const styles = StyleSheet.create({
   page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   container: {
      height: 300,
      width: 300,
   },
   map: {
      flex: 1
   }
});
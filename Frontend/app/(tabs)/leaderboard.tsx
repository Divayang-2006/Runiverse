import { StyledText, StyledView } from "@/components/Styled";
import { mockLeaderboard } from "@/services/leaderboardService";
import { useStore } from "@/store/useStore";
import { ArrowDown, ArrowUp } from "lucide-react-native";
import { FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LeaderboardScreen() {
   const myUserId = useStore(state => state.user?.id); // Assuming we'll match by name for now

   return (
      <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
         <StyledView className="p-6">
            <StyledText className="text-3xl font-bold text-text-light dark:text-text-dark">Leaderboard</StyledText>
         </StyledView>
         <FlatList
            data={mockLeaderboard}
            keyExtractor={(item) => item.rank.toString()}
            renderItem={({ item }) => (
               <StyledView className={`flex-row items-center p-4 mx-4 mb-2 rounded-2xl ${item.name === 'PlayerOne' ? 'bg-primary-light' : 'bg-card-light dark:bg-card-dark'}`}>
                  <StyledText className="text-lg font-bold w-8 text-subtle-light dark:text-subtle-dark">{item.rank}</StyledText>
                  <Image source={{ uri: item.avatarUrl }} className="w-12 h-12 rounded-full" />
                  <StyledView className="flex-1 ml-4">
                     <StyledText className="text-lg font-semibold text-text-light dark:text-text-dark">{item.name}</StyledText>
                     <StyledText className="text-sm text-subtle-light dark:text-subtle-dark">{(item.distance / 1000).toFixed(1)} km</StyledText>
                  </StyledView>
                  {item.trend === 'up' && <ArrowUp color="#3CB371" />}
                  {item.trend === 'down' && <ArrowDown color="#DC143C" />}
               </StyledView>
            )}
         />
      </SafeAreaView>
   );
}
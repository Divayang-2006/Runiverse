import { StyledPressable, StyledText, StyledView } from "@/components/Styled";
import { useStore } from "@/store/useStore";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
   const user = useStore(state => state.user);
   const group = useStore(state => state.group);
   const stats = useStore(state => state.stats);

   return (
      <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark items-center pt-10">
         <Image source={{ uri: user?.avatarUrl }} className="w-32 h-32 rounded-full border-4 border-primary" />
         <StyledText className="text-3xl font-bold mt-4 text-text-light dark:text-text-dark">{user?.username}</StyledText>
         {group && (
            <StyledView className="flex-row items-center mt-2 bg-primary-light px-4 py-1 rounded-full">
               <StyledView className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: group.color }} />
               <StyledText className="text-primary-dark font-semibold">{group.name}</StyledText>
            </StyledView>
         )}

         <StyledView className="bg-card-light dark:bg-card-dark w-11/12 p-4 rounded-2xl mt-8">
            <StyledText className="text-xl font-bold text-text-light dark:text-text-dark">Lifetime Stats</StyledText>
            <StyledText className="mt-2 text-subtle-light dark:text-subtle-dark">Total Distance: {(stats.totalDistance / 1000).toFixed(1)} km</StyledText>
            <StyledText className="mt-1 text-subtle-light dark:text-subtle-dark">Total Steps: {stats.totalSteps.toLocaleString()}</StyledText>
            <StyledText className="mt-1 text-subtle-light dark:text-subtle-dark">Current Streak: {stats.currentStreak} days 🔥</StyledText>
         </StyledView>

         <StyledPressable className="bg-secondary w-11/12 p-4 rounded-2xl mt-4">
            <StyledText className="text-white text-center font-bold text-lg">Settings</StyledText>
         </StyledPressable>
      </SafeAreaView>
   );
}
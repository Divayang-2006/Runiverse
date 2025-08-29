import { StyledPressable, StyledText, StyledView } from "@/components/Styled";
import { StatCard } from "@/components/StatCard";
// import { locationService } from "@/services/locationService";
import { useStore } from "@/store/useStore";
import { Footprints, MapPin, Flame } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatDistance = (meters: number) => (meters / 1000).toFixed(2);

export default function Index() {
   const session = useStore(state => state.session);
   const stats = useStore(state => state.stats);

   const handleToggleWalk = () => {
      if (session.isActive) {
         // locationService.stopTracking();
      } else {
         // locationService.startMockTracking();
      }
   };

   return (
      <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
         <StyledView className="p-6">
            <StyledText className="text-3xl font-bold text-text-light dark:text-text-dark">Good Morning, PlayerOne!</StyledText>
            <StyledText className="text-md text-subtle-light dark:text-subtle-dark">Today is a great day to explore.</StyledText>

            <StyledView className="flex-row space-x-4 mt-6">
               <StatCard icon={Footprints} label="Steps" value={session.isActive ? session.steps.toString() : stats.totalSteps.toLocaleString()} />
               <StatCard icon={MapPin} label="Distance (km)" value={session.isActive ? formatDistance(session.distance) : formatDistance(stats.totalDistance)} />
               <StatCard icon={Flame} label="Calories" value={session.isActive ? Math.round(session.calories).toString() : stats.totalCalories.toLocaleString()} />
            </StyledView>

            <StyledView className="mt-8 items-center">
               <StyledPressable
                  className={`w-48 h-48 rounded-full items-center justify-center shadow-lg ${session.isActive ? 'bg-danger' : 'bg-primary'}`}
                  onPress={handleToggleWalk}
               >
                  <StyledText className="text-white text-3xl font-bold">{session.isActive ? "STOP" : "START"}</StyledText>
               </StyledPressable>
               {session.isActive && (
                  <StyledText className="text-lg text-subtle-light dark:text-subtle-dark mt-4">
                     Time: {new Date(session.elapsedTime * 1000).toISOString().substr(11, 8)}
                  </StyledText>
               )}
            </StyledView>
         </StyledView>
      </SafeAreaView>
   );
}
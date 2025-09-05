import { ChallengeCard } from "@/components/ChallengeCard";
import { StyledText, StyledView } from "@/components/Styled";
import { useStore } from "@/store/useStore";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Challenges() {
  const challenges = useStore(state => state.challenges);
  const badges = useStore(state => state.badges);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <StyledText className="text-3xl font-bold text-text-light dark:text-text-dark">Challenges & Badges</StyledText>
        
        <StyledText className="text-xl font-bold mt-6 mb-2 text-text-light dark:text-text-dark">Active Challenges</StyledText>
        {challenges.filter(c => !c.isCompleted).map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}

        <StyledText className="text-xl font-bold mt-6 mb-2 text-text-light dark:text-text-dark">Earned Badges</StyledText>
        <StyledView className="flex-row flex-wrap">
            {badges.filter(b => b.earnedOn).map(badge => (
                <StyledView key={badge.id} className="p-4 m-1 items-center bg-card-light dark:bg-card-dark rounded-2xl w-24">
                    <StyledText className="text-3xl">🏅</StyledText>
                    <StyledText className="text-xs text-center mt-1 text-text-light dark:text-text-dark">{badge.name}</StyledText>
                </StyledView>
            ))}
        </StyledView>

      </ScrollView>
    </SafeAreaView>
  );
}
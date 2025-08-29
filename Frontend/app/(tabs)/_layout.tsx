// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Home, Map, Trophy, Shield, User } from "lucide-react-native";
import { useColorScheme } from "react-native";

const TAB_ICON_SIZE = 28;

export default function TabLayout() {
   const colorScheme = useColorScheme();
   const activeColor = colorScheme === "dark" ? "#FFF" : "#000";
   const inactiveColor = colorScheme === "dark" ? "#9CA3AF" : "#6C757D";

   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: activeColor,
            tabBarInactiveTintColor: inactiveColor,
            tabBarStyle: {
               backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#FFFFFF",
               borderTopColor: colorScheme === "dark" ? "#374151" : "#DEE2E6",
            },
            headerShown: false,
         }}
      >
         <Tabs.Screen
            name="index"
            options={{
               title: "Home",
               tabBarIcon: ({ color }) => <Home color={color} size={TAB_ICON_SIZE} />,
            }}
         />
         <Tabs.Screen
            name="map"
            options={{
               title: "Map",
               tabBarIcon: ({ color }) => <Map color={color} size={TAB_ICON_SIZE} />,
            }}
         />
         <Tabs.Screen
            name="leaderboard"
            options={{
               title: "Leaders",
               tabBarIcon: ({ color }) => <Trophy color={color} size={TAB_ICON_SIZE} />,
            }}
         />
         <Tabs.Screen
            name="challenges"
            options={{
               title: "Challenges",
               tabBarIcon: ({ color }) => <Shield color={color} size={TAB_ICON_SIZE} />,
            }}
         />
         <Tabs.Screen
            name="profile"
            options={{
               title: "Profile",
               tabBarIcon: ({ color }) => <User color={color} size={TAB_ICON_SIZE} />,
            }}
         />
      </Tabs>
   );
}

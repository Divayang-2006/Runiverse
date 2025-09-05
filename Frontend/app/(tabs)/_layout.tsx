// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Home, Map, Trophy, Shield, User } from "lucide-react-native";

const TAB_ICON_SIZE = 28;

export default function TabLayout() {
   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: '#A8E063', // primary-green
            tabBarInactiveTintColor: '#8E8E93', // text-secondary
            tabBarStyle: {
               backgroundColor: '#1C1C1E', // background-dark
               borderTopWidth: 0,
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

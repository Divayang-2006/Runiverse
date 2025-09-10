import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import Mapbox, { Camera, MapView, UserLocation, ShapeSource, LineLayer, FillLayer } from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { useTheme } from '../../context/ThemeContext'; // 1. Import useTheme
import { FontAwesome5 } from '@expo/vector-icons';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiaW1hZ2luZS14IiwiYSI6ImNtZXhnemd6ODAwZXIyanF0ZWhqM3BrM2IifQ.Leh68KuE8z7Lm70Ce60NLA'
);

export default function MapScreen() {
  const { theme } = useTheme(); // 2. Get the current theme
  const isDarkMode = theme === 'dark';

  // 3. Define dynamic styles and classes
  const bgClass = isDarkMode ? "bg-background-dark" : "bg-gray-100";
  const textClass = isDarkMode ? "text-text-primary" : "text-gray-900";
  const cardBgClass = isDarkMode ? "bg-card-dark" : "bg-white";
  const mapStyle = isDarkMode ? Mapbox.StyleURL.Dark : Mapbox.StyleURL.Street;
  const territoryColor = isDarkMode ? "rgba(52, 211, 153, 0.4)" : "rgba(239, 68, 68, 0.4)"; // Green for dark, Red for light
  const territoryOutlineColor = isDarkMode ? "#34D399" : "#EF4444";
  const routeColor = isDarkMode ? "#34D399" : "#3B82F6"; // Green for dark, Blue for light

  const [locationGranted, setLocationGranted] = useState(false);
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [territories, setTerritories] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      setLocationGranted(true);

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        (loc) => {
          const coords: [number, number] = [loc.coords.longitude, loc.coords.latitude];
          setLocation(coords);
          setRoute((prev) => {
            const newPath = [...prev, coords];
            if (isClosedLoop(newPath)) {
              setTerritories((prevTerritories) => [
                ...prevTerritories,
                {
                  type: "Feature",
                  geometry: {
                    type: "Polygon",
                    coordinates: [[...newPath, newPath[0]]],
                  },
                },
              ]);
              return []; // Reset route
            }
            return newPath;
          });
        }
      );
    })();
  }, []);

  const isClosedLoop = (points: [number, number][]) => {
    if (points.length < 4) return false;
    const [lng1, lat1] = points[0];
    const [lng2, lat2] = points[points.length - 1];
    const dist = Math.sqrt((lng2 - lng1) ** 2 + (lat2 - lat1) ** 2);
    return dist < 0.0005; // ~50m tolerance
  };

  if (!locationGranted) {
    // You can show a loading or permission request screen here
    return (
        <SafeAreaView className={`flex-1 items-center justify-center ${bgClass}`}>
            <Text className={textClass}>Requesting location permission...</Text>
        </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${bgClass}`}>
      <View className="flex-1">
        <MapView style={{ flex: 1 }} styleURL={mapStyle}>
          <Camera followUserLocation followZoomLevel={16} />
          <UserLocation visible={true} showsUserHeadingIndicator={true} />

          {route.length > 1 && (
            <ShapeSource id="routeSource" shape={{ type: "Feature", geometry: { type: "LineString", coordinates: route } }}>
              <LineLayer id="routeLine" style={{ lineColor: routeColor, lineWidth: 5, lineCap: 'round', lineJoin: 'round' }} />
            </ShapeSource>
          )}

          {territories.map((territory, index) => (
            <ShapeSource key={`territory-${index}`} id={`territory-${index}`} shape={territory}>
              <FillLayer id={`territory-fill-${index}`} style={{ fillColor: territoryColor, fillOutlineColor: territoryOutlineColor }} />
            </ShapeSource>
          ))}
        </MapView>

        {/* --- UI OVERLAYS --- */}
        <View className={`absolute top-6 left-6 right-6 p-4 rounded-2xl shadow-lg ${cardBgClass}`}>
            <Text className={`text-lg font-bold ${textClass}`}>Live Run</Text>
            <Text className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                {route.length} points tracked.
            </Text>
        </View>

        <TouchableOpacity className="absolute bottom-6 right-6 bg-primary-green h-16 w-16 rounded-full items-center justify-center shadow-lg">
            <FontAwesome5 name="running" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
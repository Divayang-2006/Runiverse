import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import Mapbox, { Camera, MapView, UserLocation, ShapeSource, LineLayer, FillLayer } from '@rnmapbox/maps';
import * as Location from 'expo-location';
import customMAP from '@/assets/Map_Json/customStyle.json';

Mapbox.setAccessToken(
   'pk.eyJ1IjoiaW1hZ2luZS14IiwiYSI6ImNtZXhnemd6ODAwZXIyanF0ZWhqM3BrM2IifQ.Leh68KuE8z7Lm70Ce60NLA'
);

// Demo path: Gandhinagar landmarks
const gandhinagarRoute: [number, number][] = [
   [72.6369, 23.2156], // Akshardham Temple
   [72.6425, 23.2101],
   [72.6480, 23.2050],
   [72.6517, 23.1902], // Infocity
   [72.6565, 23.2239], // Mahatma Mandir
   [72.6815, 23.2231], // Railway Station
];


export default function MapScreen() {
   const [locationGranted, setLocationGranted] = useState(false);
   const [location, setLocation] = useState<[number, number] | null>(null);
   const [route, setRoute] = useState<[number, number][]>([]);
   const [territories, setTerritories] = useState<any[]>([]);

   useEffect(() => {
      (async () => {
         let { status } = await Location.requestForegroundPermissionsAsync();
         if (status === "granted") {
            setLocationGranted(true);
         } else {
            alert("Permission to access location was denied");
         }
      })();
   }, []);

   const isClosedLoop = (points: [number, number][]) => {
      if (points.length < 40) return false;
      const [lng1, lat1] = points[0];
      const [lng2, lat2] = points[points.length - 1];
      const dist = Math.sqrt((lng2 - lng1) ** 2 + (lat2 - lat1) ** 2);
      return dist < 0.0005; // ~50m tolerance
   };

   useEffect(() => {
      (async () => {
         let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== "granted") {
            alert("Permission to access location was denied");
            return;
         }

         Location.watchPositionAsync(
            {
               accuracy: Location.Accuracy.High,
               timeInterval: 2000,
               distanceInterval: 5,
            },
            (loc) => {
               const coords: [number, number] = [
                  loc.coords.longitude,
                  loc.coords.latitude,
               ];
               setLocation(coords);

               setRoute((prev) => {
                  const newPath = [...prev, coords];

                  // if loop closed → mark as territory
                  if (isClosedLoop(newPath)) {
                     setTerritories((prevTerritories) => [
                        ...prevTerritories,
                        {
                           type: "Feature",
                           geometry: {
                              type: "Polygon",
                              coordinates: [[...newPath, newPath[0]]], // close polygon
                           },
                        },
                     ]);
                     return []; // reset route after claiming
                  }
                  return newPath;
               });
            }
         );
      })();
   }, []);

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <Text style={styles.title}>Gandhinagar Route</Text>
         <View style={{ flex: 1 }}>
            <MapView style={{ flex: 1 }} 
            styleJSON={JSON.stringify(customMAP)}
            // styleURL='mapbox://styles/imagine-x/cmf6z2psu000101qufhfo3hqs'
            >
               {route.length > 1 && (
                  <ShapeSource
                     id="routeSource"
                     shape={{
                        type: "Feature",
                        geometry: {
                           type: "LineString",
                           coordinates: route,
                        },
                     }}
                  >
                     <LineLayer
                        id="routeLine"
                        style={{
                           lineColor: "blue",
                           lineWidth: 4,
                        }}
                     />
                  </ShapeSource>
               )}

               {/* Show captured territories */}
               {territories.map((territory, index) => (
                  <ShapeSource key={`territory-${index}`} id={`territory-${index}`} shape={territory}>
                     <FillLayer
                        id={`territory-fill-${index}`}
                        style={{
                           fillColor: "rgba(255,0,0,0.4)", // red with transparency
                           fillOutlineColor: "red",
                        }}
                     />
                  </ShapeSource>
               ))}

               {/* Show user */}
               <UserLocation
                  visible={true}
                  showsUserHeadingIndicator={true}
                  androidRenderMode="normal"
               />
               <Camera followUserLocation followZoomLevel={15} />
            </MapView>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   title: {
      fontSize: 22,
      margin: 12,
      fontWeight: "600",
   },
});

import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import Mapbox, { Camera, MapView, UserLocation, ShapeSource, LineLayer, FillLayer, FillExtrusionLayer } from '@rnmapbox/maps';
import * as Location from 'expo-location';
import customMAP from '@/assets/Map_Json/customStyle.json';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiaW1hZ2luZS14IiwiYSI6ImNtZXhnemd6ODAwZXIyanF0ZWhqM3BrM2IifQ.Leh68KuE8z7Lm70Ce60NLA'
);
const MAPBOX_STANDARD_STYLE = "mapbox://styles/mapbox/standard-beta";

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
      setLocationGranted(true);

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

   // Enhanced custom style with 3D buildings
   // const enhance3DStyle = (baseStyle: any) => {
   //    // If baseStyle is undefined or null, use an empty object
   //    const style = baseStyle || {};
      
   //    // Ensure layers array exists
   //    if (!style.layers) {
   //       style.layers = [];
   //    }
      
   //    // Remove existing building layers to avoid conflicts
   //    style.layers = style.layers.filter((layer: any) => 
   //       !layer.id?.includes('building') && 
   //       !layer.id?.includes('3d-buildings')
   //    );
      
   //    // Add 3D buildings layer with exaggerated heights
   //    style.layers.push({
   //       id: '3d-buildings',
   //       source: 'composite',
   //       'source-layer': 'building',
   //       filter: ['==', 'extrude', 'true'],
   //       type: 'fill-extrusion',
   //       minzoom: 13,
   //       paint: {
   //          'fill-extrusion-color': [
   //             'interpolate',
   //             ['linear'],
   //             ['get', 'height'],
   //             0, '#ddd',
   //             20, '#ccc',
   //             40, '#bbb',
   //             60, '#aaa',
   //             100, '#999',
   //             200, '#888'
   //          ],
   //          'fill-extrusion-height': [
   //             'interpolate',
   //             ['linear'],
   //             ['zoom'],
   //             13, 0,
   //             13.05, ['*', ['get', 'height'], 2.5], // 2.5x height multiplier
   //             22, ['*', ['get', 'height'], 2.5]
   //          ],
   //          'fill-extrusion-base': [
   //             'interpolate',
   //             ['linear'],
   //             ['zoom'],
   //             13, 0,
   //             13.05, ['get', 'min_height'],
   //             22, ['get', 'min_height']
   //          ],
   //          'fill-extrusion-opacity': 0.9,
   //          // Add shadow effect
   //          'fill-extrusion-vertical-gradient': true,
   //          'fill-extrusion-ambient-occlusion-intensity': 0.3,
   //          'fill-extrusion-ambient-occlusion-radius': 3
   //       }
   //    });
      
   //    return style;
   // };

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <Text style={styles.title}>Gandhinagar Route - 3D View</Text>
         <View style={{ flex: 1 }}>
            <MapView 
               style={{ flex: 1 }} 
               // styleURL={MAPBOX_STANDARD_STYLE}
               styleJSON={JSON.stringify(customMAP)}
               compassEnabled={true}
               pitchEnabled={true}
               rotateEnabled={true}
               zoomEnabled={true}
               onDidFinishLoadingStyle={() => {
                  console.log('Map style loaded with 3D buildings');
               }}
            >
               {/* 3D Buildings Layer - Alternative approach if custom style doesn't work */}
               <FillExtrusionLayer
                  id="building-3d"
                  sourceID="composite"
                  sourceLayerID="building"
                  filter={['==', ['get', 'extrude'], 'true']}
                  style={{
                     fillExtrusionColor: [
                        'interpolate',
                        ['linear'],
                        ['get', 'height'],
                        0, '#e0e0e0',
                        20, '#d0d0d0',
                        40, '#c0c0c0',
                        60, '#b0b0b0',
                        100, '#a0a0a0',
                        200, '#909090'
                     ],
                     fillExtrusionHeight: [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        13, 0,
                        13.05, ['*', ['coalesce', ['get', 'height'], 10], 2.5],
                        22, ['*', ['coalesce', ['get', 'height'], 10], 2.5]
                     ],
                     fillExtrusionBase: [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        13, 0,
                        13.05, ['coalesce', ['get', 'min_height'], 0],
                        22, ['coalesce', ['get', 'min_height'], 0]
                     ],
                     fillExtrusionOpacity: [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        // 13, 0,
                        // 13.5, 0.9
                     ],
                  }}
                  belowLayerID="road-label"
               />

               {/* Shadow Layer for Buildings */}
               <FillLayer
                  id="building-shadows"
                  sourceID="composite"
                  sourceLayerID="building"
                  filter={['==', ['get', 'extrude'], 'true']}
                  style={{
                     fillColor: '#000000',
                     fillOpacity: [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        13, 0,
                        14, 0.1,
                        16, 0.2
                     ],
                     fillTranslate: [10, 10],
                     fillTranslateAnchor: 'map'
                  }}
                  belowLayerID="building-3d"
               />

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
                           lineColor: "#0080ff",
                           lineWidth: 5,
                           lineGradient: [
                              'interpolate',
                              ['linear'],
                              ['line-progress'],
                              0, '#0080ff',
                              0.5, '#00ffff',
                              1, '#0080ff'
                           ]
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
                           fillColor: "rgba(255,0,0,0.4)",
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
               
               {/* Camera with 3D perspective */}
               <Camera 
                  followUserLocation 
                  followZoomLevel={16}
                  followPitch={45} // Tilt angle for 3D view
                  followBearing={0}
                  animationMode="flyTo"
                  animationDuration={2000}
               />
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
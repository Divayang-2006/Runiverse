import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import Mapbox, { Camera, MapView, FillExtrusionLayer } from '@rnmapbox/maps';

Mapbox.setAccessToken(
   'sk.eyJ1IjoiaW1hZ2luZS14IiwiYSI6ImNtZXlzMDU0dzA5c3Yya3NnNTZsN3FiYTYifQ.IH5ATmHk2cFpldEa9Ps6ow'
);

export default function MapScreen() {
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <Text style={{ fontSize: 22, margin: 12 }}>Territories</Text>

         <View style={{ flex: 1 }}>
            <MapView
               style={{ flex: 1 }}
               styleURL={Mapbox.StyleURL.Dark} // Dark/Satellite works well for 3D buildings
            >
               <Camera
                  zoomLevel={16}
                  centerCoordinate={[72.8311, 21.1702]} // Mumbai
                  pitch={75}
                  bearing={20}
               />

               {/* 3D Buildings */}
               <FillExtrusionLayer
                  id="3d-buildings"
                  sourceID="composite"
                  sourceLayerID="building"
                  style={{
                     fillExtrusionColor: '#aaa',
                     fillExtrusionHeight: [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        16,
                        ['*', ['get', 'height'], 2], // multiply height by 2
                     ],
                     fillExtrusionBase: [
                        'case',
                        ['has', 'min_height'],
                        ['*', ['get', 'min_height'], 2], // scale base too
                        0,
                     ],
                     fillExtrusionOpacity: 0.8,
                  }}
               />

            </MapView>
         </View>
      </SafeAreaView>
   );
}

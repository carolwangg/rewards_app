// import MapView, { MarkerPressEvent, MarkerSelectEvent } from 'react-native-maps';
// import { Marker } from 'react-native-maps';
// import { Pressable, StyleSheet, View, Text } from 'react-native';
// import { PROVIDER_GOOGLE } from 'react-native-maps';
// import { MapBusiness } from '@/constants/interfaces';
// import { useEffect, useState } from 'react';
// import FONTS from '@/constants/fonts';
// import COLOURS from '@/constants/colours';

// type Props={
//     businesses: MapBusiness[]
// }

// export default function MapPage({businesses}: Props) {
//   const [markers, setMarkers] = useState([]);
//   const [idToBusiness, setIdToBusiness] = useState<Map<string, MapBusiness>>();
//   useEffect(()=>{loadMarkers(businesses, setMarkers, setIdToBusiness)}, [businesses]);
//   function loadMarkers(businesses: MapBusiness[], setMarkers: Function, setIdToBusiness: Function){
//     const markers = [];
//     const idToBusiness = new Map();;
//     for (const business of businesses){
//         markers.push(<Marker
//         key={business.id}
//         identifier={business.id}
//         coordinate={{latitude: business.latitude, longitude:business.longitude}}
//         title={business.name}
//         description={business.description}
//         onPress={renderBusiness}>
//             <View style={styles.marker}>
//             <Text style={styles.markerText}>{business.rewardCount}</Text>
//             </View>
//         </Marker>
//         )
//         idToBusiness.set(business.id, business);
//     }
//     console.log(markers)
//     setMarkers(markers);
//     setIdToBusiness(idToBusiness);
//     return markers
//   }
//   function renderBusiness(event: MarkerPressEvent){
//     console.log(idToBusiness?.get(event.nativeEvent.id))
//   }
//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} provider={PROVIDER_GOOGLE}>
//         {markers}
//         </MapView>
//         <Pressable style={styles.button}><Text>{`Visit Business >>`}</Text></Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     position: 'relative'
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
//   button: {
//     position: 'absolute',
//     bottom: 30,
//     backgroundColor: 'lightblue',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 25,
//     padding: 10,
//     borderWidth: 1,
//     fontFamily: FONTS.GOWUN_DODUM,
//     fontSize: 18,
//     alignSelf: 'center'
//   },
//   marker: {
//     backgroundColor: COLOURS.DARK_BLUE,
//     width: 40,
//     height: 40,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   markerText:{
//     color: COLOURS.WHITE
//   }
// });

import COLOURS from "@/constants/colours";
import { Location } from "@/constants/interfaces";
import { UNIVERSAL_STYLES } from "@/constants/styles";
import { pickRegion } from "@/helpers/locationPicker";
import { useCallback, useEffect, useState } from "react";
import { GestureResponderEvent, ImageURISource, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import Loading from "./Loading";
import { geolocate, reverseGeocodeLocation, autocompleteSuggestions } from "@/services/googleMaps";
import { LocationHook } from "@/constants/hooks";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Props = {
    iconURL?: ImageURISource,
    latitude: number,
    longitude: number,
    initialStreetAddress: string,
    onSave: (location: LocationHook) => void
}

const factory_helper = (suggestion: string, id: string, setStreetAddress: Function, setStreetAddressChanged: Function, onMapTouch: Function) => {
    return <Pressable key={id} style={styles.suggestionBox} onPress={()=>{setStreetAddress(suggestion); setStreetAddressChanged(true), onMapTouch();}}>
        <Text style={UNIVERSAL_STYLES.bodyTextSmall}> {suggestion} </Text>
    </Pressable>
}

const factory = (suggestions: any[], setStreetAddress: Function, setStreetAddressChanged: Function, onMapTouch: Function) => {
    const temp = [];
    for (let i = 0; i < suggestions.length; i++){
        temp.push(factory_helper(suggestions[i].description, i.toString(), setStreetAddress, setStreetAddressChanged, onMapTouch));
        i++;
    }
    return temp;
}

export default function LocationChooser({latitude, longitude, initialStreetAddress, onSave, iconURL}: Props) {
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const location = new LocationHook(latitude, longitude);
    const [streetAddress, setStreetAddress] = useState(initialStreetAddress);
    const [streetAddressChanged, setStreetAddressChanged] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [region, setRegion] = useState({latitude: location.location.latitude, 
        longitude: location.location.longitude,
        latitudeDelta: 0.01, longitudeDelta: 0.01
    });
    const onRegionChange = useCallback((region: Region) => {
        const newLocation = new Location(region.latitude, region.longitude);
        location.setLocation(newLocation);
        reverseGeocodeLocation(newLocation).then(data =>{
            console.log(data[0].formattedAddress);
            if (data.length > 0) {
                const newAddress = data[0].formattedAddress;
                location.setStreetAddress(newAddress);
                setStreetAddress(newAddress);
            }
        });
    }, []);
    const onTextChange = useCallback((text: string) => {
        setStreetAddress(text);
        setStreetAddressChanged(true);
        autocompleteSuggestions(text, 5).then(data =>{
            if (data.length > 0) {
                setSuggestions(data);
            }
        });
    }, []);
    const onMapTouch = useCallback(() => {
        setSearching(false); 
        Keyboard.dismiss(); 
        if (streetAddressChanged){
            geolocate(streetAddress).then(data =>{
            console.log(data[0]);
            if (data.length > 0) {
                const newRegion = {latitude: data[0].location.latitude, longitude: data[0].location.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01};
                setRegion(newRegion);
                onRegionChange(newRegion);
            }
        });
        setStreetAddressChanged(false);
        }
    }, [streetAddressChanged, location]);
    useEffect(()=>{
        console.log("loading own region")
        setLoading(true);
        pickRegion().then(data =>{
            setRegion(data);
            onRegionChange(data);
            setLoading(false);
        });
    }, []) 
    if (loading) return <Loading message={"Retrieving your location..."}/>
    return (
            <Pressable style={styles.root} onPress={onMapTouch}>
                <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                // initialRegion={{latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01}}
                region={region}
                onRegionChangeComplete={onRegionChange}
                >
                    <Marker title={"Selected location"} coordinate={location.location}/>
                </MapView>
                
                <SafeAreaView style={styles.locationRow}>
                    <View testID="175:455" style={[styles.locationButton, {width: searching? '100%': 300}]}>
                        <TextInput testID="175:456" style={[UNIVERSAL_STYLES.bodyTextSmall, {flex: 1}]} onFocus={()=>{setSearching(true);}} onChangeText={onTextChange}>
                            {streetAddress}
                        </TextInput>
                    </View>
                    <View style={[styles.suggestions, {display: searching? 'flex': 'none'}]}>
                        {factory(suggestions, setStreetAddress, setStreetAddressChanged, onMapTouch)}
                    </View>
                </SafeAreaView>

                <SafeAreaView style={styles.saveButtonRow}>
                    <Pressable style={styles.saveButton} onPress={()=>{onSave(location)}}><Text style={UNIVERSAL_STYLES.h3Text}>{"Save"}</Text></Pressable>
                </SafeAreaView>
            </Pressable>
  );
}

const styles = StyleSheet.create({
    root: {
        position: 'relative',
        display: 'flex',
        flex: 1,
    },
    map:{
        display: 'flex',
        flex: 1
    },
    locationButton: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingLeft: 10,
        paddingBottom: 5,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 10,
        columnGap: 10,
        borderRadius: 30,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: COLOURS.DARK_BLUE,
        backgroundColor: COLOURS.WHITE,
    },
    locationRow: {
        position: 'absolute',
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
    },
    suggestionBox:{
        backgroundColor: COLOURS.WHITE,
    },
    suggestions:{
        backgroundColor: COLOURS.WHITE,
        flex: 1,
        rowGap: 5,
        borderRadius: 25,
    },
    saveButtonRow: {
        position: 'absolute',
        width: '100%',
        height: 'auto',
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
        bottom: 0,
    },
    saveButton: {
        backgroundColor: COLOURS.WHITE,
        borderColor: COLOURS.DARK_BLUE,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 45,
        borderWidth: 2
    },
})


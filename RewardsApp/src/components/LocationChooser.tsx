import COLOURS from "@/constants/colours";
import { Location } from "@/constants/interfaces";
import { UNIVERSAL_STYLES } from "@/constants/styles";
import { pickRegion } from "@/helpers/locationPicker";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { GestureResponderEvent, ImageURISource, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import Loading from "./Loading";
import { geolocate, reverseGeocodeLocation, autocompleteSuggestions } from "@/services/googleMaps";
import { LocationHook } from "@/constants/hooks";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { getRewardsInRadius } from "@/services/apiCalls";

type Props = {
    iconURL?: ImageURISource,
    latitude: number,
    longitude: number,
    initialStreetAddress: string,
    onSave: (location: LocationHook) => void
}
const SEARCH_RADIUS = 0.01;
export default function LocationChooser({latitude, longitude, initialStreetAddress, onSave, iconURL}: Props) {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const location = new LocationHook(latitude, longitude, initialStreetAddress);
    const [streetAddress, setStreetAddress] = useState(initialStreetAddress);
    const [streetAddressChanged, setStreetAddressChanged] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [markerList, setMarkerList] = useState<ReactNode>([]);
    const [region, setRegion] = useState({latitude: location.location.latitude, 
        longitude: location.location.longitude,
        latitudeDelta: 0.01, longitudeDelta: 0.01
    });

    const factory_helper = useCallback((suggestion: string, id: string, setStreetAddress: Function, setStreetAddressChanged: Function, onMapTouch: Function) => {
        if (suggestion.toLowerCase()=="current location"){
            return <Pressable key={id} style={styles.suggestionBox} onPress={()=>{pickCurrentLocation(); setStreetAddress(suggestion); setStreetAddressChanged(true), onMapTouch();}}>
            <Text style={UNIVERSAL_STYLES.bodyTextSmall}> {suggestion} </Text>
        </Pressable>
        }
        return <Pressable key={id} style={styles.suggestionBox} onPress={()=>{setStreetAddress(suggestion); setStreetAddressChanged(true), onMapTouch();}}>
            <Text style={UNIVERSAL_STYLES.bodyTextSmall}> {suggestion} </Text>
        </Pressable>
    }, []);

    const factory = useCallback((suggestions: any[], setStreetAddress: Function, setStreetAddressChanged: Function, onMapTouch: Function) => {
        const temp = [];
        for (let i = 0; i < suggestions.length; i++){
            temp.push(factory_helper(suggestions[i].description, i.toString(), setStreetAddress, setStreetAddressChanged, onMapTouch));
            i++;
        }
        temp.push(factory_helper("Current location", "currentLocation", setStreetAddress, setStreetAddressChanged, onMapTouch))
        return temp;
    }, []);

    const pickCurrentLocation = () => {
        setLoading(true)      
        pickRegion().then(data =>{
            setRegion(data);
            onRegionChange(data);
            setLoading(false)  
        });
    }
    const onRegionChange = useCallback((region: Region) => {
        const newLocation = new Location(region.latitude, region.longitude);
        location.setLocation(newLocation);
        reverseGeocodeLocation(newLocation).then(data =>{
            if (data && data.length > 0) {
                const newAddress = data[0].formattedAddress;
                location.setStreetAddress(newAddress);
                setStreetAddress(newAddress);
            }
        });
        getRewardsInRadius(region.latitude, region.longitude, SEARCH_RADIUS).then(data =>{
            const markers = []
            if (data && data.user) {
                for (let i = 0; i < data.user.length; i++){
                    markers.push(<Marker key={data.user[i].id} pinColor={COLOURS.DARK_BLUE} coordinate={{latitude: data.user[i].latitude, longitude: data.user[i].longitude}}/>)
                }
            }
            setMarkerList(markers);
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
        if (!location.streetAddress){
            console.log("loading own region")
            pickCurrentLocation();
        }  
        getRewardsInRadius(region.latitude, region.longitude, SEARCH_RADIUS).then(data =>{
            const markers = []
            if (data && data.user) {
                for (let i = 0; i < data.user.length; i++){
                    const reward = data.user[i]
                    markers.push(<Marker title={reward.name}pinColor={COLOURS.DARK_BLUE} coordinate={{latitude: reward.latitude, longitude: reward.longitude}}/>)
                }
            }
            setMarkerList(markers);
        });
        
    }, []) 

    if (loading) return <Loading message={t("retrievingLocation")}/>
    
    return (
            <Pressable style={styles.root} onPress={onMapTouch}>
                <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                // initialRegion={{latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01}}
                region={region}
                onRegionChangeComplete={onRegionChange}
                >
                    <Marker title={t("selectedLocation")} coordinate={location.location}/>
                    {markerList}
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
                    <Pressable style={styles.saveButton} onPress={()=>{onSave(location)}}><Text style={UNIVERSAL_STYLES.h3Text}>{t("save")}</Text></Pressable>
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
        padding: 10,
        backgroundColor: COLOURS.WHITE,
    },
    suggestions:{
        width: '100%',
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


import { Alert } from "react-native";
import * as ExpoLocation from "expo-location";
import { Region } from "react-native-maps";

export async function pickRegion(): Promise<Region>{
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();

    if (status !== "granted") {
        Alert.alert("Permission denied", "Please grant location services");
    }

    const location = await ExpoLocation.getCurrentPositionAsync({
    accuracy: ExpoLocation.Accuracy.High,
    });

    return {latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01}
}
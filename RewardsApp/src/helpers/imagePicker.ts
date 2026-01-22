import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export async function pickImage(setImage: (uri: string) => void, aspectRatio?: [number, number]) {
    // Launch the image library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
        Alert.alert('Permission required', 'Permission to access the media library is required.');
        return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: aspectRatio? aspectRatio: [4, 3],
    quality: 1,
    });

    console.log("picked image:"+result);
    
    if (!result.canceled) {
        console.log("set uri:"+result.assets[0].uri);
        setImage(result.assets[0].uri);
    }
};

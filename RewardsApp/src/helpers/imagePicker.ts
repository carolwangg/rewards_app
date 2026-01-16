import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export async function pickImage(setImage: (uri: string) => void) {
    // Launch the image library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
    Alert.alert('Permission required', 'Permission to access the media library is required.');
    return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
};

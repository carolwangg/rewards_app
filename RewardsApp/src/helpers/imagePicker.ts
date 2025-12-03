import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
export const pickImage = async () => {
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
        return result;
    }else{
        return null;
    }
};
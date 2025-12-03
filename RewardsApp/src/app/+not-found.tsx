import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function NotFoundScreen(){
    return(
        <View>
        <Stack.Screen options={{ title: 'Oops! Page Not Found'}} />
        <View style={styles.container}>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
});
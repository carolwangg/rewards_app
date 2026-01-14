import Error from '@/components/Error';
import COLOURS from '@/constants/colours';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function NotFoundScreen(){
    return(
        <View  style={styles.container}>
            <Stack.Screen options={{ title: 'Oops! Page Not Found'}} />
            <View>
                <Error error={"Page not found"} code={404}>
                </Error>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOURS.WHITE,
        height: '100%'
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
    },
});
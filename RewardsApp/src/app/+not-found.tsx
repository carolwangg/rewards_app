import Error from '@/components/Error';
import COLOURS from '@/constants/colours';
import { router, Stack, usePathname } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

export default function NotFoundScreen(){
    console.log("Current path:"+usePathname())
    const {t} = useTranslation();
    return(
        <View  style={styles.container}>
            <Stack.Screen options={{ title: t('errors.pageNotFoundTitle')}} />
            <View>
                <Error error={t("errors.pageNotFoundMessage")} code={404}>
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
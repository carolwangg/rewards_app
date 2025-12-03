import { StyleSheet, View, Text } from "react-native"
type Props = {
    error?: string
}
export default function Error({error}: Props){
    return <View style={styles.root}>
                <Text>ERROR SCREEN</Text>
                <Text>{error}</Text>
        </View>
}
const styles = StyleSheet.create({
    root:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
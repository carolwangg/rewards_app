import { SafeAreaView } from "react-native-safe-area-context";
import {View, Button, Text} from "react-native";
export default function Cart () {
     return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>Customer cart</Text>
        </View>
    </SafeAreaView>
    );
}
import FONTS from "@/constants/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

const TABBAR_HEIGHT = 60;
const ICON_SIZE = 40;
const NUMBER_WIDTH = 30;

type Props = {
  num: number;
};
export default function TabBarIcon({num}: Props){
    const focused = true;
    const color = "rgb(0,0,0)";

    return <View style={styles.body}>
                <Ionicons name={focused? 'cash-sharp': 'cash-outline'} color={color} size={ICON_SIZE}/>
                <View testID="15:617" style={[styles.numberFrame, num?styles.visible: styles.invisible]}>
                    <Text testID="15:618" style={styles.number}>
                        {num}
                    </Text>
                </View>
            </View>
}

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        width: TABBAR_HEIGHT,
        height: TABBAR_HEIGHT,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        color: 'rgba(0, 0, 0, 1)',
        textAlign: 'center',
        fontFamily: FONTS.BALOO_BHAI,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '800',
    },
    numberFrame: {
        flexDirection: 'row',
        width: NUMBER_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        backgroundColor: 'rgba(255, 131, 131, 1)',
        position: 'absolute',
        top: 2,
        right: 2,
    },
    invisible: {
        visibility: "hidden",
    },
    visible: {
        visibility: "visible",
    }
});

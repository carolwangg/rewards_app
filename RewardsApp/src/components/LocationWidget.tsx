import { UNIVERSAL_STYLES } from "@/constants/styles";
import { Text, View, StyleSheet, Pressable } from "react-native";
import ChevronDown from '@/assets/images/chevron-down.svg';

type Props = {
    location: string,
    setFindLocation: Function
}
export default function LocationWidget({location, setFindLocation}: Props){
    return <View testID="175:454" style={styles.locationRow}>
                <Pressable testID="175:455" style={styles.locationButton} onPress={()=>{(setFindLocation(true))}}>
                    <Text testID="175:456" style={[UNIVERSAL_STYLES.bodyTextSmall, {paddingHorizontal: 10}]} numberOfLines={1}>
                        {location}
                    </Text>
                    <ChevronDown testID="175:457"/>
                </Pressable>
            </View>
}

const styles = StyleSheet.create({
  locationRow: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
  },
  locationButton: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(28, 39, 76, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}
)

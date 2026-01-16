import COLOURS from "@/constants/colours";
import FONTS from "@/constants/fonts";
import { CustomerCard } from "@/constants/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, Image } from "react-native";

type Props = {
    card: CustomerCard | null
    emptyMessage?: string
}
export default function Card({ card, emptyMessage }: Props) {
    if (card == null){
        return <View testID="9:207" style={[styles.cardBox, {backgroundColor: COLOURS.GREEN}]}>
            <Text testID="9:208" style={[styles.tagline, {color: COLOURS.WHITE}]}>
                {emptyMessage? emptyMessage: "Add business cards from the discovery page"}
            </Text>
            <Ionicons name={'compass-sharp'} color={COLOURS.WHITE} size={24}/>
        </View>
    }
  return <View testID="9:207" style={[styles.cardBox, {backgroundColor: card.colour}]}>
            <View testID="9:214" style={styles.nameAndIcon}>
            <Image source={{uri: card.image_url}} style={styles.image}/>
            <Text testID="9:210" style={styles.cardName}>
                {card.name}
            </Text>
            </View>
            <Text testID="9:212" style={styles.contactInfo}>
            {card.contactInfo}
            </Text>
            <Text testID="9:208" style={styles.tagline}>
            {card.description}
            </Text>
        </View>
}

const styles = StyleSheet.create({
  cardBox: {
    width: 340,
    height: 227,
    paddingTop: 10,
    paddingLeft: 30,
    paddingBottom: 10,
    paddingRight: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  nameAndIcon: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 0,
    paddingBottom: 10,
    paddingRight: 0,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    alignSelf: 'stretch',
  },
  cardName: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  contactInfo: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  tagline: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  points: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  image:{
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%'
  }
});
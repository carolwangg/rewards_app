import COLOURS from "@/constants/colours";
import FONTS from "@/constants/fonts";
import { CustomerCard } from "@/constants/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, Image } from "react-native";
import DefaultLogo from '@/assets/images/default-logo.svg';
import { useTranslation } from "react-i18next";

type Props = {
    card: CustomerCard | null
    emptyMessage?: string
}
export default function Card({ card, emptyMessage }: Props) {
  const {t} = useTranslation();
    if (card == null){
        return <View testID="9:207" style={[styles.cardBox, {backgroundColor: COLOURS.GREEN}]}>
            <Text testID="9:208" style={[styles.tagline, {color: COLOURS.WHITE}]}>
                {emptyMessage? emptyMessage: t("addBusinessCards")}
            </Text>
            <Ionicons name={'compass-sharp'} color={COLOURS.WHITE} size={24}/>
        </View>
    }
  
    let cardTextColour = card.text_colour?card.text_colour: COLOURS.BLACK;
  return <View testID="9:207" style={[styles.cardBox, {backgroundColor: card.colour?card.colour: COLOURS.LIGHT_GRAY}]}>
            <View testID="9:214" style={styles.nameAndIcon}>
            {card.image_url?<Image source={{uri: card.image_url}} style={styles.image}/>: <DefaultLogo width={80} height={80}/>}
            <Text testID="9:210" style={[styles.cardName, {color: card.name?cardTextColour: COLOURS.GRAY_OVERLAY}]}>
                {card.name}
            </Text>
            </View>
            <Text testID="9:212" style={[styles.contactInfo, {color: card.contactInfo? cardTextColour: COLOURS.GRAY_OVERLAY}]}>
              {card.contactInfo? card.contactInfo: t("noContactInfo")}
            </Text>
            <Text testID="9:208" style={[styles.tagline, {color: card.description? cardTextColour: COLOURS.GRAY_OVERLAY}]}>
              {card.description? card.description: t("noDescription")}
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
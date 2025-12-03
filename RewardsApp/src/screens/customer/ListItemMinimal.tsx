import FONTS from "@/constants/fonts"
import { CustomerReward } from "@/constants/interfaces"
import { View, Text, StyleSheet } from "react-native"
import { Link } from "expo-router"
type Props = {
    reward: CustomerReward
}
export default function ListInteriorCustomer ({reward}: Props) {
  return  <View style={styles.item}>
            <Link style={styles.section} href={{pathname: './item/[item]',
            params: { item: reward.id, reward: JSON.stringify(reward)}}}>
            <View style={styles.detailsBox}>
              <View style={styles.photo}/>
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{reward.name}</Text>
                <Text style={styles.text} numberOfLines={2} ellipsizeMode='tail'>{reward.description}</Text>
                <Text testID="175:396" style={styles.pointText}>
                    {`Points: `}{reward.points}
                </Text>              
              </View>
            </View>
            </Link>
          </View>
}

const styles = StyleSheet.create({
  item:{
    flex: 1,
    display: "flex",
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    maxHeight: 100,
    padding: 7,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth:1,
  },
  section:{
    display: 'flex',
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsBox:{
    display: 'flex',
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
    alignSelf: 'stretch',
  },

  photo:{
    width: 80,
    height: 80,
    backgroundColor: 'rgba(237, 237, 237, 1)',
  },

  info:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    rowGap: 5,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  text: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000",
    maxWidth: '100%',
  },
  title: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    color: "#000000",
  },
  distanceText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  pointFrame: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pointText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
})
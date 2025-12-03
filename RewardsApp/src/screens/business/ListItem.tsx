import FONTS from '@/constants/fonts';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { Reward } from '@/constants/interfaces';
import { Image } from 'expo-image';
type Props = {
  itemId: string;
  reward: Reward
};
type ListInteriorProps = {
  reward: Reward
};

export default function ListItem({itemId, reward}: Props) {
  if(itemId === "reward_0") return <View style={styles.item}/>
    return <Pressable style={styles.item} onPress={() => {router.push({pathname: './item/edit/[editItem]',
          params: { editItem: itemId, reward: JSON.stringify(reward) }})}}>
          <ListInterior reward={reward}/>
        </Pressable>
  }

  export function ListInterior ({reward}: ListInteriorProps) {
    
    return  <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
              <View style={styles.detailsBox}>
                <View style={[styles.photoBox, {display: reward.image_url? 'flex': 'none'}]}>
                  <Image source={reward.image_url} style={styles.image}/>
                </View>
                <View style={styles.info}>
                  <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{reward.name}</Text>
                  <Text style={styles.text} numberOfLines={2} ellipsizeMode='tail'>{reward.description}</Text>
                  <View testID="175:395" style={styles.pointFrame}>
                    <Text testID="175:396" style={styles.pointText}>
                      {`Points: `}{reward.points}
                    </Text>
                  </View>                
                </View>
              </View>
            </View>
  }
const styles = StyleSheet.create({
  item:{
    display: "flex",
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 120,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    columnGap: 10,
  },
   image:{
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  itemName: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 22,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000"
  },
  descriptionOfItemGoesRightOverHere: {
    width: 160,
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000"
  },
  frame31: {
    flexDirection: 'row',
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  frame29: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    rowGap: 10,
  },
  rectangle28: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(237, 237, 237, 1)',
  },
  detailsBox:{
    display: 'flex',
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: 10,
    backgroundColor: 'rgb(255, 255, 255)',
    alignSelf: 'stretch',
  },
  photoBox:{
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  });
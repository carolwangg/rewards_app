import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Bookmark from '@/assets/images/bookmark-filled.svg';
import BookmarkOutline from '@/assets/images/bookmark-outline.svg';
import { useCallback, useState } from "react";
import FONTS from "@/constants/fonts";
import { CustomerReward } from "@/constants/interfaces";
import { router } from "expo-router";

type Props = {
  loading?: boolean;
  reward: CustomerReward;
}

const goToItem = (reward: CustomerReward) => {
    const rewardParsed = {
        id: reward.id,
        name: reward.name,
        description: reward.description, 
        image_url: reward.image_url,
        points: reward.points,
        business_id: reward.business_id
    }
    router.push({pathname:'./item/[item]', params: { item: reward.id, reward: JSON.stringify(rewardParsed)}});
}

export default function DiscoverComponent({loading, reward}: Props) {
    const [selected, setSelected] = useState(false);

    const pressBookmark = () => {
        setSelected(!selected);
    }
    if (loading) {
      return <Pressable testID="175:383" style={styles.rewardBox} onPress={() => {goToItem(reward);}}>
        <View testID="175:384" style={styles.rewardGroup}>
          <View testID="175:393" style={styles.imageBox}/>
          <View testID="175:385" style={styles.detailsBox}>
            <View style={styles.descriptionBox}>
            <Text testID="175:386" style={[styles.titleText, styles.loading]}>
              {reward.name}
            </Text>
            <Pressable testID="175:391" style={styles.bookmarkBox} onPress={pressBookmark}>
              <Bookmark width={22} height={28} style={{display: selected? 'flex': 'none' }}/>
              <BookmarkOutline width={22} height={28} style={{display: selected? 'none': 'flex'}}/>
            </Pressable>
            <Text testID="175:387" style={[styles.descriptionText, styles.loading]}>
              {reward.description}
            </Text>
            </View>
            <View testID="175:395" style={[styles.pointFrame, styles.loading]}>
              <Text testID="175:396" style={styles.pointText}>
                {`Points: `}{reward.points}
              </Text>
              <Text testID="175:397" style={styles.distanceText}>
                {reward.distance}{`km`}
              </Text>
            </View>
          </View>
        </View>
    </Pressable>
    }
    return <Pressable testID="175:383" style={styles.rewardBox} onPress={() => {goToItem(reward);}}>
        <View testID="175:384" style={styles.rewardGroup}>
          <View testID="175:393" style={styles.imageBox}><Image source={{uri: reward.image_url}} style={styles.image}></Image></View>
          <View testID="175:385" style={styles.detailsBox}>
            <View style={styles.descriptionBox}>
            <Text testID="175:386" style={styles.titleText}>
              {reward.name}
            </Text>
            <Pressable testID="175:391" style={styles.bookmarkBox} onPress={pressBookmark}>
                <Bookmark width={22} height={28} style={{display: selected? 'flex': 'none' }}/>
                <BookmarkOutline width={22} height={28} style={{display: selected? 'none': 'flex'}}/>
            </Pressable>
            <Text testID="175:387" style={styles.descriptionText}>
              {reward.description}
            </Text>
            </View>
            <View testID="175:395" style={styles.pointFrame}>
              <Text testID="175:396" style={styles.pointText}>
                {`Points: `}{reward.points}
              </Text>
              <Text testID="175:397" style={styles.distanceText}>
                {reward.distance}{`km`}
              </Text>
            </View>
          </View>
        </View>
    </Pressable>
};

const styles = StyleSheet.create({
    
  titleText: {
    alignSelf: 'stretch',
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  loading:{
    backgroundColor: 'rgba(237, 237, 237, 1)',
    borderRadius: 5
  },
  descriptionText: {
    alignSelf: 'stretch',
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  rewardBox: {
    width: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.250980406999588)',
    shadowRadius: 4,
    shadowOffset: {"width":3,"height":1},
  },
  rewardGroup: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    height: 200,
    width: '100%'
  },
  detailsBox: {
    flex: 2,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    columnGap: 10,
    position: 'relative',
    paddingVertical: 7,
    paddingHorizontal: 15
  },
  descriptionBox: {
    flexDirection: 'column',
    height: 'auto',
    width: '100%',
    alignItems: 'flex-start',
    rowGap: 3,
    position: 'relative'
  },
  bookmarkBox: {
    position: 'absolute',
    top: 0, 
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 25, height: 30
  },
  imageBox: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: 300,
    height: 100,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(237, 237, 237, 1)',
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    width: '100%', 
    height: '100%'
  }
  ,
  pointText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  distanceText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  pointRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 0,
    alignItems: 'center',
    columnGap: 10,
    alignSelf: 'stretch',
  },
  pointFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
});

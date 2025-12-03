import {StyleSheet, Alert, View, Text, ScrollView, RefreshControl} from 'react-native';

import ChevronDown from '@/assets/images/chevron-down.svg';
import FONTS from '@/constants/fonts';
import { CustomerReward } from '@/constants/interfaces';
import RewardCarousel from './RewardCarousel';
import Header from './Header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useCallback } from 'react';
import { getRewards } from '@/services/apiCalls';
import { router } from 'expo-router';

const onRewardsPress = () => {
  router.push("./itemList");
}

const loadRewards = async(setRewards: Function, setLoading: Function) => {
    try {
        const response = await getRewards();
        setRewards(response.user);
        setLoading(false);
    } catch (error) {
        Alert.alert("Error fetching card reward data", "We're having some issues on our end. Please try again later.")
        console.error(error);
    } finally {
        console.log("finished");
    }
}
export default function DiscoverComponent() {
  const [rewards, setRewards] = useState<CustomerReward[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {loadRewards(setRewards, setLoading);}, []);

  const [refreshing, setRefreshing] = useState(false);
  
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      loadRewards(setRewards, setLoading);
      setRefreshing(false);
    }, []);

  return (
    <SafeAreaProvider>
    <SafeAreaView testID={"175:492"} style={styles.root}>
      <ScrollView style={styles.scroll} refreshControl={<RefreshControl style={{borderWidth: 1}} refreshing={refreshing} onRefresh={onRefresh}/>}>
          <View style={styles.body}>
              <View testID="175:454" style={styles.locationRow}>
                  <View testID="175:455" style={styles.locationButton}>
                  <Text testID="175:456" style={styles.locationText}>
                      {`Current Location`}
                  </Text>
                  <ChevronDown testID="175:457"/>
                  </View>
              </View>
              <Header contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'rgba(183, 230, 130, 1)'}} headerText={"Near you"} onPress={onRewardsPress} sideText='See All'/>
              <View style={[styles.rewardCarouselBox, {backgroundColor: 'rgba(183, 230, 130, 1)'}]}>
                  <RewardCarousel rewards={rewards != null? rewards: []}/>
              </View>    
              <Header contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 20}} headerText={"Recommended For You"} onPress={onRewardsPress} sideText='See All'/>
              <View style={styles.rewardCarouselBox}>
                  <RewardCarousel rewards={rewards != null? rewards: []}/>
              </View> 
              <Header contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 20}} headerText={"New Arrivals"} onPress={onRewardsPress} sideText='See All'/>
              <View style={styles.rewardCarouselBox}>
                  <RewardCarousel rewards={rewards != null? rewards: []}/>
              </View>                     
          </View>
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  scroll:{
    width: '100%', height: 'auto', minHeight: '100%'
  },
  body:{
    top: 0,
    margin: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleText: {
    alignSelf: 'stretch',
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  descriptionText: {
    alignSelf: 'stretch',
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  rewardCarouselBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: '100%',
    height: 220,
  },
  rewardCarousel: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'flex-start',
    columnGap: 10,
    backgroundColor: 'rgba(183, 230, 130, 1)',
  },
  rewardBox: {
    width: '100%',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(250, 255, 243, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.250980406999588)',
    shadowRadius: 4,
    shadowOffset: {"width":1,"height":3},
  },
  rewardGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  descriptionBox: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    columnGap: 10,
  },
  imageAndBookmarkBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 5,
    columnGap: 5,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  bookmarkRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  frame88: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  frame87: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  image: {
    height: 100,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(237, 237, 237, 1)',
  },
  pointText: {
    width: 66,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  distanceText: {
    width: 66,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  pointRow: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 0,
    paddingBottom: 5,
    paddingRight: 0,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    alignSelf: 'stretch',
  },
  frame882: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  itemName: {
    alignSelf: 'stretch',
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  descriptionOfItemGoesRightOverHere: {
    alignSelf: 'stretch',
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  locationText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  locationRow: {
    alignSelf: 'stretch',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(183, 230, 130, 1)',
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
});

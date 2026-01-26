import {StyleSheet, Alert, View, Text, ScrollView, RefreshControl, Pressable} from 'react-native';

import ChevronDown from '@/assets/images/chevron-down.svg';
import FONTS from '@/constants/fonts';
import { CustomerReward, Location, rewardToCustomerReward } from '@/constants/interfaces';
import RewardCarousel from '../components/RewardCarousel';
import Header from '../components/Header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useCallback, useContext } from 'react';
import { getCustomer, getRewards, getRewardsInRadius, updateCustomerLocation } from '@/services/apiCalls';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { LocationHook } from '@/constants/hooks';
import LocationChooser from '@/components/LocationChooser';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/constants';
import { AppContext } from '@/store/AppContext';

type Props = {
  userId: string
}
const onRewardsPress = (rewards: CustomerReward[]) => {
  router.push({pathname: './itemList',
          params: { rewards: JSON.stringify(rewards) }})
}

const SEARCH_RADIUS = 0.01
function performGetLocation(userId: string, location: LocationHook){
  try{
    getCustomer(userId).then(data => {
      if (!data || !data.user){
        console.error("Backend error fetching customer");
      }
      let latitude, longitude;
      latitude = data.user.latitude?data.user.latitude: null;
      longitude = data.user.longitude?data.user.longitude: null;
      location.setLocation(new Location(latitude, longitude));
      data.user.street_address?location.setStreetAddress(data.user.street_address):location.setStreetAddress("");
    });
  }catch (err){
    console.error("Error fetching customer:"+err);
  }
}
const loadRewards = async(setRewards: Function, setNearbyRewards: Function, setLoading: Function, location: Location) => {
    try {
        const rewards = await getRewards();
        const nearbyRewards = await getRewardsInRadius(location.latitude, location.longitude, SEARCH_RADIUS)
        const customerRewards = [];
        const customerNearbyRewards = [];
        for (let i = 0; i < rewards.user.length; i++){
          customerRewards.push(rewardToCustomerReward(rewards.user[i], location));
        }
        for (let i = 0; i < nearbyRewards.user.length; i++){
          customerNearbyRewards.push(rewardToCustomerReward(nearbyRewards.user[i], location));
        }
        setRewards(customerRewards);
        setNearbyRewards(customerNearbyRewards)
        setLoading(false);
    } catch (error) {
        Alert.alert("Error fetching card reward data", "We're having some issues on our end. Please try again later.")
        console.error(error);
    } finally {
        console.log("finished");
    }
}


export default function DiscoverComponent() {
  const {userId} = useContext(AppContext)!;
  const location = new LocationHook(0, 0);
  const [rewards, setRewards] = useState<CustomerReward[] | null>(null);
  const [nearbyRewards, setNearbyRewards] = useState<CustomerReward[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [changingLocation, setChangingLocation] = useState(false);
  useEffect(() => {loadRewards(setRewards, setNearbyRewards, setLoading, location.location); performGetLocation(userId, location);}, []);
  const [refreshing, setRefreshing] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false);

  const saveLocation = useCallback(async(newLocation: LocationHook) =>{
    try{
      const result = await updateCustomerLocation(userId, newLocation);
      if (result.user != "success"){
        console.error("Backend error editing location");
        Alert.alert(t("locationSave", "locationSaveMessage"))
      }
    }catch(err){
      console.error("Error editing location:"+err);
      Alert.alert(t("locationSave", "locationSaveMessage"))
    }
    setEditingLocation(false);
    location.setLocation(new Location(newLocation.location.latitude, newLocation.location.longitude));
    location.setStreetAddress(newLocation.streetAddress);
  }, [userId, location]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadRewards(setRewards, setNearbyRewards, setLoading, location.location);
    performGetLocation(userId, location)
    setRefreshing(false);
  }, [userId, location]);

  console.log("locationHook:"+JSON.stringify(location))

  if (editingLocation) return <LocationChooser
           latitude={location.location.latitude? location.location.latitude: DEFAULT_LATITUDE}
            longitude={location.location.longitude? location.location.longitude: DEFAULT_LONGITUDE} 
            initialStreetAddress={location.streetAddress? location.streetAddress: ''} 
            onSave={saveLocation}/>

  return (
    <SafeAreaProvider>
      <SafeAreaView testID={"175:492"} style={styles.root}>
         {/* <LocationChooser location={location} onSave={()=>{updateCustomerLocation(userId, location)}}/> */}
        {changingLocation? null:
        <ScrollView style={styles.scroll} refreshControl={<RefreshControl style={{borderWidth: 1}} refreshing={refreshing} onRefresh={onRefresh}/>}>
            <View style={styles.body}>
                <View testID="175:454" style={styles.locationRow}>
                  <Pressable testID="175:455" style={styles.locationButton} onPress={()=>{const temp = editingLocation; setEditingLocation(!temp)}}>
                    <Text testID="175:456" style={styles.locationText} numberOfLines={1}>
                        {location.streetAddress? location.streetAddress: t('noLocation')}
                    </Text>
                    <ChevronDown testID="175:457"/>
                  </Pressable>
                </View>
                <Header contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'rgba(183, 230, 130, 1)'}} headerText={t('customer.nearYou')} onPress={()=>{onRewardsPress(nearbyRewards?nearbyRewards: [])}} sideText={t('seeAll')}/>
                <View style={[styles.rewardCarouselBox, {backgroundColor: 'rgba(183, 230, 130, 1)'}]}>
                    <RewardCarousel rewards={nearbyRewards != null? nearbyRewards: []}/>
                </View>    
                <Header contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 20}} headerText={t('customer.recommended')} onPress={()=>{onRewardsPress(rewards?rewards:[])}} sideText={t('seeAll')}/>
                <View style={styles.rewardCarouselBox}>
                    <RewardCarousel rewards={rewards != null? rewards: []}/>
                </View> 
                <Header contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 20}} headerText={t('customer.newArrivals')} onPress={()=>{onRewardsPress(rewards?rewards: [])}} sideText={t('seeAll')}/>
                <View style={styles.rewardCarouselBox}>
                    <RewardCarousel rewards={rewards != null? rewards: []}/>
                </View>                     
            </View>
        </ScrollView>
        }
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
    marginHorizontal: 10
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(28, 39, 76, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

import {StyleSheet, View, Text, Image, Pressable, ScrollView} from 'react-native';
import Chevron from '@/assets/images/chevron.svg';
import Bookmark from '@/assets/images/bookmark-filled.svg';
import BookmarkOutline from '@/assets/images/bookmark-outline.svg';
import { CustomerReward } from '@/constants/interfaces';
import { Stack } from 'expo-router';
import FONTS from '@/constants/fonts';
import { router } from 'expo-router';
import AnimatedButton from './AnimatedButton';
import { useCallback, useMemo, useState } from 'react';
type Props = {
  reward: CustomerReward
  cart: string
  setCart: (cart: string)=>void
  cardPoints: number
}

const navigateToBusiness = (businessId: string) => {
  router.push({pathname:'../business/[business]', params: { business: businessId}});
}

export default function EventName({reward, cart, setCart, cardPoints}: Props) {
  
  const texts = ["Add to cart", "Added to cart"];
  const bgColours = ["white", 'rgba(28, 39, 76, 1)'];
  const textColours = ['rgba(28, 39, 76, 1)', "white"];
  const { useTexts, useBgColours, useTextColours } = useMemo(() => {
  const useTexts = (cart==reward.id)?[...texts].reverse(): texts;
  const  useBgColours = (cart==reward.id)?[...bgColours].reverse(): bgColours;
  const  useTextColours = (cart==reward.id)?[...textColours].reverse(): textColours;
  return { useTexts: useTexts, useBgColours: useBgColours, useTextColours: useTextColours };
}, []);
  const addToCart = () => {
    if (cart == reward.id){
      setCart("reward_0");
    } else {
      setCart(reward.id);
    } 
  }

  const addToCartView = useCallback((points: number, cardPoints: number) => {
    if (points >= cardPoints){
      return <AnimatedButton containerStyle={styles.addToCartButton} textStyle={styles.addToCart} texts={useTexts} bgColours={useBgColours} textColours={useTextColours} onPressAction={addToCart}/>
    }
  }, []);

  const [selected, setSelected] = useState(false);
  
  const pressBookmark = () => {
      setSelected(!selected);
  }

  return (
    <View testID={"168:359"} style={styles.root}>
      <Stack.Screen options={{ title: reward.name, headerBackButtonDisplayMode: 'minimal', 
        headerShadowVisible: false, headerTintColor: 'black',
        headerTitleStyle:{fontSize: 24, fontFamily: FONTS.GOWUN_DODUM}, headerTitleAlign: 'center'
        }} />
      <ScrollView style={styles.scroll}>
          <View testID={"168:400"} style={styles.body}>
            <View testID="154:986" style={styles.rewardBox}>
              <View testID="154:990" style={[styles.photoBox, {display: reward.image_url? 'flex': 'none'}]}>
                <Image source={{uri: reward.image_url}} style={styles.image}/>
              </View>
              <View testID="154:993" style={styles.descriptionBox}>
                <Text testID="154:994" style={styles.description}>
                  {reward.description}
                </Text>
                <Pressable testID="175:391" style={styles.bookmarkBox} onPress={pressBookmark}>
                  <Bookmark width={30} height={36} style={{display: selected? 'flex': 'none' }}/>
                  <BookmarkOutline width={30} height={36} style={{display: selected? 'none': 'flex'}}/>
                </Pressable>
                <View testID="154:995" style={styles.pointRow}>
                  <View testID="154:996" style={styles.pointBox}>
                    <Text testID="154:997" style={styles.count}>
                      {reward.points}
                    </Text>
                    <Text testID="154:998" style={styles.pts}>
                      {`points`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Pressable onPress={()=>{navigateToBusiness(reward.business_id)}} testID="154:1001" style={styles.storeInfoRow}>
              <View testID="154:1002" style={styles.storeInfoRowAndChevron}>
                <View testID="154:1003" style={styles.storeInfoRowBox}>
                  <Text testID="154:1004" style={styles.storeInfoRowrmation}>
                    {`Store information`}
                  </Text>
                  <Text testID="154:1005" style={styles.locationInformationHere}>
                    {`Location information here `}
                  </Text>
                </View>
                <Chevron testID="154:1006"/>
              </View>
            </Pressable>
            <View style={{width: '90%'}}>
              {addToCartView(reward.points, cardPoints)}
            </View>        
          </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  scroll:{
    width: '100%', height: 'auto', minHeight: '100%'
  },
  body:{
    width: '100%',
    flex: 1,
    rowGap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoBox: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  image:{
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rewardBox: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
  },
  bookmarkRow: {
    width: '80%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 28,
    alignItems: 'center',
  },
  bookmarkBox: {
    position: 'absolute', 
    top: 0, 
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoFrame: {
    flexDirection: 'row',
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  description: {
    width: 296,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  descriptionBox: {
    margin: 10,
    alignSelf: 'stretch',
    height: 150,
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative',
    justifyContent: 'space-between',
  },
  count: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  pts: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  pointRow: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    rowGap: 90,
    columnGap: 90,
  },
  pointBox: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  addToCart: {
    color: 'rgba(28, 39, 76, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  addToCartButton: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(28, 39, 76, 1)',
  },
  storeInfoRowrmation: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  locationInformationHere: {
    color: 'rgba(120, 119, 146, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  storeInfoRow: {
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 30,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderColor: 'rgba(120, 119, 146, 1)',
    borderWidth: 1,
  },
  storeInfoRowAndChevron: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  storeInfoRowBox: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

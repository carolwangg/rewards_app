import {StyleSheet, Alert, View, Text, Image, Pressable, ScrollView} from 'react-native';
import Redirect from '@/assets/images/redirect.svg';
import { Business, EMPTY_BUSINESS } from '@/constants/interfaces';
import FONTS from '@/constants/fonts';
import { addCustomerCard, deleteCustomerCard, getBusiness, getCustomerCard } from '@/services/apiCalls';
import { useEffect, useState } from 'react';
import { UNIVERSAL_STYLES } from '@/constants/styles';
import DefaultLogo from '@/assets/images/default-logo.svg';
import AnimatedButton from './AnimatedButton';
import COLOURS from '@/constants/colours';
import openMap from 'react-native-open-maps';
import { useTranslation } from 'react-i18next';
import { router, Stack } from 'expo-router';
import BackButton from '@/assets/images/back-button.svg';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const defaultIcon = require('@/assets/images/temp/card-0.png');

type Props={
  customerId: string,
  businessId: string
}

const getBusinessInfo = async (customerId: string, businessId: string, setBusiness: Function, setCardNotAdded: Function, setLoading: Function) => {
  console.log("business id inside:"+businessId);
  try {
    const response = await getBusiness(businessId);
    setBusiness(response.user);
    const customerCard = await getCustomerCard(customerId, businessId);
    if (!customerCard.user){
      setCardNotAdded(true);
    }
  } catch (error) {
    Alert.alert("Error fetching card reward data", "We're having some issues on our end. Please try again later.")
    console.error(error);
  } finally {
    console.log("finished");
  }
  setLoading(false);
}
const seeAll = () => {
}

const addCard = async(customerId: string, businessId: string) => {
  console.log("getting business...");
    try {
      const response = await addCustomerCard(customerId, businessId);
    } catch (error) {
      Alert.alert("Error getting business", "We're having some issues on our end. Please try again later.")
      console.error(error);
    } finally {
      console.log("finished");
    }
}

const redirect = (latitude: number | null, longitude: number | null) => {
  if (!(latitude && longitude)){
    return;
  }
  openMap({latitude: (Number) (latitude), longitude: (Number) (longitude)});
}


export default function BusinessInfo({customerId, businessId}: Props) {
  const [business, setBusiness] = useState<Business>(EMPTY_BUSINESS);
  const [loading, setLoading] = useState(false);
  const [cardNotAdded, setCardNotAdded] = useState(false);
  const {t} = useTranslation();

  useEffect(()=>{
    setLoading(false);
    getBusinessInfo(customerId, businessId, setBusiness, setCardNotAdded, setLoading);
  }, []);
  
  console.log(business);

  async function performAddCard(){
    try{
      const response = await addCustomerCard(customerId, business.id);
      if (response.user !== "success"){
        console.error("Backend error adding card.");
        Alert.alert(t("errors.addingCard", "errors.addingCardMessage"))
      }
    }catch(err){
      console.error("Error adding card:"+ err);
      Alert.alert(t("errors.addingCard", "errors.addingCardMessage"))
    }
    
  }

  async function performDeleteCard(){
    try{
      const response = await deleteCustomerCard(customerId, business.id);
      if (response.user !== "success"){
        console.error("Backend error deleting card.");
        Alert.alert(t("errors.deletingCard", "errors.deletingCardMessage"))
      }
    }catch(err){
      console.error("Backend error deleting card.");
        Alert.alert(t("errors.deletingCard", "errors.deletingCardMessage"))
    }
    
  }

  return (
    <SafeAreaProvider>
    <SafeAreaView testID={"104:955"} style={styles.root}> 
      <View style={styles.body}>
        <ScrollView style={styles.scrollBox}>
          <View testID="154:1061" style={styles.businessBox}>
            <View testID="154:1065" style={styles.bannerBox}>
                {business.banner_url?<Image source={{uri: business.banner_url}} style={styles.banner}/>: <View style={styles.noPhotoBox}/>}
            </View>
            <View style={styles.titleAndDescription}>
                <View style={styles.titleAndImageBox}>
                    <View style={{width: 80, height: 80}}>{business.image_url?<Image source={{uri: business.image_url}} style={styles.image}/>: <DefaultLogo width={80} height={80}/>}</View>
                    <View style={styles.titleBox}>
                        <Text style={[UNIVERSAL_STYLES.h2Text, {fontSize: 22}]}>{business==null || !business.name? t('noName'): business.name}</Text>
                        <Text style={[UNIVERSAL_STYLES.bodyTextLight, {fontSize: 16}]} numberOfLines={1}>{(business==null || business.street_address == '')? t('noLocation'): business.street_address}</Text>
                    </View>
                </View>
                <View testID="154:1068" style={styles.description}>
                <Text testID="154:1069" style={[styles.bodyText, {color: business.description || !business.description? COLOURS.DARK_GRAY: COLOURS.BLACK}]}>
                    {(business==null || !business.description)? t('noDescription'): business.description}
                </Text>
                </View>
            </View>
        </View>
          <View testID="154:891" style={styles.googleMapsBox}>
            <View testID="154:893" style={styles.textAndIconBox}>
              <View testID="154:902" style={styles.textBox}>
                <Text testID="154:894" style={styles.bodyText}>
                  {t("openMaps")}
                </Text>
                <Text testID="154:903" style={styles.locationInformationHere}>
                  {business==null||!business.street_address? t('noLocation'): business.street_address}
                </Text>
              </View>
              <Pressable onPress={()=>{redirect(business.latitude, business.longitude)}}>
                <Redirect/>
              </Pressable>
            </View>
          </View>

          {/* <View testID="154:1139" style={styles.rewardsHeading}>
            <Text testID="154:1140" style={styles.rewardsText}>
              {`Rewards`}
            </Text>
            <Pressable onPress={seeAll}>
              <Text testID="154:1141" style={styles.seeAllText}>
                {`See All`}
              </Text>
            </Pressable>
          </View>

          <View testID="154:1118" style={styles.rewardsList}>
            {factory(rewards)}
          </View> */}
          <View testID="154:1130" style={[styles.space, {position: 'relative'}]}/>
        </ScrollView>
        {cardNotAdded? <View testID="154:1130" style={styles.addCardRow}>
          <AnimatedButton 
          containerStyle={styles.addCardButton} 
          textStyle={styles.addCardText} 
          texts={[t("addCard"), t("cardAdded")]} 
          textColours={[COLOURS.DARK_BLUE, COLOURS.WHITE]} 
          bgColours={[COLOURS.WHITE, COLOURS.DARK_BLUE]} 
          onPressAction={performAddCard}/>
        </View>: null}
      </View>
      <Pressable 
      style={{position: 'absolute', top: 50, left: 0, width: '100%', backgroundColor: 'transparent', padding: 20}}
      onPress={()=>{router.back()}}>
          <BackButton/>
      </Pressable> 
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  body:{
    width: '100%',
    flex: 1,
    rowGap: 10,
    justifyContent: 'flex-start',
  },
  scrollBox:{
    flex: 1,
  },
  image:{
    height: 80,
    width: 80,
    borderRadius: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: 'black',
  },
  itemName: {
    alignSelf: 'stretch',
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
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
  rewardsList: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  item: {
    flexDirection: 'row',
    height: 131,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    alignSelf: 'stretch',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  frame29: {
    width: 202,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
  },
  rectangle28: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(237, 237, 237, 1)',
  },
  frame26: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  frame27: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  frame262: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  bodyText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 16,
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
  googleMapsBox: {
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    columnGap: 10,
    borderTopColor: 'rgba(120, 119, 146, 1)',
    borderTopWidth: 1,
    borderBottomColor: 'rgba(120, 119, 146, 1)',
    borderBottomWidth: 1,
  },
  textAndIconBox: {
    flexDirection: 'row',
    paddingTop: 6,
    paddingLeft: 0,
    paddingBottom: 6,
    paddingRight: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  textBox: {
    paddingTop: 10,
    paddingLeft: 0,
    paddingBottom: 10,
    paddingRight: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  businessBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
  },
  photoBox: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  addCardText: {
    color: 'rgba(28, 39, 76, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  addCardRow: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.250980406999588)',
    shadowRadius: 4,
    shadowOffset: {"width":0,"height":-4},
    position: 'absolute',
    bottom: 0
  },
  space:{
    width: '100%',
    height: 100,
  },
  addCardButton: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: COLOURS.DARK_BLUE,
  },
  rewardsText: {
    color: 'rgba(28, 39, 76, 1)',
    fontFamily: FONTS.BALOO_BHAI_BOLD,
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  seeAllText: {
    color: 'rgba(28, 39, 76, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  rewardsHeading: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerBox: {
    alignSelf: 'stretch',
    display: 'flex',
    maxWidth: '100%',
    height: 300,
  },
  titleBox: {
    flexDirection: 'column',
    rowGap: 10,
    flex: 1,
  },
  titleAndImageBox:{
    flexDirection: 'row',
    columnGap: 20,
    width: '100%',
    flex: 1,
  },
  titleAndDescription: {
    width: '100%',
    padding: 10,
  },
  banner:{
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  noPhotoBox: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
});

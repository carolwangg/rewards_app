import {StyleSheet, Alert, View, Text, Image, Pressable, ScrollView} from 'react-native';
import Redirect from '@/assets/images/redirect.svg';
import { Business } from '@/constants/interfaces';
import FONTS from '@/constants/fonts';
import { addCustomerCard, getBusiness } from '@/services/apiCalls';
import { useEffect, useState } from 'react';

const defaultIcon = require('@/assets/images/temp/card-0.png');

type Props={
  customerId: string,
  businessId: string
}

const getBusinessInfo = async (businessId: string, setBusiness: Function) => {
  console.log("business id inside:"+businessId);
  try {
    const response = await getBusiness(businessId);
    setBusiness(response.user);
  } catch (error) {
    Alert.alert("Error fetching card reward data", "We're having some issues on our end. Please try again later.")
    console.error(error);
  } finally {
    console.log("finished");
  }
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

const redirect = () => {

}

export default function BusinessInfo({customerId, businessId}: Props) {
  const [business, setBusiness] = useState<Business|null>(null);
  useEffect(()=>{getBusinessInfo(businessId, setBusiness);}, []);
  console.log(business);
  return (
    <View testID={"104:955"} style={styles.root}>    
      <View style={styles.body}>
        <ScrollView style={styles.scrollBox}>
          <View testID="154:1061" style={styles.businessBox}>
            <View testID="154:1065" style={styles.photoBox}>
              <View testID="154:1066" style={styles.imageBox}>
                <Image source={defaultIcon} style={styles.image}/>
              </View>
            </View>
            <View testID="154:1068" style={styles.description}>
              <Text testID="154:1069" style={styles.bodyText}>
                {business==null? '': business.description}
              </Text>
            </View>
          </View>

          <View testID="154:891" style={styles.googleMapsBox}>
            <View testID="154:893" style={styles.textAndIconBox}>
              <View testID="154:902" style={styles.textBox}>
                <Text testID="154:894" style={styles.bodyText}>
                  {`Open on Google Maps`}
                </Text>
                <Text testID="154:903" style={styles.locationInformationHere}>
                  {business==null? '': business.location}
                </Text>
              </View>
              <Pressable onPress={redirect}>
                <Redirect/>
              </Pressable>
            </View>
          </View>

          <View testID="154:1139" style={styles.rewardsHeading}>
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
            <View testID="154:1119" style={styles.item}>
              <View testID="154:1120" style={styles.frame29}>
                <Text testID="154:1121" style={styles.bodyText}>
                  Title
                </Text>
                <Text testID="154:1122" style={styles.descriptionOfItemGoesRightOverHere}>
                  description
                </Text>
              </View>
              <View testID="154:1123" style={styles.rectangle28}/>
            </View>
          </View>
          <View testID="154:1130" style={[styles.space, {position: 'relative'}]}/>
        </ScrollView>
        <View testID="154:1130" style={styles.addCardRow}>
          <Pressable testID="104:910" style={styles.addCardButton} onPress={() => {console.log("add card");addCard(customerId, businessId)}}>
            <Text testID="104:911" style={styles.addCardText}>
              {`Add Card`}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  body:{
    flex: 1,
    rowGap: 10,
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  scrollBox:{
    flex: 1,
  },
  image:{
    width: 310,
    height: 230,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: 'black',
    borderWidth: 2
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
    width: 393,
    paddingTop: 0,
    paddingLeft: 20,
    paddingBottom: 0,
    paddingRight: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 10,
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
  photoBox: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
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
    borderColor: 'rgba(28, 39, 76, 1)',
  },
  rewardsText: {
    color: 'rgba(28, 39, 76, 1)',
    fontFamily: FONTS.BALOO_BHAI,
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
});

import FONTS from '@/constants/fonts';
import {StyleSheet, Alert, View, Text, Image, Pressable, ScrollView} from 'react-native';
import DefaultLogo from '@/assets/images/default-logo.svg';
import { UNIVERSAL_STYLES } from '@/constants/styles';
import COLOURS from '@/constants/colours';
import { Business } from '@/constants/interfaces';

type Props = {
    business: Business
}
const redirect = () =>{

}

export default function BusinessPage({business}: Props){
  console.log("business page:"+JSON.stringify(business))
    return <View testID={"104:955"} style={styles.root}>    
          <View testID="154:1061" style={styles.businessBox}>
            <View testID="154:1065" style={styles.bannerBox}>
                {business.banner_url?<Image source={{uri: business.banner_url}} style={styles.banner}/>: <View style={styles.noPhotoBox}/>}
            </View>
            <View style={styles.titleAndDescription}>
                <View style={styles.titleAndImageBox}>
                    <View style={{width: 80, height: 80}}>{business.image_url?<Image source={{uri: business.image_url}} style={styles.image}/>: <DefaultLogo/>}</View>
                    <View style={styles.titleBox}>
                        <Text style={UNIVERSAL_STYLES.h2Text}>{business==null? '': business.name}</Text>
                        <Text style={[UNIVERSAL_STYLES.bodyTextLight]} numberOfLines={1}>{(business==null || business.street_address == '')? 'No address set': business.street_address}</Text>
                    </View>
                </View>
                <View testID="154:1068" style={styles.description}>
                <Text testID="154:1069" style={styles.bodyText}>
                    {(business==null || business.description == '')? 'No description': business.description}
                </Text>
                </View>
            </View>
        </View>
    </View>
}


const styles = StyleSheet.create({
  root: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems:'center',
    backgroundColor: COLOURS.WHITE,
    borderWidth: 1
  },
  titleAndDescription: {
    width: '100%',
    padding: 10,
  },
  body:{
    rowGap: 10,
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  scrollBox:{
    width: '100%',
    height: 'auto'
  },
  image:{
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: '100%'
  },
  banner:{
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
    resizeMode: 'cover',
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
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 10,
    backgroundColor: COLOURS.WHITE
  },
  bannerBox: {
    alignSelf: 'stretch',
    display: 'flex',
    maxHeight: 300,
    maxWidth: '100%',
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
  noPhotoBox: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  titleAndImageBox:{
    flexDirection: 'row',
    columnGap: 20,
    width: '100%',
    flex: 1
  },
  titleBox: {
    flexDirection: 'column',
    rowGap: 10,
    flex: 1,
  },
  ratingBox: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 25,
    backgroundColor: COLOURS.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 3,
},
});

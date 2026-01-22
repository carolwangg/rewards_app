import FONTS from '@/constants/fonts';
import { Stack, router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Alert, Dimensions, Image, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Business } from '@/constants/interfaces';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Loading from '@/components/Loading';
import { pickImage } from '@/helpers/imagePicker';
import { useBusiness } from '@/constants/useBusiness';
import { useTranslation } from 'react-i18next';
import { UNIVERSAL_STYLES } from '@/constants/styles';
import COLOURS from '@/constants/colours';
import DefaultLogo from '@/assets/images/default-logo.svg';
import LocationWidget from '@/components/LocationWidget';
import LocationChooser from '@/components/LocationChooser';
import { LocationHook } from '@/constants/hooks';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/constants/constants';
import Pencil from "@/assets/images/pencil-icon.svg"
import { updateBusiness, updateBusinessBanner, updateBusinessImage } from '@/services/apiCalls';

type Props={
  businessInterface: Business;
  userId: string,
}

const SCREEN_WIDTH = Dimensions.get('window').width;

// const performUpdateReward = async(reward: any, setLoading: Function, setRewardUpdatedText: Function) => {
//   try{
//     setLoading(true);
//     const response = await updateReward(reward);
//     console.log("response:"+response);
//     if (response.user == "success"){
//       setRewardUpdatedText("Saved");
//     }else{
//       Alert.alert("Error updating reward", "We're having some issues on our end. Please try again later.");
//     }
//   }catch (err){
//     Alert.alert("Error updating reward", "We're having some issues on our end. Please try again later.")
//     console.error(err);
//   }finally{
//     setLoading(false);
//   }
//   router.dismiss();
// }


export default function UpdateBusinessProfile({userId, businessInterface}: Props) {
  const business = useBusiness(businessInterface);
  const [loading, setLoading] = useState(false);
  const imageEdited = useRef(false);
  const bannerEdited = useRef(false);
  const [charCount, setCharCount] = useState(0);
  const {t} = useTranslation();
  const [editingLocation, setEditingLocation] = useState(false);
  // const location = new LocationHook(business.latitude? business.latitude: DEFAULT_LATITUDE, business.longitude? business.longitude: DEFAULT_LONGITUDE);
  const saveLocation = (location: LocationHook) =>{
    business.setLatitude(location.location.latitude);
    business.setLongitude(location.location.longitude);
    business.setStreetAddress(location.streetAddress);
    setEditingLocation(false);
  }
  const saveBusiness = async () => {
    setLoading(true);
    try{
      let bannerUpdated, imageUpdated;
      if (imageEdited && business.imageUrl){
        bannerUpdated = await updateBusinessImage(userId, business.imageUrl);
      }
      if (bannerEdited && business.bannerUrl){
        imageUpdated = await updateBusinessBanner(userId, business.bannerUrl);
      }
      const businessUpdated = await updateBusiness(userId, business.getBusiness());
      if (!(businessUpdated.user=="success" && businessUpdated.user=="success" && businessUpdated.user=="success")){
        Alert.alert("Error updating info", "A server issue occurred. Please try again later.")
      }
    }catch(err){
      console.error("Error updating customer:"+err);
      Alert.alert("Error updating info", "A server issue occurred. Please try again later.")
    }    
    setLoading(false);
    router.back();
  }
  console.log("business:"+JSON.stringify(business.getBusiness()))
  // const saveRewardUpdate = () => {
  //   //Check its valid
  //   if (reward.name != "" &&  reward.points != -1){
  //     console.log("Saving...")
  //     if (imageEdited.current){
  //       updateRewardImage(reward.id, reward.image_url)
  //     }
  //     setLoading(true);
  //     performUpdateReward(reward, setLoading, setRewardUpdatedText);
  //   }else{
  //     console.log("error")
  //     if(reward.name == ""){
  //       Alert.alert("Set Name", "You need to give the event a name.")
  //     }else{
  //       Alert.alert("Set Point Count", "You need to give the event a point count.")
  //     }
  //   }
  // }

  let bannerChoice;
  if (business.bannerUrl){
    bannerChoice = (<Image source={{ uri: business.bannerUrl }} style={styles.banner} />);
  }else{
    bannerChoice = (<View style={styles.frame7}>
    <Text testID="15:1620" style={styles.addPhoto}>
      {`Add photo`}
    </Text>
    <Text testID="104:945" style={styles.photoSpecification}>
      {`*Must be .jpeg, .jpg or .png`}
    </Text>
    </View>);
  }
  const editImage = useCallback( () =>{            
              imageEdited.current = true;
              pickImage((uri: string) =>{business.setImageUrl(uri);}, [1, 1]);
            }, []);
  const editBanner = useCallback( () =>{            
              bannerEdited.current = true;
              pickImage((uri: string) =>{business.setBannerUrl(uri);}, [3, 1]);
            }, []);
  if (loading) return <Loading/>
  if (editingLocation) return <LocationChooser
         latitude={business.latitude? business.latitude: DEFAULT_LATITUDE}
          longitude={business.longitude? business.longitude: DEFAULT_LONGITUDE} 
          initialStreetAddress={business.streetAddress? business.streetAddress: ''} 
          onSave={saveLocation}/>
  console.log(JSON.stringify(business))
  
  return (
    <SafeAreaProvider>
    <SafeAreaView testID={"53:204"} style={styles.root}>
      <Stack.Screen options={{ title: business.name, headerBackButtonDisplayMode: 'minimal', 
      headerShadowVisible: false, headerTintColor: 'black', 
      headerTitleStyle:{fontSize: 24, fontFamily: FONTS.BALOO_BHAI, fontWeight: 800, color: 'rgba(58, 73, 117, 1)'}, headerTitleAlign: 'center'
       }} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.body}>
            <View style={styles.businessBox}>
            <Pressable testID="15:1618" onPress={editBanner} style={styles.imagePicker}>
                {bannerChoice}
            </Pressable>
            <View style={styles.textBody}>
              <View style={styles.titleAndImageBox}>
                    <View testID="154:1066" style={styles.imageBox}>
                      {business.imageUrl?<Image source={{uri: business.imageUrl}} style={styles.image}/>: <DefaultLogo width={80} height={80}/>}
                      <Pressable style={styles.pencil} onPress={editImage}><Pencil/></Pressable>
                    </View>
                    <View style={styles.titleBox}>
                      <TextInput style={[UNIVERSAL_STYLES.textInputBox, UNIVERSAL_STYLES.bodyText, {height: 'auto'}]} placeholderTextColor={COLOURS.DARK_GRAY} placeholder={'Business name'} value={business.name} onChangeText={business.setName}/>
                      <LocationWidget location={business.streetAddress? business.streetAddress: t('currentLocation')} setFindLocation={setEditingLocation}/>
                    </View>
                </View>
              <View testID="15:1627" style={styles.descriptionBox}>
                <View testID="15:1649" style={styles.descriptionTextBox}>
                  <TextInput testID="15:1626" style={styles.descriptionHere} multiline={true} maxLength={50} placeholder='Add description here...' value={business.description?business.description: ''} placeholderTextColor={'#787792'} onChangeText={(description) => {business.setDescription(description);setCharCount(description.length)}}/>
                  <Text testID="15:1652" style={styles.charCount}>
                    {charCount}/50
                  </Text>
                </View>
              </View>
              </View>
              </View>

              <View style={styles.saveContainer}>
                <Pressable onPress={saveBusiness} style={styles.saveButton}>
                  <Text style={[UNIVERSAL_STYLES.h2Text, {fontSize: 20}]}>{t("save")}</Text>
                </Pressable>
              </View>
            </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    height: '100%',
    width: SCREEN_WIDTH,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  businessBox: {
    width: '100%',
    height: 'auto',
    rowGap: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  scroll: {
    flex: 1,
    width: SCREEN_WIDTH,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBody: {
    width: '85%',
    rowGap: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: "flex-start",
  },
  banner:{
    alignSelf: 'stretch',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  image:{
    alignSelf: 'stretch',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: '100%'
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 80,
    width: 80,
    // backgroundColor: 'blue'
  },
  imagePicker: {
    alignSelf: 'stretch',
    display: 'flex',
    maxHeight: 200,
    maxWidth: '100%',
    borderWidth: 1
  },
  addEvent: {
    gridRowStart: '1',
    gridRowEnd: 'span 1',
    gridColumnStart: '2',
    gridColumnEnd: 'span 1',
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  plus:{
    position: 'absolute',
    left: 0,
  },
  addPhoto: {
    width: '100%',
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'center',
  },
  frame7: {
    alignSelf: 'stretch',
    height: '100%',
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 1)',
    borderWidth: 3,
    borderColor: '#787792',
    borderStyle: 'dashed',
  },
  frame4: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    alignSelf: 'stretch',
  },
  name: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  nameHere: {
    color: '#000000ff',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  itemBox: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 10,
    alignItems: 'center',
    columnGap: 5,
  },
  nameBox: {
    width: 'auto',
    maxWidth: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'flex-start',
    borderRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  description: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    color: '#787792',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  charCount: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    color: 'rgba(120, 119, 146, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  descriptionBox: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  descriptionTextBox: {
    position: 'relative',
    display: 'flex',
    height: 128,
    padding: 10,
    alignSelf: 'stretch',
    gridTemplateRows: 'repeat(4, minmax(0px, 1fr))',
    gridTemplateColumns: 'repeat(4, minmax(0px, 1fr))',
    borderRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  descriptionHere:{
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  ptsCountHere: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame36: {
    flexDirection: 'row',
    width: 320,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  pointBox: {
    width: 'auto',
    maxWidth: '100%',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  pts: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  photoSpecification: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  addToCart: {
    color: 'rgba(28, 39, 76, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  nameBox4: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(28, 39, 76, 1)',
  },
  saveContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    padding: 10
  },
  saveButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: COLOURS.DARK_BLUE,
    borderRadius: 25,
  },
  titleAndImageBox:{
    flexDirection: 'row',
    columnGap: 20
  },
  titleBox: {
    flexDirection: 'column',
    rowGap: 10,
    flex: 1
  },
  pencil: {
    position: 'absolute',
  },
});

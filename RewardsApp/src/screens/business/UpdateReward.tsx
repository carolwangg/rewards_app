import FONTS from '@/constants/fonts';
import { Stack, router } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Image, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Reward } from '@/constants/interfaces';
import { deleteReward, updateReward, updateRewardImage } from '@/services/apiCalls';
import { useReward } from '@/constants/useReward';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Loading from '@/components/Loading';
import { pickImage } from '@/helpers/imagePicker';
import COLOURS from '@/constants/colours';
import { useTranslation } from 'react-i18next';
type Props={
  prevReward: Reward;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const performUpdateReward = async(reward: any, setLoading: Function, setRewardUpdatedText: Function) => {
  try{
    setLoading(true);
    const response = await updateReward(reward);
    console.log("response:"+response);
    if (response.user == "success"){
      setRewardUpdatedText("Saved");
    }else{
      Alert.alert("Error updating reward", "We're having some issues on our end. Please try again later.");
    }
  }catch (err){
    Alert.alert("Error updating reward", "We're having some issues on our end. Please try again later.")
    console.error(err);
  }finally{
    setLoading(false);
  }
  router.dismiss();
}

const performDeleteReward = async(rewardId: string, setLoading: Function) => {
  try{
    setLoading(true);
    const response = await deleteReward(rewardId);
    console.log("response:"+response);
    if (response.user !== "success"){
      Alert.alert("Error updating reward", "We're having some issues on our end. Please try again later.");
    }
  }catch (err){
    Alert.alert("Error updating reward", "We're having some issues on our end. Please try again later.")
    console.error(err);
  }finally{
    setLoading(false);
  }
  router.dismiss();
}


export default function UpdateReward({prevReward}: Props) {
  const reward = useReward(prevReward);
  const [charCount, setCharCount] = useState(0);
  const [rewardUpdatedText, setRewardUpdatedText] = useState("Save");
  const [loading, setLoading] = useState(false);
  const imageEdited = useRef(false);
  const {t} = useTranslation();
  const currentValue = useRef(new Animated.Value(0)).current;
  const currentBgColor = currentValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 1)', 'rgba(28, 39, 76, 1)']
  })
  const currentTextColor = currentValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1C274C', '#B6BED8']
  })

  const saveRewardUpdate = () => {
    //Check its valid
    if (reward.name != "" &&  reward.points != -1){
      console.log("Saving...")
      if (imageEdited.current){
        updateRewardImage(reward.id, reward.image_url)
      }
      setLoading(true);
      performUpdateReward(reward, setLoading, setRewardUpdatedText);
    }else{
      console.log("error")
      if(reward.name == ""){
        Alert.alert("Set Name", "You need to give the event a name.")
      }else{
        Alert.alert("Set Point Count", "You need to give the event a point count.")
      }
    }
  }
  let imageChoice;
  if (reward.image_url){
    imageChoice = (<Image source={{ uri: reward.image_url }} style={styles.image} />);
  }else{
    imageChoice = (<View style={styles.noPhotoBox}>
    <Text testID="15:1620" style={styles.addPhoto}>
      {`Add photo`}
    </Text>
    <Text testID="104:945" style={styles.photoSpecification}>
      {`*Must be .jpeg, .jpg or .png`}
    </Text>
    </View>);
  }
  if (loading) return <Loading/>
  return (
    <SafeAreaProvider>
    <SafeAreaView testID={"53:204"} style={styles.root}>
      <Stack.Screen options={{ title: reward.name, headerBackButtonDisplayMode: 'minimal', 
      headerShadowVisible: false, headerTintColor: 'black', 
      headerTitleStyle:{fontSize: 24, fontFamily: FONTS.BALOO_BHAI, fontWeight: 800, color: 'rgba(58, 73, 117, 1)'}, headerTitleAlign: 'center'
       }} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.body}>
            <Pressable testID="15:1618" onPress={() => {imageEdited.current = true; pickImage(reward.setimage_url)}} style={styles.imagePicker}>
                {imageChoice}
            </Pressable>
            <View style={styles.textBody}>
              <View testID="15:1623" style={styles.nameRow}>
                <TextInput testID="15:1626" style={[styles.nameHere, styles.nameBox]} placeholder='Add name' placeholderTextColor={'#787792'} value={reward.name} onChangeText={(name: string) => {reward.setName(name)}}/> 
              <Text style={{color: "#FF8383"}}>*</Text>
              </View>
              <View testID="15:1627" style={styles.descriptionBox}>
                <View testID="15:1649" style={styles.descriptionTextBox}>
                  <TextInput testID="15:1626" style={styles.descriptionHere} multiline={true} maxLength={50} placeholder='Add description here...' value={reward.description} placeholderTextColor={'#787792'} onChangeText={(description) => {reward.setDescription(description);setCharCount(description.length)}}/>
                  <Text testID="15:1652" style={styles.charCount}>
                    {charCount}/50
                  </Text>
                </View>
              </View>
              <View testID="15:1631" style={styles.frame36}>
                <TextInput testID="15:1626" style={[styles.ptsCountHere, styles.pointBox]} keyboardType="numeric" placeholder='Add points needed' value={reward.points.toString()} placeholderTextColor={'#787792'} onChangeText={(pointCount) => {reward.setPoints((Number) (pointCount));}}/>
                <Text testID="15:1638" style={styles.pts}>
                  {`pts`}
                </Text>
                <Text style={{color: "#FF8383"}}>*</Text>
              </View>
              <View style={styles.saveContainer}>
                <Pressable onPress={()=>{performDeleteReward(reward.id, setLoading)}}>
                  <View testID="104:910" style={[styles.deleteButton]}>
                    <Text testID="104:911" style={styles.deleteButtonText}>
                        {t('delete')}
                    </Text>
                  </View>
                </Pressable>
                <Pressable onPress={saveRewardUpdate}>
                  <Animated.View testID="104:910" style={[styles.nameBox4, 
                  {backgroundColor: currentBgColor,}
                  ]}>
                    <Animated.Text testID="104:911" style={[styles.addToCart, {color: currentTextColor}]}>
                        {rewardUpdatedText}
                    </Animated.Text>
                  </Animated.View>
                </Pressable>                
              </View>
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
  scroll: {
    height: 'auto',    
    width: SCREEN_WIDTH,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    alignSelf: 'stretch',
    rowGap: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    marginBottom: 10
  },
  textBody: {
    width: '85%',
    rowGap: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
  },
  image:{
    alignSelf: 'stretch',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  imagePicker: {
    alignSelf: 'stretch',
    display: 'flex',
    maxHeight: 300,
    maxWidth: '100%',
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
  noPhotoBox: {
    alignSelf: 'stretch',
    height: '100%',
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
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
    width: 320,
    padding: 10,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    rowGap: 10,
  },
  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLOURS.RED,
    borderColor: COLOURS.DARK_RED, 
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  }, 
  deleteButtonText:{
    color: COLOURS.WHITE,
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 18
  }
});

import FONTS from '@/fonts';
import * as ImagePicker from 'expo-image-picker';
import { Stack, router } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Image, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SCREEN_HEIGHT = Dimensions.get('window').height
const TABBAR_HEIGHT = 60


type Props={
id: Number,
prevName: string,
prevDescription: string,
prevPoints: Number
}
export default function EditItem({id, prevName, prevDescription, prevPoints}: Props) {
  const [image, setImage] = useState("");
  const [name, setName] = useState(prevName);
  const [description, setDescription] = useState(prevDescription);
  const [pointCount, setPointCount] = useState(prevPoints);
  const [charCount, setCharCount] = useState(0);
  const [eventAdded, setEventAdded] = useState(false);
  const [eventAddedText, setEventAddedText] = useState("Save");
  const [loading, setLoading] = useState(false);
  const backendUrl = "http://10.0.0.91:8080/rewards/update";
  // const onFocusEffect = useCallback(() => {
  //   AvoidSoftInput.setAdjustPan();
  //   return () => {
  //     AvoidSoftInput.setDefaultAppSoftInputMode();
  //   };
  // }, []);
  
  // useFocusEffect(onFocusEffect);
  const pickImage = async () => {
    // Launch the image library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const currentValue = useRef(new Animated.Value(0)).current;
    const currentBgColor = currentValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 1)', 'rgba(28, 39, 76, 1)']
    })
    const currentTextColor = currentValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#1C274C', '#B6BED8']
    })

    const saveEvent = async (name: string, pointCount: Number) => {
    try {
      const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        businessId: id,
        eventId: id,
        name: name,
        description: description,
        pointCount: pointCount,
        image: image,
        }),
      });
      const json = await response.json();
      console.log(json);
      router.replace("/(tabs)/(home)/landing")
    } catch (error) {
      Alert.alert("Error saving event", "We're having some issues on our end. Please try again later.")
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

    const saveEventInteract = () => {
    // Animate the load
    if (!eventAdded) {
      //Check its valid
      if (name != "" && pointCount != -1){
        console.log("saving...")
        setLoading(true);
        saveEvent(name, pointCount);
      }else{
        console.log("error")
        if(name == ""){
          Alert.alert("Set Name", "You need to give the event a name.")
        }else{
          Alert.alert("Set Point Count", "You need to give the event a point count.")
        }
      }
    } 
  }
  let imageChoice;
  if (image){
    imageChoice = (<Image source={{ uri: image }} style={styles.image} />);
  }else{
    imageChoice = (<View style={styles.frame7}>
                <Text testID="15:1620" style={styles.addPhoto}>
                  {`Add photo`}
                </Text>
                <Text testID="104:945" style={styles.photoSpecification}>
                  {`*Must be .jpeg, .jpg or .png`}
                </Text>
                </View>);
  }

  return (
    <View testID={"53:204"} style={styles.root}>
      <Stack.Screen options={{ title: prevName, headerBackButtonDisplayMode: 'minimal', 
      headerShadowVisible: false, headerTintColor: 'black', 
      headerTitleStyle:{fontSize: 24, fontFamily: FONTS.BALOO_BHAI, fontWeight: 800, color: 'rgba(58, 73, 117, 1)'}, headerTitleAlign: 'center'
       }} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableResetScrollToCoords={false}
          bounces={false}
          contentInsetAdjustmentBehavior="always"
          overScrollMode="always"
          showsVerticalScrollIndicator={true}>
          <ScrollView style={{width: '100%', height: '100%', boxSizing: 'border-box'}} contentContainerStyle={styles.phone}>
            {/* <View testID="15:1539" style={styles.frame34}>
                <Link href="/about" style={styles.plus}>
                  <Ionicons name={'chevron-back-outline'} color={'black'} size={30}/>
                </Link>
                
                <Text testID="15:1540" style={styles.addEvent}>
                  {`Add Event`}
                </Text>
            </View> */}
            <View style={styles.body}>
              <View testID="15:1622" style={styles.frame38}>
                <Pressable testID="15:1618" onPress={pickImage} style={styles.imagePicker}>
                    {imageChoice}
                </Pressable>
                <View testID="15:1623" style={styles.frame35}>
                  <View testID="15:1625" style={styles.frame31}>
                    <TextInput testID="15:1626" style={styles.nameHere} placeholder='Add name' placeholderTextColor={'#787792'} value={name} onChangeText={setName}/>
                  </View> 
                  <Text style={{color: "#FF8383"}}>*</Text>
                </View>
                <View testID="15:1627" style={styles.frame37}>
                  <View testID="15:1649" style={styles.frame312}>
                    <TextInput testID="15:1626" style={styles.descriptionHere} multiline={true} maxLength={50} placeholder='Add description here...' placeholderTextColor={'#787792'} value={description} onChangeText={(description) => {setDescription(description);setCharCount(description.length)}}/>
                    <Text testID="15:1652" style={styles.charCount}>
                      {charCount}/50
                    </Text>
                  </View>
                </View>
                <View testID="15:1631" style={styles.frame36}>
                  <View testID="15:1640" style={styles.frame313}>
                    <TextInput testID="15:1626" style={styles.ptsCountHere} keyboardType="numeric" placeholder='Add points needed' placeholderTextColor={'#787792'} onChangeText={(pointCount) => {setPointCount((Number) (pointCount));}}/>
                  </View>
                  <Text testID="15:1638" style={styles.pts}>
                    {`pts`}
                  </Text>
                  <Text style={{color: "#FF8383"}}>*</Text>
                </View>
                <View style={styles.saveContainer}>
                  <Pressable onPress={saveEventInteract}>
                    <Animated.View testID="104:910" style={[styles.frame314, 
                    {backgroundColor: currentBgColor,}
                    ]}>
                        <Animated.Text testID="104:911" style={[styles.addToCart, {color: currentTextColor}]}>
                            {eventAddedText}
                        </Animated.Text>
                    </Animated.View>
                  </Pressable>
                  
                </View>
              </View>
              
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    height: '100%',
    // height: SCREEN_HEIGHT - TABBAR_HEIGHT,
    borderColor: 'green',
    borderWidth: 1,
    
  },
  phone: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'orange',
    borderWidth: 2,
    boxSizing: 'border-box'
  },
  body: {
    width: '89%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    borderColor: 'red',
    borderWidth: 1,
  },
  image:{
    alignSelf: 'stretch',
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
  imagePicker: {
    width: '100%',
    aspectRatio: 1,
    display: 'flex'
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
  frame34: {
    display: 'flex', 
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    top: 0,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    marginBottom: 10,
  },
  plus:{
    position: 'absolute',
    left: 0,
  },
  frame28: {
    flexDirection: 'row',
    width: 393,
    height: 60,
    paddingTop: 0,
    paddingLeft: 6,
    paddingBottom: 0,
    paddingRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 75,
    columnGap: 75,
    flexShrink: 0,
    backgroundColor: 'rgba(217, 217, 217, 1)',
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
    padding: 10,
    alignItems: 'center',
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
  frame38: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderWidth: 2,
    borderColor: 'black'
  },
  frame35: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 10,
    alignItems: 'center',
    columnGap: 5,
    borderWidth: 2,
    borderColor: 'black'
  },
  frame31: {
    width: '50%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'flex-start',
    borderRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
    borderWidth: 2,
    borderColor: 'black'
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
  frame37: {
    width: 320,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
    borderWidth: 2,
    borderColor: 'black'
  },
  frame312: {
    position: 'relative',
    display: 'flex',
    height: 128,
    padding: 10,
    alignSelf: 'stretch',
    gridTemplateRows: 'repeat(4, minmax(0px, 1fr))',
    gridTemplateColumns: 'repeat(4, minmax(0px, 1fr))',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  descriptionHere:{
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderColor: 'orange',
    borderWidth: 2,
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  ptsCountHere: {
    color: '#787792',
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
  frame313: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingRight: 10,
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  frame314: {
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
  },
});

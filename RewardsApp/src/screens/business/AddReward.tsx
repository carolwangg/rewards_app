import FONTS from '@/constants/fonts';
import * as ImagePicker from 'expo-image-picker';
import { Stack, router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Image, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addReward } from '@/services/apiCalls';
import Loading from '@/components/Loading';
import { Reward } from '@/constants/interfaces';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('window').width;
const performSaveEvent = async (reward: Reward, setLoading: Function) => {
  try {
    console.log("start adding reward")
    const response = await addReward(reward);
    console.log(response.body);
  } catch (error) {
    Alert.alert("Error saving event", "We're having some issues on our end. Please try again later.")
    console.error(error);
  } finally {
    setLoading(false);
  }
  router.dismiss()
};

type Props={
  userId: string;
}

export default function AddReward({userId}: Props) {
  const [image, setImage] = useState(""); //image uri
  const name = useRef("");
  const description = useRef("");
  const points = useRef(0);
  const [charCount, setCharCount] = useState(0);
  const [eventAdded, setEventAdded] = useState(false);
  const [eventAddedText, setEventAddedText] = useState("Save");
  const [loading, setLoading] = useState(false);
  console.log("name:"+name)
  const onNameChange = useCallback((newName: string) => {
    name.current = newName;
  }, []);

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

    const saveEventInteract = () => {
    // Animate the load
    if (!eventAdded) {
      //Check its valid
      if (name.current != "" && points.current != -1){
        console.log("saving...")
        setLoading(true);
        performSaveEvent({id: "", business_id: userId, name: name.current, points: points.current, description: description.current, image_url: image}, setLoading);
      }else{
        console.error("error")
        if(name.current == ""){
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
    imageChoice = (<View style={styles.photoBox}>
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
      <Stack.Screen options={{ title: "Add Event", headerBackButtonDisplayMode: 'minimal', 
      headerShadowVisible: false, headerTintColor: 'black', 
      headerTitleStyle:{fontSize: 24, fontFamily: FONTS.BALOO_BHAI, fontWeight: 800, color: 'rgba(58, 73, 117, 1)'}, headerTitleAlign: 'center'
       }} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.body}>
                <Pressable testID="15:1618" onPress={pickImage} style={styles.imagePicker}>
                    {imageChoice}
                </Pressable>

                <View style={styles.textBody}>
                <View testID="15:1623" style={styles.nameFrame}>
                  <TextInput testID="15:1626" style={[styles.nameHere, styles.nameBox]} placeholder='Add name' placeholderTextColor={'#787792'} onChangeText={onNameChange}/>
                  <Text style={{color: "#FF8383"}}>*</Text>
                </View>
                <View testID="15:1627" style={styles.frame37}>
                  <View testID="15:1649" style={styles.nameBox2}>
                    <TextInput testID="15:1626" style={styles.descriptionHere} multiline={true} maxLength={50} placeholder='Add description here...' placeholderTextColor={'#787792'} onChangeText={(newDescription) => {description.current=newDescription;setCharCount(newDescription.length)}}/>
                    <Text testID="15:1652" style={styles.charCount}>
                      {charCount}/50
                    </Text>
                  </View>
                </View>
                <View testID="15:1631" style={styles.nameFrame}>
                  <TextInput testID="15:1626" style={[styles.ptsCountHere, styles.nameBox, {width: 'auto'}]} keyboardType="numeric" placeholder='Add points needed' placeholderTextColor={'#787792'} onChangeText={(pointCount) => {points.current = ((Number) (pointCount));}}/>
                  <Text testID="15:1638" style={styles.pts}>
                    {`pts`}
                  </Text>
                  <Text style={{color: "#FF8383"}}>*</Text>
                </View>
                <View style={styles.saveContainer}>
                  <Pressable onPress={saveEventInteract}>
                    <Animated.View testID="104:910" style={[styles.saveButton, 
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
  photoBox: {
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 1)',
    borderWidth: 3,
    borderColor: '#787792',
    borderStyle: 'dashed',
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
  nameFrame: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    columnGap: 5,
  },
  nameBox: {
    width: '100%',
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
  frame37: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  nameBox2: {
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
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    maxWidth: '100%',
    height: '100%',
  },
  ptsCountHere: {
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
  saveButton: {
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

import FONTS from '@/constants/fonts';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';


const defaultIcon = require('@/assets/images/temp/card-0.png');
const SCREEN_HEIGHT = Dimensions.get('window').height
const TABBAR_HEIGHT = 60

type Props={
  id: Number,
  name: string
}
export default function Info({id, name}: Props) {
  let description = "Get a 15% discount on all salon services this weekend only! Treat yourself to a relaxing experience and save money at the same time. Book your appointment now!";
  let pointCount = "250";
  const [eventAdded, setEventAdded] = useState(false);
  const [eventAddedText, setEventAddedText] = useState("Add to cart");

  const currentValue = useRef(new Animated.Value(0)).current;
  const currentBgColor = currentValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 1)', 'rgba(28, 39, 76, 1)']
  })
  const currentTextColor = currentValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1C274C', '#B6BED8']
  })

  const addToCart = () => {
    // Animate the update
    if (!eventAdded) {
        setEventAddedText("Added");
        Animated.timing(currentValue, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
      setEventAdded(true);
    } else {
        setEventAddedText("Add to cart");
        Animated.timing(currentValue, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();
      setEventAdded(false)
    }
  }

  return (
    <View testID={"104:955"} style={styles.root}>
      <Stack.Screen options={{ title: name, headerBackButtonDisplayMode: 'minimal', 
      headerShadowVisible: false, headerTintColor: 'black', 
      headerTitleStyle:{fontSize: 24, fontFamily: FONTS.GOWUN_DODUM}, headerTitleAlign: 'center'
       }} />
        <View testID={"104:955"} style={styles.phone}>
            <View testID={"104:955"} style={styles.body}>
                {/* <View testID="104:856" style={styles.titleBox}>
                    <View testID="104:856" style={styles.backIcon}>
                        <Ionicons name={'chevron-back-outline'} color={'black'} size={24}/>
                    </View>
                    <Text testID="104:860" style={styles.name}>
                    {name}
                    </Text>
                    <View testID="104:856" style={styles.thirdDiv}/>                    
                </View> */}
                <View testID="104:873" style={styles.frame38}>
                    <Image source={defaultIcon} style={styles.frame37}/>
                    <View testID="104:904" style={styles.frame32}>
                        <Text testID="104:905" style={styles.description}>
                            {description}
                        </Text>
                    </View>
                    <View testID="104:878" style={styles.frame36}>
                        <View testID="104:914" style={styles.frame57}>
                            <Text testID="104:880" style={styles.count}>
                                {pointCount}
                            </Text>
                            <Text testID="104:881" style={styles.pts}>
                                {`pts`}
                            </Text>
                        </View>
                        <View style={styles.addContainer}>
                          <Pressable onPress={addToCart}>
                            <Animated.View testID="104:910" style={[styles.frame312, 
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
            </View>
        </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    height: SCREEN_HEIGHT - TABBAR_HEIGHT
  },
  phone: {
    // width: 393,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
  },
  body: {
    paddingTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '89%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    borderColor: 'red',
    borderWidth: 1,
  },
  name: {
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '800',
    flex: 3,
  },
  backIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
  },
  thirdDiv: {
    flex: 1,
  },
  titleBox: {
    flexDirection: 'row',
    width: 364,
    height: 38,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    borderWidth: 2,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
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
    borderColor: 'black',
    borderWidth: 2
  },
  frame37: {
    width: 310,
    height: 230,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: 'black',
    borderWidth: 2
  },
  frame31: {
    flexDirection: 'row',
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexShrink: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
    borderColor: 'black',
    borderWidth: 2
  },
  description: {
    width: 296,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame32: {
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
  frame36: {
    flexDirection: 'row',
    width: 320,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 90,
    columnGap: 90,
  },
  frame57: {
    flexDirection: 'row',
    paddingTop: 6,
    paddingLeft: 0,
    paddingBottom: 6,
    paddingRight: 0,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  addToCart: {
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame312: {
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
  addContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }
});

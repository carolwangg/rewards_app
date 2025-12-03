import Plus from "@/assets/images/plus.svg";
import FONTS from "@/constants/fonts";
import { CustomerReward } from "@/constants/interfaces";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Image } from "expo-image";
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
type Props = {
  cart: string;
  setCart: Function,
  setCartReward: Function
  reward: CustomerReward
};

type ListInteriorCustomerProps = {
  reward: CustomerReward
};

interface RotatingViewProps {
  style?: StyleProp<ViewStyle>;
  cart: string;
  updateCart: Function;
  itemId: string;
  selected: boolean;
  setSelected: Function;
}

const RotatingView: React.FC<PropsWithChildren<RotatingViewProps>> = props => {
  const currentAnglePlus = useRef(new Animated.Value(0)).current;
  const currentOpacityPlus = useRef(new Animated.Value(1)).current;
  const currentAngleStrPlus = currentAnglePlus.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '90deg']
  })
  const currentAngleCheck = useRef(new Animated.Value(-90)).current;
  const currentOpacityCheck = useRef(new Animated.Value(0)).current;
  const currentAngleStrCheck = currentAngleCheck.interpolate({
    inputRange: [-90, 0],
    outputRange: ['-90deg', '0deg']
  })
  const animateCheck = () => {
    // Animate the update
    if (!props.selected) {
      console.log("animated selected: "+props.itemId)
      console.log("selected: "+props.selected);
      console.log("animated cart: "+props.cart)
      Animated.timing(currentAnglePlus, {
        toValue: 90,
        duration: 500,
        useNativeDriver: true,
      }).start();
    Animated.timing(currentOpacityPlus, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    Animated.timing(currentAngleCheck, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    Animated.timing(currentOpacityCheck, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      
    } else {
      console.log("animated removed: "+props.itemId);
      console.log("selected: "+props.selected);
      console.log("animated cart: "+props.itemId);
      Animated.timing(currentAnglePlus, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    Animated.timing(currentOpacityPlus, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    Animated.timing(currentAngleCheck, {
        toValue: -90,
        duration: 500,
        useNativeDriver: true,
      }).start();
    Animated.timing(currentOpacityCheck, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      
    }
  };

  useEffect(()=>{
    if(props.selected && props.cart != props.itemId){
       console.log(props.cart); console.log("effect used(remove from cart)"); 
       console.log("cart props:"+props.cart); 
       animateCheck(); 
       props.setSelected(false);
    }else if (!props.selected && props.cart == props.itemId){
      console.log(props.cart); console.log("effect used(add to cart)"); 
      console.log("cart props:"+props.cart); 
      animateCheck(); 
      props.setSelected(true);
    }
    }, [props.cart]);

  return (
    <View style={styles.icon_box}> 
      <Pressable onPress={async()=>{await props.updateCart(); animateCheck();}}>
        <Animated.View // Special animatable View
          style={[
            props.style,
            {transform: [
            { rotate: currentAngleStrPlus }, // Rotates the box by currentAngle degrees
            ]}, {opacity: currentOpacityPlus,}
            ]
          }
          id={'holymoly'}
          >
            <View  style={styles.icon} >
              <Plus width={30} height={30} />
              {props.children}
            </View>
        </Animated.View>
        <Animated.View // Special animatable View
          style={[
            props.style, 
            styles.successIconBox,
            {transform: [
            { rotate: currentAngleStrCheck }, // Rotates the box by currentAngle degrees
            ]}, {opacity: currentOpacityCheck,}
            ]
          }
          id={'gollygee'}
          >
            <View style={styles.successIcon}>
              <Ionicons name={'checkmark-outline'} color={'black'} size={30}/>
              {props.children}
            </View>
      </Animated.View>
      </Pressable>
    </View>
  );
};

export default function ListItem({cart, setCart, setCartReward, reward}: Props) {
  const [selected, setSelected] = useState(false);
  const updateCart = async() => {
    console.log("prev selected:"+selected);
    const temp = !selected;
    console.log("temp now:" + temp)
    await setSelected(temp);
    // await delay(3000);
    if (temp){
      setCart(reward.id);
      setCartReward(reward);
    }else{
      setCart("reward_0");
      setCartReward(null);
    }
  }
  return <View style = {styles.item}>
            <Link style={styles.section} href={{pathname: './item/[item]',
        params: { item: reward.id, reward: JSON.stringify(reward)}}}>
              <ListInteriorCustomer reward={reward}/>
            </Link>
            <RotatingView selected={selected} setSelected={setSelected} cart={cart} itemId={reward.id} updateCart={updateCart}/>
          </View>
}

export function ListInteriorCustomer ({reward}: ListInteriorCustomerProps) {
  console.log("item: "+reward.name+", url:"+reward.image_url)
  return  <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
            <View style={styles.detailsBox}>
              <View style={[styles.photoBox, {display: reward.image_url? 'flex': 'none'}]}>
                <Image source={reward.image_url} style={styles.image}/>
              </View>
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{reward.name}</Text>
                <Text style={styles.text} numberOfLines={2} ellipsizeMode='tail'>{reward.description}</Text>
                <View testID="175:395" style={styles.pointFrame}>
                  <Text testID="175:396" style={styles.pointText}>
                    {`Points: `}{reward.points}
                  </Text>
                  <Text testID="175:397" style={styles.distanceText}>
                    {reward.distance}{`km`}
                  </Text>
                </View>                
              </View>
            </View>
          </View>
}

const styles = StyleSheet.create({
  item:{
    flex: 1,
    display: "flex",
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 'auto',
    maxHeight: 120,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgb(255, 255, 255)',
    columnGap: 10,
    borderWidth:1
  },
  section:{
    display: 'flex',
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  detailsBox:{
    display: 'flex',
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: 10,
    backgroundColor: 'rgb(255, 255, 255)',
    alignSelf: 'stretch',
  },
  image:{
    width: '100%',
    height: '100%',
    borderRadius: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  photoBox:{
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  info:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    rowGap: 5,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  text: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000",
    maxWidth: '100%',
  },
  title: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    color: "#000000",
  },
  icon_box: {
    position: "relative",
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  } ,
  icon: {
    position: "relative",
    borderRadius: '100%',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edededff',
  } ,
  successIconBox: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    backgroundColor: 'rgba(183, 230, 130, 1)',
    borderRadius: '100%',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading:{
    backgroundColor: 'rgba(237, 237, 237, 1)',
    borderRadius: 5
  },
  pointText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  distanceText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  pointFrame: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  });
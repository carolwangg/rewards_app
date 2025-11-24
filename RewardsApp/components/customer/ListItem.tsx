import Plus from "@/assets/images/plus.svg";
import FONTS from "@/fonts";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { PropsWithChildren, useRef } from 'react';
import { Animated, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
  title: string;
  description: string;
  price: number;
  itemId: number;
};

type ListInteriorProps = {
  title: string;
  description: string;
  price: number;
};

interface RotatingViewProps {
  style?: StyleProp<ViewStyle>;
}

const RotatingView: React.FC<PropsWithChildren<RotatingViewProps>> = props => {
  const displayCheck = useRef("none");
  const currentAnglePlus = useRef(new Animated.Value(0)).current;
  const currentOpacityPlus = useRef(new Animated.Value(1)).current;
  var add = true;
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
  const updateCart = () => {
    // Animate the update
    if (add) {
      console.log("added to cart")
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
      add = false;
    } else {
      console.log("removed from cart");
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
      add = true;
    }
    
  };
  return (
    <View style={styles.icon_box}> 
      <Pressable onPress={updateCart}>
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

export default function ListItem({title, description, price, itemId}: Props) {
  function addToCart(){
    // setCartSize(cartSize + 1);
    // cart.put(itemID)
  }
  
  function getItemNameFromId(id: number): string {
    const items: Record<number, string> = {
      1: "Free Coffee",
      2: "Discount Voucher",
      3: "Gift Card",
      4: "Movie Ticket",
      5: "Spa Session",
    };
    return items[id] || "Unknown Item";
  }
  
  const itemName = getItemNameFromId(itemId);
    return <View style = {styles.item}>
              <Link style={styles.section} href={{pathname: '/[item]',
          params: { item: itemId, name: itemName }}}>
                <ListInterior title={title} description={description} price={price}></ListInterior>
              </Link>
              <RotatingView/>
            </View>
  }

export function ListInterior ({title, description, price}: ListInteriorProps) {
  return <View style={{width: '100%'}}><View style={styles.detailsBox}>
            <View style={styles.photoBox}>
              <View style={styles.photo}/>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.text}>{description}</Text>
            </View>
          </View>
          <Text style={styles.text}>Points needed: {price} pts</Text>
        </View>
}
const styles = StyleSheet.create({
  item:{
    display: "flex",
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 150,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgb(255, 255, 255)',
    columnGap: 10,
  },
  section:{
    display: 'flex',
    flex: 3,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 255, 81, 1)',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  detailsBox:{
    display: 'flex',
    flex: 3,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(73, 16, 16, 1)',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  photoBox:{
    flex: 1,
    backgroundColor: 'rgba(237, 237, 237, 1)',
  },

  photo:{
    width: 60,
    height: 60,
    backgroundColor: 'rgba(237, 237, 237, 1)',
  },
  info:{
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  text: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000"
  },
  title: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 22,
    fontWeight: "600",
    fontStyle: "normal",
    color: "#000000"
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
    backgroundColor: 'rgba(237, 237, 237, 1)',
  } ,
  descriptionOfItemGoesRightOverHere: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 18,
    color: "#000000"
  },
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
  }
  });
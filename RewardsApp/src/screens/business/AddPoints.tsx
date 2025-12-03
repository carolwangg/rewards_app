import {Alert, View, Text, StyleSheet, Pressable} from 'react-native';
import Stamp from '@/assets/images/stamp.svg';
import Minus from '@/assets/images/minus.svg';
import Plus from '@/assets/images/green-plus.svg';
import { useState } from 'react';
import { Stack, router } from 'expo-router';
import FONTS from '@/constants/fonts';
import { addPointsToCustomerCard } from '@/services/apiCalls';
import { AddPointInfo } from '@/constants/interfaces';
import Loading from '@/components/Loading';
type Props = {
  
  userId: string
  data: AddPointInfo
}

const performAddPoints  = async(cardId: string, customerId: string, points: number, setLoading: Function) => {
  try{
    setLoading(true);
    console.log("points:"+points);
    const response = await addPointsToCustomerCard(cardId, customerId, points);
    if (response.user == "success"){
      router.replace({pathname:"./success", params:{message:"Points added :)"}});
    }else{
      Alert.alert("Error awarding points", "We're having some issues on our end. Please try again later.");
      router.replace("./qr-code");
    }
  }catch (err){
    Alert.alert("Error awarding points", "We're having some issues on our end. Please try again later.")
    console.error(err);
  }finally{
    setLoading(false);
  }
}
export function AddPoints({userId, data}: Props) {
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(false);
    const givePoints = () =>{
      console.log("give points:"+ points);
      console.log("customerid:"+ data.customer_id);
      console.log("give userId:"+ userId);
      performAddPoints(userId, data.customer_id, points, setLoading);
    }
  if (loading) return <Loading/>
  return (  
    <View testID={"161:382"} style={styles.root}>  
      <Stack.Screen options={{ title: "Customer Cart", headerBackButtonDisplayMode: 'minimal', 
        headerShadowVisible: false, headerTintColor: 'black', 
        headerTitleStyle: styles.header, headerTitleAlign: 'center'
        }} />      
      <View testID="154:1209" style={styles.body}>
        <View testID="154:1208" style={styles.pointAdderBox}>
            <Pressable onPress={()=>{setPoints(Math.max(0, points - 1));}}>
                <Minus/>
            </Pressable>
          
          <View testID="93:268" style={styles.stamp}>
            <Stamp/>
          </View>
          <Pressable onPress={()=>{setPoints(points + 1);}}>
            <Plus/>
          </Pressable>
        </View>
        <Text testID="147:436" style={styles.points}>
          {points}
        </Text>
        <View testID="154:1213" style={styles.pointButtonBox}>
          <Pressable testID="154:1214" style={styles.pointButton} onPress={givePoints}>
            <Text testID="154:1215" style={styles.givePointsText}>
              {`Give Points`}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24, fontFamily: FONTS.BALOO_BHAI, fontWeight: 800, color: 'rgba(58, 73, 117, 1)'
  },
  root: {
    width: '100%', 
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  body: {
    flex: 1,
    paddingTop: '10%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pointAdderBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 23,
    alignSelf: 'stretch',
  },
  stamp: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: 'rgba(104, 155, 97, 1)',
    backgroundColor: 'rgba(225, 244, 226, 1)',
    shadowOpacity: 0.5,
    shadowColor: 'rgba(0, 0, 0, 0.250980406999588)',
    shadowRadius: 4,
    shadowOffset: {"width":0,"height":4},
  },
  points: {
    height: 51,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    color: 'rgba(28, 39, 76, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  givePointsText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  pointButtonBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  pointButton: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'rgba(183, 230, 130, 1)',
  },
});

export default AddPoints;
import {Alert, View, Text, StyleSheet, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import FONTS from '@/constants/fonts';
import { useEffect, useState } from 'react';
import { getCustomerCard, getCustomerCards, getReward, redeemReward } from '@/services/apiCalls';
import { CustomerCard, CustomerReward, RedeemInfo } from '@/constants/interfaces';

type Props = {
  userId: string,
  data: RedeemInfo
}

const performRedeemReward = async(cardId: string, customerId: string, rewardId: string, setLoading: Function) => {
  try{
    const response = await redeemReward(cardId, customerId, rewardId)
    console.log("redeem result:"+ response.user)
    if (response.user === "success"){
      router.replace({pathname:"./success", params:{message:"Reward successfully redeemed :)"}});
    }else{
      Alert.alert("Error redeeming reward", "We're having some issues on our end. Please try again later.");
      router.replace("./qr-code");
    }
  }catch (err){
    Alert.alert("Error redeeming reward", "We're having some issues on our end. Please try again later.")
    console.error(err);
  }finally{
    setLoading(false);
  }
}    

async function performGetReward(cart: string, setReward: Function){
  try{ 
    const result = await getReward(cart);
    console.log("get rewards:"+result);
    if (result.user == null){
      Alert.alert("Reward not found", "reward does not exist")
      return;
    }
    setReward(result.user);
  }catch(err){
    Alert.alert("Error loading reward", "Please make sure the customer used an updated qr code");
  }
}

async function performGetCustomerCard(customerId: string, businessId: string, setCustomerCard: Function){
  try{ 
    console.log("attempting to get card")
    const result = await getCustomerCard(customerId, businessId);
    console.log("get card:"+result);
    if (result.user === null){
      Alert.alert("Customer card not found", "customer card does not exist")
      return;
    }
    setCustomerCard(result.user);
  }catch(err){
    Alert.alert("Error loading customer points", "Please make sure the customer used an updated qr code");
  }
}

export function RedeemReward({userId, data}: Props) {
  const [loading, setLoading] = useState(false);
  const [reward, setReward] = useState<CustomerReward|null>(null);
  const [customerCard, setCustomerCard] = useState<CustomerCard|null>(null);
  const giveReward = () =>{
    console.log("Redeeming reward...")
    performRedeemReward(userId, data.customer_id, data.reward_id, setLoading);
  }
  console.log("reward:"+reward);
  console.log("carsd:"+customerCard);
  useEffect(()=>{performGetReward(data.reward_id, setReward); performGetCustomerCard(data.customer_id, userId, setCustomerCard)}, []);
  return (    
    <SafeAreaView testID="53:203" style={styles.root}>
      <Stack.Screen options={{ title: "Customer Cart", headerBackButtonDisplayMode: 'minimal', 
        headerShadowVisible: false, headerTintColor: 'black', 
        headerTitleStyle: styles.header, headerTitleAlign: 'center'
        }} />
      <View testID="15:1488" style={styles.body}>
        <View testID="160:359" style={styles.rewardBox}>
          <View testID="160:363" style={styles.photoBox}/>
          <View testID="160:360" style={styles.nameAndDescriptionBox}>
            <Text testID="160:361" style={styles.name}>
              {reward?.name}
            </Text>
            <Text testID="160:362" style={styles.description}>
              {reward?.description}
            </Text>
          </View>
          <View testID="160:369" style={styles.pointsAndCustomerPointsBox}>
            <View testID="160:375" style={styles.pointsBox}>
              <Text testID="160:371" style={styles.pointsText}>
                {`Points`}
              </Text>
              <Text testID="160:376" style={styles.points}>
                {reward?.points}
              </Text>
            </View>
            <View testID="160:378" style={styles.customerPointsBox}>
              <Text testID="160:379" style={styles.customerPointsText}>
                {`Customer card points`}
              </Text>
              <Text testID="160:380" style={styles.customerPoints}>
                {customerCard?.points}
              </Text>
            </View>
          </View>
        </View>
        <View testID="160:365" style={styles.rewardButtonBox}>
          <Pressable testID="160:366" style={styles.rewardButton} onPress={giveReward}>
            <Text testID="160:367" style={styles.giveRewardText}>
              {`Give Reward`}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  header: {
    fontSize: 24, fontFamily: FONTS.BALOO_BHAI, fontWeight: 800, color: 'rgba(58, 73, 117, 1)'
  },
  photoBox: {
    height: 140,
    alignSelf: 'stretch',
    margin: 10,
    backgroundColor: 'rgba(237, 237, 237, 1)',
  },
  name: {
    alignSelf: 'stretch',
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  description: {
    alignSelf: 'stretch',
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  body: {
    width: '80%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    rowGap: 10
  },
  rewardBox: {
    height: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
    alignSelf: 'stretch',
    borderRadius: 20
  },
  nameAndDescriptionBox: {
    alignSelf: 'stretch',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: 10,
  },
  pointsText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  points: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  pointsAndCustomerPointsBox: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  customerPointsText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  customerPoints: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  customerPointsBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  giveRewardText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  rewardButtonBox: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  },
  rewardButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    paddingBottom: 10,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'rgba(183, 230, 130, 1)',
  },
});

export default RedeemReward;
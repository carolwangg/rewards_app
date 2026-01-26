import FONTS from '@/constants/fonts';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { getCustomer } from '@/services/apiCalls';
import Error from '@/components/Error';
import { useCustomer } from '@/constants/useCustomer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CustomerReward, defaultCustomerReward, EMPTY_CUSTOMER } from '@/constants/interfaces';
import Settings from '@/assets/images/settings-icon.svg'
import { Dimensions } from 'react-native';
import Header from '@/components/Header';
import COLOURS from '@/constants/colours';
import { useTranslation } from 'react-i18next';
import DefaultPfp from '@/assets/images/default-pfp.svg';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const DEFAULT_CUSTOMER_ATTRIBUTES = ["Email"];
const EDITING_CUSTOMER_ATTRIBUTES = ["Name", "Email"];

type Props = {
  userId: string, 
}

function editImage(){
  console.log("edit image");
}
const onRewardsPress = (rewards: CustomerReward[]) => {
  router.push({pathname: './itemList',
          params: { rewards: JSON.stringify(rewards) }})
}
export default function Profile({userId}: Props) {
  const {t} = useTranslation();
  const customer = useCustomer(EMPTY_CUSTOMER);
  
  useEffect(()=>{
    performGetCustomer(userId, customer);
  }, []);

  if (customer === null){return <Error error={t("errors.customerNotFound")}/>}
  const favourites: CustomerReward[] = [defaultCustomerReward, defaultCustomerReward, defaultCustomerReward];
  const lastVisited: CustomerReward[] = [defaultCustomerReward, defaultCustomerReward, defaultCustomerReward];
  return (
    <SafeAreaProvider>
      <SafeAreaView testID={"53:192"} style={styles.root}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.body}>
            <Pressable style={styles.settingsRow} onPress={()=>{router.replace("./options");}}><Settings/></Pressable>

            <View style={styles.imageAndName}>
              <View testID="154:1066" style={styles.imageBox}>
                {customer.image_url?<Image source={{uri: customer.image_url}} style={styles.image}/>: <DefaultPfp width={100} height={100}/>}
              </View>
              <Text style={styles.nameText}>{customer.name}</Text>
            </View>
            <View style={styles.infoBox}>
              <Header contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 20}} headerText={t('customer.favourites')} onPress={()=>{onRewardsPress(favourites)}} sideText={t('seeAll')}/>
              <Header contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 20}} headerText={t('customer.lastVisited')} onPress={()=>{onRewardsPress(lastVisited)}} sideText={t('seeAll')}/>
            </View>        
          </View>
        </ScrollView>  
      </SafeAreaView>
    </SafeAreaProvider>
    
  );
}

function performGetCustomer(userId: string, customer: any){
  try{
    getCustomer(userId).then(data => {
      data.user.name?customer.setName(data.user.name):customer.setName("");
      data.user.email?customer.setEmail(data.user.email):customer.setEmail("");
      data.latitude?customer.setLatitude(data.latitude):customer.setLatitude(0);
      data.longitude?customer.setLongitude(data.longitude):customer.setLongitude(0);
      data.country?customer.setCountry(data.country):customer.setCountry("");
      data.street_address?customer.setStreetAddress(data.street_address):customer.setStreetAddress("");
      data.image_url?customer.setImageUrl(data.image_url):customer.setImageUrl("");
    });
  }catch (err){
    console.error("Error fetching customer:"+err);
  }
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    // borderWidth: 1
  },
  scroll: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    minHeight: '100%',
    width: SCREEN_WIDTH,
    // borderWidth: 1
  },
  body: {
    paddingTop: 30,
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "space-between",
    rowGap: 20,
  },
  nameText: {
    color: COLOURS.DARK_BLUE,
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI_BOLD,
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '800'
  },
  headerText: {
    color: COLOURS.DARK_BLUE,
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI_BOLD,
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '800'
  },
  image:{
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: '100%'
  },
  imageBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  imageAndName:{
    width: '100%',
    justifyContent: 'center'
  },
  pencil: {
    position: 'absolute',
  },
  edit: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    fontFamily: FONTS.GOWUN_DODUM,
    color: "rgba(217, 217, 217, 1)",
  },
  editText: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    color: "rgba(151, 151, 151, 1)",
  },
  infoBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'stretch',
    rowGap: 13,
  },
  signOutButton: {
    display: "flex",
    alignSelf: 'stretch',
    padding: 10,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#1C274C"
  },
  settingsRow: {
    width: '100%',
    height: 'auto',
    alignItems: 'flex-end',
  },
});
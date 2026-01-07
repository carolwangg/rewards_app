import FONTS from '@/constants/fonts';
import { useBusiness } from '@/constants/useBusiness';
import { useCard } from '@/constants/useCards';
import { getBusiness, getCard } from '@/services/apiCalls';
import { useClerk } from '@clerk/clerk-expo';
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import { RefreshControl, Keyboard, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import Editable from '@/components/Editable';
import { updateBusiness, updateCard } from '@/services/apiCalls';
import Header from '@/components/Header';
import HeaderB from '@/components/HeaderB';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { EMPTY_BUSINESS } from '@/constants/interfaces';

type Props = {
  userId: string, 
}
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function Profile({userId}: Props) {
  const { signOut } = useClerk()
  const business = useBusiness(EMPTY_BUSINESS);

  const card = useCard({
    card: {
      id: "",
      name: "",
      description: "", 
      image_url: "",
      contactInfo: "",
      colour: "",
    }
  });

  const [editingCard, setEditingCard] = useState(false);
  const [editingDetails, setEditingDetails] = useState(false);
  useEffect(()=>{
    performGetBusiness(userId, business);
    performGetCard(userId, card);
  }, []);

  const onSignOut = () => {
    signOut();
    console.log("Signed out")
    router.replace('/welcome');
    console.log("Rerouted")
  }

  const editToggle = () => {
    const temp = !editingDetails;
    setEditingDetails(temp);
    if (!temp){//idk anymore 
      updateBusiness(userId, business);
      console.log("updated business");
    }
  }

  const editToggleCard = () => {
    const temp = !editingCard;
    setEditingCard(temp);
    if (!temp){//idk anymore 
      updateCard(userId, card);
      console.log("updated card");
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    performGetBusiness(userId, business);
    performGetCard(userId, card);
    setRefreshing(false);
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const handleColorSelected = useCallback((colour: string)=>{
    console.log(colour)
  }, [])
  return (
    <SafeAreaProvider>
    <SafeAreaView testID={"53:202"} style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} refreshControl={<RefreshControl style={{borderWidth: 1}} refreshing={refreshing} onRefresh={onRefresh}/>}>
        <View>
          <View style={styles.body}>
            <View testID="9:28" style={styles.frame}>
              <Header headerTextStyle={styles.headerText} headerText='Your card' onPress={editToggleCard} sideText={editingCard? "Save": "Edit"}/>
              <View testID="9:580" style={[styles.cardBox, {backgroundColor: card.colour}]}>
                <View testID="9:581" style={styles.titleBox}>
                  <Ionicons name={'ellipse'} size={70}/>
                  <View style={styles.cardEdit}>
                    <Editable maxLength={20} textStyle={styles.businessName} editing={editingCard} name={""} placeHolder={'Business name'} value={card.name} setValue={card.setName}/>
                    <Editable maxLength={7} textStyle={{color: 'white'}} contentContainerStyle={styles.colourBox} editing={editingCard} name={""} placeHolder={'HEX colour'} value={card.colour} setValue={card.setColour}/>
                  </View>
                </View>
                <View style={styles.cardInfoBox}>
                  <Editable editing={editingCard} name={""} placeHolder={'Contact info'} value={card.contactInfo} setValue={card.setContactInfo}/>
                  <Editable editing={editingCard} name={""} placeHolder={'Tagline'} value={card.description} setValue={card.setDescription}/>
                </View>
              </View>
            </View>
            <View testID="9:500" style={styles.frame}> 
              <Header headerTextStyle={styles.headerText} headerText='Details' onPress={editToggle} sideText={editingDetails? "Save": "Edit"}/>
              <View testID="15:136" style={styles.infoBox}>
                <Editable textStyle={styles.bodyText} editing={editingDetails} name={"Business Name"} placeHolder={'New business name'} value={business.name} setValue={business.setName}/>
                <Editable textStyle={styles.bodyText} editing={editingDetails} name={"Email"} placeHolder={'New email'} value={business.email} setValue={business.setEmail}/>
                <Editable textStyle={styles.bodyText} editing={editingDetails} name={"Street Address"} placeHolder={'New location'} value={business.streetAddress? business.streetAddress : ""} setValue={business.setStreetAddress}/>
                <Editable textStyle={styles.bodyText} editing={editingDetails} name={"Description"} placeHolder={'New description'} value={business.description? business.description : ""} setValue={business.setDescription}/>
              </View>                
            </View>
            <HeaderB headerTextStyle={styles.headerText} headerText='Analytics'/>
            <Pressable testID="15:137" style={styles.signOutButton} onPress= {onSignOut}>
            <Text testID="15:138" style={styles.signOutText}>
                Sign out
            </Text>
          </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
function performGetBusiness(userId: string, business: any){
  try{
    getBusiness(userId).then(data => {
      console.log("data fetched:"+data.user);
      data.user.name? business.setName(data.user.name): business.setName("");
      data.user.email? business.setEmail(data.user.email): business.setEmail("");
    });
  }catch (err){
    console.error("Error fetching customer:"+err);
  }
}

function performGetCard(userId: string, card: any){
  try{
    getCard(userId).then(data => {
      console.log("card data:"+data);
      console.log("card data fetched:"+data.user);
      data.user.name? card.setName(data.user.name): card.setName("");
      data.user.description? card.setDescription(data.user.description): card.setDescription("");
      data.user.contact_info? card.setContactInfo(data.user.contact_info): card.setContactInfo("");
      data.user.colour? card.setColour(data.user.colour): card.setColour("");
    });
  }catch (err){
    console.error("Error fetching customer:"+err);
  }
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',    
  },
  scroll: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    width: SCREEN_WIDTH,
    height: 'auto',
  },
  body: {
    paddingTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    rowGap: 30,
   },
  frame: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    flex: 1,
  },
  colorPicker: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  address: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  streetAddress: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    borderStyle: 'solid',
  },
  frame31: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    borderRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
    borderStyle: 'solid',
  },
  email: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  newardsOutlookCom: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame312: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-start',
    flex: 1,
    borderRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  phoneNumber: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  $1209349882: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame313: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-start',
    borderRadius: 15,
    flex: 1,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  businessName: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  cardBox: {
    width: 340,
    height: 230,
    padding: 20,
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(104, 155, 97, 1)',
  },
  titleBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    borderColor: 'red',
    display: 'flex',
    position: 'relative',
  },
  phoneNumber2: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  tagline: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  bodyText:{
    fontSize: 16,
  },
  headerText: {
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI_BOLD,
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '800'
  },
  headingRow: {
    flexDirection: 'row',
    width: 342,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yourCard: {
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  editCard: {
    color: 'rgba(120, 119, 146, 1)',
    textAlign: 'center',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame42: {
    flexDirection: 'row',
    width: 342,
    paddingVertical: 0,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  $3: {
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame50: {
    flexDirection: 'row',
    width: 29,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: 'rgba(255, 131, 131, 1)',
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
  signOutText:{
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    color: "#1C274C",
  },
  infoBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    rowGap: 10,
  },
  cardInfoBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    rowGap: 10,
  },
  cardEdit:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 240,
  },
  colourBox:{
    paddingVertical: 0,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  }
});

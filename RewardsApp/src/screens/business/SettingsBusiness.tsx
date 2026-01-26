import FONTS from '@/constants/fonts';
import { useBusiness } from '@/constants/useBusiness';
import { useCard } from '@/constants/useCards';
import { deleteBusiness, getBusiness, getCard } from '@/services/apiCalls';
import { useClerk } from '@clerk/clerk-expo';
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import { RefreshControl, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import Editable from '@/components/Editable';
import { updateBusiness, updateCard } from '@/services/apiCalls';
import Header from '@/components/Header';
import HeaderB from '@/components/HeaderB';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { EMPTY_BUSINESS, EMPTY_CARD } from '@/constants/interfaces';
import Settings from '@/assets/images/settings-icon.svg'
import { useTranslation } from 'react-i18next';
import { BusinessHook } from '@/constants/hooks';
import COLOURS from '@/constants/colours';
type Props = {
  userId: string, 
}
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default function SettingsBusiness({userId}: Props) {
  const {t} = useTranslation();
  const { signOut } = useClerk()
  const business = useBusiness(EMPTY_BUSINESS);
  const businessAttributes = ["Email", "Country"];
  const [editingDetails, setEditingDetails] = useState(false);
  useEffect(()=>{
    performGetBusiness(userId, business);
  }, []);
  console.log("userId:"+userId)
  const onSignOut = () => {
    signOut();
    console.log("Signed out")
    router.replace('/welcome');
    console.log("Rerouted")
  }
  const onDeleteAccount = () => {
    // signOut();
    deleteBusiness(userId);
    console.log("Account deleted")
    router.replace('/welcome');
    console.log("Rerouted")
  }
  const editToggle = () => {
    const temp = !editingDetails;
    setEditingDetails(temp);
  }

  const onSave = () =>{
    updateBusiness(userId, business.getBusiness());
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    performGetBusiness(userId, business);
    setRefreshing(false);
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const factory = useCallback((name: string) => {
        let value, translatedName: string;
        let setValue: (value: string) => void;
        switch(name){
            case "Email":
              translatedName = t('email');
              value = business.email;
              setValue = business.setEmail;
              break;
            case "Country":
              return 
            default:
              translatedName = "default"
              value = "default";
              setValue = (value: string) => {};
              break;
        }
        const placeholder = t('new') + translatedName;
        return <Editable key={name} editing={editingDetails} name={translatedName} placeHolder={placeholder} value={value} setValue={setValue}/>
      }, [business, editingDetails]);
  console.log("business:"+JSON.stringify(business))
  return (
    <SafeAreaProvider>
    <SafeAreaView testID={"53:202"} style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
      <View style={styles.body}>
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', width: '80%'}}>
          <Pressable style ={styles.edit} onPress={editToggle}>
            <Text testID="9:623" style={styles.editText}>
              {editingDetails? t("save"): t("edit")}
            </Text>
          </Pressable>
          <View testID="15:136" style={styles.infoBox}>
            <Header headerTextStyle={styles.headerText} headerText={t('details')}/>
            {businessAttributes.map((attribute) => factory(attribute))}
          </View>
        </View>
        <View style={{width: '100%', flexDirection: 'column', rowGap: 10, paddingVertical: 10}}>
          <Pressable testID="15:137" style={styles.signOutButton} onPress= {onSignOut}>
            <Text testID="15:138" style={styles.signOutText}>
              {t('signOut')}
            </Text>
          </Pressable>
          <Pressable testID="15:137" style={[styles.signOutButton, {backgroundColor: COLOURS.DARK_RED, borderColor: COLOURS.DARK_RED}]} onPress= {onDeleteAccount}>
            <Text testID="15:138" style={[styles.signOutText, {color: COLOURS.WHITE}]}>
              {t('deleteAccount')}
            </Text>
          </Pressable>
        </View>
        
          </View>
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
function performGetBusiness(userId: string, business: BusinessHook){
  try{
    getBusiness(userId).then(data => {
      console.log("data:"+JSON.stringify(data))
      business.populate(data.user)
    });
  }catch (err){
    console.error("Error fetching business:"+err);
  }
}

function performGetCard(userId: string, card: any){
  try{
    getCard(userId).then(data => {
      console.log("card data:"+data);
      console.log("card data fetched:"+data.user);
      if (!data.user) {console.error("No card exists for user:"+ userId); return;}
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
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    height: 'auto',
    minHeight: '100%',
  },
  settingsRow: {
    width: '100%',
    height: 'auto',
    alignItems: 'flex-end',
  },
  body: {
    paddingTop: 20,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "space-between",
    rowGap: 30,
    width: '90%',
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
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  },
  edit: {
    height: 40,
    width: "100%",
    flex: 0,
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
});

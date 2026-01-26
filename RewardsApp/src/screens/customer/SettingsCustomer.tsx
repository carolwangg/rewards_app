import FONTS from '@/constants/fonts';
import { useClerk } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useCallback, useRef } from 'react';
import Editable from '@/components/Editable';
import { getCustomer, updateCustomer, updateCustomerImage } from '@/services/apiCalls';
import Error from '@/components/Error';
import { useCustomer } from '@/constants/useCustomer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { EMPTY_CUSTOMER } from '@/constants/interfaces';
import Settings from '@/assets/images/settings-icon.svg'
import { Dimensions } from 'react-native';
import Header from '@/components/Header';
import COLOURS from '@/constants/colours';
import Pencil from '@/assets/images/pencil-icon.svg';
import { useTranslation } from 'react-i18next';
import { pickImage } from '@/helpers/imagePicker';
import DefaultPfp from '@/assets/images/default-pfp.svg';
import Loading from '@/components/Loading';
import { CustomerHook } from '@/constants/hooks';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const DEFAULT_CUSTOMER_ATTRIBUTES = ["Email"];
const EDITING_CUSTOMER_ATTRIBUTES = ["Name", "Email"];

type Props = {
  userId: string, 
}



export default function Profile({userId}: Props) {
  const {t} = useTranslation();
  const { signOut } = useClerk()
  const customer = useCustomer(EMPTY_CUSTOMER);
  const [editingDetails, setEditingDetails] = useState(false);
  const [customerAttributes, setCustomerAttributes] = useState(DEFAULT_CUSTOMER_ATTRIBUTES);
  const imageEdited = useRef(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    performGetCustomer(userId, customer);
  }, []);

  const editImage = useCallback( () =>{
    console.log("start editing image");
    imageEdited.current = true;
    pickImage(customer.setImageUrl, [1, 1]);
  }, []);

  const onSignOut = () => {
    signOut();
    console.log("Signed out")
    router.replace('/welcome');
    console.log("Rerouted")
  }

  const onDeleteAccount = () => {
    // signOut();
    console.log("Account deleted")
    router.replace('/welcome');
    console.log("Rerouted")
  }

  const editToggle = async() => {
    const temp = !editingDetails;
    setEditingDetails(temp);
    setCustomerAttributes(temp? EDITING_CUSTOMER_ATTRIBUTES: DEFAULT_CUSTOMER_ATTRIBUTES);
    if (!temp){//idk anymore 
      setLoading(true)
      try{
        if (imageEdited && customer.image_url){
          const response = await updateCustomerImage(userId, customer.image_url);
          console.log(`response: ${JSON.stringify(response)}`)
          if (!response || response.user != "success"){
            console.error("Backend error updating customer image")
          }
        }
        const response2 = await updateCustomer(userId, customer);
        if (!response2 || response2.user != "success"){
          console.error("Backend error updating customer")
        }
      }catch(err){
        console.error("Error updating customer");
        Alert.alert(t("errors.updatingCustomer", "errors.updatingCustomerMessage"))
      }
      setLoading(false)
      }
      console.log("updated");
    }

  const factory = useCallback((name: string) => {
    let value, translatedName: string;
    let setValue: (value: string) => void;
    switch(name){
        case "Name":
          translatedName = t('name');
          value = customer.name;
          setValue = customer.setName;
          break;
        case "Email":
          translatedName = t('email');
          value = customer.email;
          setValue = customer.setEmail;
          break;
        default:
          translatedName = "default"
          value = "default";
          setValue = (value: string) => {};
          break;
    }
    return <Editable key={name} editing={editingDetails} name={translatedName} placeHolder={value} value={value} setValue={setValue}/>
  }, [customer, editingDetails]);

  if (customer === null){return <Error error={t("errors.customerNotFound")}/>}
  if (loading){return <Loading message={t("updatingCustomer")}/>}
  console.log("customer:"+JSON.stringify(customer))
  return (
    <SafeAreaProvider>
      <SafeAreaView testID={"53:192"} style={styles.root}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.body}>
            <Pressable style ={styles.edit} onPress={editToggle}>
              <Text testID="9:623" style={styles.editText}>
                {editingDetails? t("save"): t("edit")}
              </Text>
            </Pressable>
            <View style={styles.imageAndName}>
              <View testID="154:1066" style={styles.imageBox}>
                {customer.image_url?<Image source={{uri: customer.image_url}} style={styles.image}/>: <DefaultPfp/>}
                {editingDetails? <Pressable style={styles.pencil} onPress={editImage}><Pencil/></Pressable>: null}
              </View>
              {editingDetails? null: <Text style={styles.nameText}>{customer.name}</Text>}
            </View>
            <View testID="15:136" style={styles.infoBox}>
              {editingDetails? null: <Header headerTextStyle={styles.headerText} headerText={t('details')}/>}
              {customerAttributes.map((attribute) => factory(attribute))}
            </View>
            <View style={{flex: 1, width: '100%', justifyContent: 'flex-end', padding: 10, rowGap: 10}}>
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

function performGetCustomer(userId: string, customer: CustomerHook){
  try{
    getCustomer(userId).then(data => {
      customer.populate(data.user)
    });
  }catch (err){
    console.error("Error fetching customer:"+err);
  }
}

const styles = StyleSheet.create({
  root: {
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
  },
  scroll: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    minHeight: '100%',
    width: SCREEN_WIDTH
  },
  body: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "space-between",
    rowGap: 20
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: COLOURS.DARK_BLUE
  },
  signOutText:{
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    color: COLOURS.DARK_BLUE,
  },
  settingsRow: {
    width: '100%',
    height: 'auto',
    alignItems: 'flex-end',
  },  
});
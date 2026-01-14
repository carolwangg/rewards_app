import FONTS from '@/constants/fonts';
import { useClerk } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import Editable from '@/components/Editable';
import { getCustomer, updateCustomer } from '@/services/apiCalls';
import Error from '@/components/Error';
import { CustomerHook, useCustomer } from '@/constants/useCustomer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { EMPTY_CUSTOMER } from '@/constants/interfaces';
import Settings from '@/assets/images/settings-icon.svg'
import { Dimensions } from 'react-native';
import Header from '@/components/Header';
import COLOURS from '@/constants/colours';
import Pencil from '@/assets/images/pencil-icon.svg';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const DEFAULT_CUSTOMER_ATTRIBUTES = ["Email"];
const EDITING_CUSTOMER_ATTRIBUTES = ["Name", "Email"];

type Props = {
  userId: string, 
}

function factory(name: string, customer: CustomerHook, editingDetails: boolean){
  let value: string;
  let setValue: (value: string) => void;
  switch(name){
      case "Name":
        value = customer.name;
        setValue = customer.setName;
        break;
      case "Email":
        value = customer.email;
        setValue = customer.setEmail;
        break;
      default:
        value = "default";
        setValue = (value: string) => {};
        break;
  }
  return <Editable editing={editingDetails} name={name} placeHolder={value} value={value} setValue={setValue}/>
}

function editImage(){
  console.log("edit image");
}

export default function Profile({userId}: Props) {
  const { signOut } = useClerk()
  const customer = useCustomer(EMPTY_CUSTOMER);
  const [editingDetails, setEditingDetails] = useState(false);
  const [customerAttributes, setCustomerAttributes] = useState(DEFAULT_CUSTOMER_ATTRIBUTES);
  
  useEffect(()=>{
    performGetCustomer(userId, customer);
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
    setCustomerAttributes(temp? EDITING_CUSTOMER_ATTRIBUTES: DEFAULT_CUSTOMER_ATTRIBUTES);
    if (!temp){//idk anymore 
      updateCustomer(userId, customer);
      console.log("updated");
    }
  }
  if (customer === null){return <Error error={"Customer data not found."}/>}
  return (
    <SafeAreaProvider>
      <SafeAreaView testID={"53:192"} style={styles.root}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.body}>
            <Pressable style={styles.settingsRow} onPress={()=>{router.replace("./options");}}><Settings/></Pressable>
            <Pressable style ={styles.edit} onPress={editToggle}>
              <Text testID="9:623" style={styles.editText}>
                {editingDetails? "Save": "Edit"}
              </Text>
            </Pressable>
            <View style={styles.imageAndName}>
              <View testID="154:1066" style={styles.imageBox}>
                <Image source={{uri: customer.image_url? customer.image_url: undefined}} style={styles.image}/>
                {editingDetails? <Pressable style={styles.pencil} onPress={editImage}><Pencil/></Pressable>: null}
              </View>
              {editingDetails? null: <Text style={styles.nameText}>{customer.name}</Text>}
            </View>
            <View testID="15:136" style={styles.infoBox}>
              {editingDetails? null: <Header headerTextStyle={styles.headerText} headerText='Details'/>}
              {customerAttributes.map((attribute) => factory(attribute, customer, editingDetails))}
            </View>
            <Pressable testID="15:137" style={styles.signOutButton} onPress= {onSignOut}>
              <Text testID="15:138" style={styles.signOutText}>
                {`Sign Out`}
              </Text>
            </Pressable>
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
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    minHeight: '100%',
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
    paddingTop: 30,
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
  settingsRow: {
    width: '100%',
    height: 'auto',
    alignItems: 'flex-end',
  },
});
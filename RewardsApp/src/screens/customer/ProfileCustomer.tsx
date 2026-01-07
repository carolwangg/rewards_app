import FONTS from '@/constants/fonts';
import { useClerk } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import Editable from '@/components/Editable';
import { getCustomer, updateCustomer } from '@/services/apiCalls';
import Error from '@/components/Error';
import { useCustomer } from '@/constants/useCustomer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { EMPTY_CUSTOMER } from '@/constants/interfaces';

type Props = {
  userId: string, 
}

export default function Profile({userId}: Props) {
  const { signOut } = useClerk()
  const customer = useCustomer(EMPTY_CUSTOMER);
  const [editingDetails, setEditingDetails] = useState(false);
  
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
            <Pressable style ={styles.edit} onPress={editToggle}>
              <Text testID="9:623" style={styles.editText}>
                {editingDetails? "Save": "Edit"}
              </Text>
            </Pressable>
            <View testID="15:136" style={styles.infoBox}>
              <Editable editing={editingDetails} name={"Name"} placeHolder={customer.name} value={customer.name} setValue={customer.setName}/>
              <Editable editing={editingDetails} name={"Email"} placeHolder={customer.email} value={customer.email} setValue={customer.setEmail}/>
            </View>
            <Pressable testID="15:137" style={styles.signOutButton} onPress= {onSignOut}>
              <Text testID="15:138" style={styles.signOutText}>
                Sign out
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
    width: '100%',
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
    minHeight: '100%'
  },
  body: {
    paddingTop: 30,
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "space-between",
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
    alignItems: 'center',
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
  }
});
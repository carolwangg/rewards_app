import FONTS from '@/fonts';
import { useClerk } from '@clerk/clerk-expo';
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const TABBAR_HEIGHT = 60

export default function Profile() {
  const { signOut } = useClerk()
  const [address, setAddress] = useState("1047 Newark Street");
  const [email, setEmail] = useState("example@example.com");
  const [phone, setPhone] = useState("1209873");
  const [editingCard, setEditingCard] = useState(false);
  const [editingDetails, setEditingDetails] = useState(false);
  const chooseText = () => {
    if (editingDetails) {
      return (<TextInput testID="9:515" style={styles.editStreetAddress} value={address} onChangeText={setAddress} />);
    } 
    return (<Text testID="9:515" style={styles.streetAddress}>
        {address}
      </Text>);
  }
  const chooseText2 = () => {
    if (editingDetails) {
      return (<TextInput testID="9:515" style={styles.editStreetAddress} value={email} onChangeText={setEmail} />);
    } 
    return (<Text testID="9:515" style={styles.streetAddress}>
        {email}
      </Text>);
  }
  const chooseText3 = () => {
    if (editingDetails) {
      return (<TextInput testID="9:515" style={styles.editStreetAddress} value={phone} onChangeText={setPhone} />);
    } 
    return (<Text testID="9:515" style={styles.streetAddress}>
        {phone}
      </Text>);
  }
  const onSignOut = () => {
    signOut();
    console.log("Signed out")
    router.replace('../(auth)/welcome');
    console.log("Rerouted")
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View testID={"53:202"} style={styles.root}>
        <View style={styles.phone}>
            <View style={styles.body}>
              <View testID="9:28" style={styles.frame}>
                <View testID="9:621" style={styles.frame42}>
                  <Text testID="9:622" style={styles.yourCard}>
                  {`Your card`}
                  </Text>
                  <Pressable onPress={() => {setEditingCard(!editingCard)}}>
                    {<Text testID="9:623" style={styles.editCard}>
                      {editingCard? "Save": "Edit"}
                    </Text>}
                  </Pressable>
                </View>
                <View testID="9:580" style={styles.frame14}>
                    <View testID="9:581" style={styles.frame29}>
                    <Ionicons name={'ellipse'} size={70}/>
                    <Text testID="9:583" style={styles.businessName}>
                        {`Business Name`}
                    </Text>
                    </View>
                    <Text testID="9:584" style={styles.phoneNumber2}>
                    {`Phone Number`}
                    </Text>
                    <Text testID="9:585" style={styles.tagline}>
                    {`Tagline`}
                    </Text>
                </View>
              </View>
              <View testID="9:500" style={styles.frame}> 
                <View testID="9:617" style={styles.frame34}>
                  <Text testID="9:618" style={styles.details}>
                  {`Details`}
                  </Text>
                  <Pressable onPress={() => {setEditingDetails(!editingDetails)}}>
                    <Text testID="9:623" style={styles.editDetails}>
                      {editingDetails? "Save": "Edit"}
                    </Text>
                  </Pressable>
                </View>
                <View testID="9:503" style={styles.frame38}>
                    <View testID="9:512" style={styles.frame36}>
                      <Text testID="9:513" style={styles.address}>
                          {`Street address`}
                      </Text>
                      <View testID="9:514" style={[styles.frame31, { backgroundColor: editingDetails ? 'rgba(217, 217, 217, 1)' : 'white' }]}>
                        {chooseText()}
                      </View>
                    </View>
                    <View testID="9:504" style={styles.frame35}>
                      <Text testID="9:505" style={styles.email}>
                        {`Email`}
                      </Text>
                      <View testID="9:506" style={[styles.frame31, { backgroundColor: editingDetails ? 'rgba(217, 217, 217, 1)' : 'white' }]}>
                        {chooseText2()}
                      </View>
                    </View>
                    <View testID="9:508" style={styles.frame37}>
                      <Text testID="9:509" style={styles.phoneNumber}>
                        {`Phone Number`}
                      </Text>
                      <View testID="9:510" style={[styles.frame31, { backgroundColor: editingDetails ? 'rgba(217, 217, 217, 1)' : 'white' }]}>
                          {chooseText3()}
                      </View>
                    </View>
                  </View>
              </View>
              <Pressable testID="15:137" style={styles.signOutButton} onPress= {onSignOut}>
                <Text testID="15:138" style={styles.signOutText}>
                    Sign out
                </Text>
              </Pressable>
            </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    height: SCREEN_HEIGHT - TABBAR_HEIGHT
  },
  phone: {
    width: 393,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
  },
  body: {
    paddingTop: '15%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '89%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    borderColor: 'red',
    borderWidth: 1,
    rowGap: 30,
  },
  frame: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    flex: 1,
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
    borderWidth: 1,
    borderColor: 'blue',
    borderStyle: 'solid',
  },
  editStreetAddress: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    borderWidth: 1,
    borderColor: 'green',
    borderStyle: 'solid',
    width: '100%',
  },
  frame38: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame36: {
    flexDirection: 'row',
    width: 320,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  frame31: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    borderRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
    borderWidth: 1,
    borderColor: 'black',
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
  frame35: {
    flexDirection: 'row',
    width: 320,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
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
  frame37: {
    flexDirection: 'row',
    width: 320,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
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
  frame14: {
    width: 340,
    height: 227,
    paddingTop: 10,
    paddingLeft: 30,
    paddingBottom: 10,
    paddingRight: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(104, 155, 97, 1)',
  },
  frame29: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 0,
    paddingBottom: 10,
    paddingRight: 0,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    alignSelf: 'stretch',
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
  details: {
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  editDetails: {
    color: 'rgba(120, 119, 146, 1)',
    textAlign: 'center',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame34: {
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
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
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
  frame262: {
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
    width: "100%",
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

import { Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import FONTS from '@/fonts';
import AppleLogo from '../assets/images/apple-logo.svg';
import FacebookLogo from '../assets/images/facebook-logo.svg';
import GoogleLogo from '../assets/images/google-logo.svg';

type props={
    phoneNumber: string, 
    setPhoneNumber: (phoneNumber: string)=>void
    onLogIn: ()=>void
}

export default function Login({phoneNumber, setPhoneNumber, onLogIn}: props) {
  return (
    <TouchableWithoutFeedback testID={"53:186"} onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <View testID="8:161" style={styles.welcomeFrame}>
          <Text testID="8:162" style={styles.welcome}>
            {`Welcome`}
          </Text>
        </View>
        <View testID="6:18" style={styles.frame14}>
          <View testID="6:19" style={styles.frame142}>
            <TextInput
              testID="6:20"
              style={styles.phoneNumber}
              placeholder="Email"
              placeholderTextColor="rgba(146, 144, 180, 1)"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <Pressable testID="6:30" style={styles.frame10} onPress={onLogIn}>
            <Text testID="6:31" style={styles.logIn}>
              {`Log In`}
            </Text>
          </Pressable>
          <View testID="6:32" style={styles.rectangle27}/>
          <View testID="6:33" style={styles.frame143}>
            <View testID="6:34" style={styles.frame15}>
              <GoogleLogo/>
            </View>
            <Text testID="6:36" style={styles.logInWithGoogle}>
              {`Log in with Google`}
            </Text>
          </View>
          <View testID="6:37" style={styles.frame152}>
            <FacebookLogo/>
            <Text testID="6:44" style={styles.logInWithFacebook}>
              {`Log in with Facebook`}
            </Text>
          </View>
          <View testID="112:262" style={styles.frame162}>
            <AppleLogo/>
            <Text testID="112:269" style={styles.logInWithAppleId}>
              {`Log in with Apple ID`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  phoneNumber: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  frame14: {
    display: 'flex',
    width: 227,
    paddingTop: 13,
    paddingLeft: 7,
    paddingBottom: 13,
    paddingRight: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    rowGap: 10,
    columnGap: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 0, 0, 1)',
  },
  frame142: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  logIn: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame10: {
    flexDirection: 'row',
    width: 121,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'rgba(183, 230, 130, 1)',
  },
  rectangle27: {
    width: 209,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  frame143: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    columnGap: 10,
    alignSelf: 'stretch',
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowOpacity: 0.5,
    shadowColor: 'rgba(0, 0, 0, 0.501960813999176)',
    shadowRadius: 2,
    shadowOffset: {"width":0,"height":2},
  },
  frame15: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  logInWithGoogle: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame152: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    columnGap: 10,
    alignSelf: 'stretch',
    borderRadius: 30,
    backgroundColor: 'rgba(58, 73, 117, 1)',
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.501960813999176)',
    shadowRadius: 2,
    shadowOffset: {"width":0,"height":2},
  },
  logInWithFacebook: {
    color: 'rgba(217, 217, 217, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  logInWithAppleId: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame162: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    columnGap: 10,
    alignSelf: 'stretch',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'rgba(217, 217, 217, 1)',
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.501960813999176)',
    shadowRadius: 2,
    shadowOffset: {"width":0,"height":2},
  },
  welcome: {
    color: 'rgba(58, 73, 117, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 50,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  welcomeFrame: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
});

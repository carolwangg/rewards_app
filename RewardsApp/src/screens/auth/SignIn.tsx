import { router } from 'expo-router';
import { Alert, Dimensions, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useRef, useState } from 'react';
import AppleLogo from '@/assets/images/apple-logo.svg';
import WelcomeBottomPattern from '@/assets/images/bottom-pattern.svg';
import FacebookLogo from '@/assets/images/facebook-logo.svg';
import GoogleLogo from '@/assets/images/google-logo.svg';
import WelcomeTopPattern from '@/assets/images/top-pattern.svg';
import FONTS from '@/constants/fonts';
import COLOURS from '@/constants/colours';
import { useTranslation } from 'react-i18next';

type props={
    onSignIn: (email: string)=>void
}
const SCREEN_WIDTH = Dimensions.get('window').width;
export default function SignIn({onSignIn}: props) {
  const {t} = useTranslation();
  const emailRef = useRef<string>(null);
  const [emailColour, setEmailColour] = useState("black");

  const performSignIn = () => {
    const email = emailRef.current?emailRef.current.toLowerCase(): "";
    console.log("email: "+email)
    if (!email.match(/.+@.+\..+/)){
      Alert.alert(t("errors.invalidEmail"), t("errors.invalidEmailMessage"));
      return;
    }
    onSignIn(email);
  }
  
  return (
    <TouchableWithoutFeedback testID={"53:186"} onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <View testID={"131:000"} style={styles.topPattern}>
          <WelcomeTopPattern width={SCREEN_WIDTH} height={SCREEN_WIDTH * 196/366}/>
        </View>
        <View testID={"131:001"} style={styles.bottomPattern}>
          <WelcomeBottomPattern width={SCREEN_WIDTH} height={SCREEN_WIDTH * 196/366} preserveAspectRatio='xMinYMax meet'/>
        </View>
        <View testID={"131:009"} style={styles.body}>
          
          <View testID="8:161" style={styles.welcomeFrame}>
            <Text testID="8:162" style={styles.welcome}>
              {t("welcome")}
            </Text>
          </View>
          <View testID="6:18" style={styles.loginBox}>
            <View testID="6:19" style={styles.emailBox}>
              <TextInput
                testID="6:20"
                style={[styles.email, {outlineColor: emailColour}]}
                placeholder={t("email")}
                placeholderTextColor="rgba(146, 144, 180, 1)"
                onChangeText={(text) => {
                emailRef.current = text;
                setEmailColour(text.match(/.+@.+\..+/)? 'black': COLOURS.RED)}}
                maxLength={45}
                selectionColor={emailColour}
              />
            </View>
            <Pressable testID="6:30" style={styles.logInButton} onPress={performSignIn}>
              <Text testID="6:31" style={styles.logIn}>
                {t("auth.logIn")}
              </Text>
            </Pressable>
            <View testID="6:32" style={styles.whiteSpace}/>
            <View testID="6:33" style={[styles.companyLogIn, styles.googleLogIn]}>
              <View testID="6:34" style={[styles.googleIconBox, {flex: 1}]}>
                <GoogleLogo/>
              </View>
              <View style={{flex: -1}}>
                <Text testID="6:36" style={styles.bodyText}>
                {`${t("auth.logInWith")} Google`}
                </Text>
              </View>
            </View>
            <View testID="6:37" style={[styles.companyLogIn, styles.facebookLogIn]}>
              <FacebookLogo/>
              <View style={{flex: 1}}>
              <Text testID="6:44" style={styles.bodyText}>
                {`${t("auth.logInWith")} Facebook`}
              </Text>
              </View>
            </View>
            <View testID="112:262" style={[styles.companyLogIn, styles.appleLogIn]}>
              <AppleLogo/>
              <View style={{flex: 1}}>
              <Text testID="112:269" style={styles.bodyText}>
                {`${t("auth.logInWith")} Apple ID`}
              </Text>
              </View>
            </View>
          </View>
          <View style={styles.signUpPrompt}>
            <Text style={styles.signUpText}>
              {`Don't have an account? `}
            </Text>
            <Pressable onPress={()=>{router.replace('/sign-up')}}>
              <Text style={styles.signUpLink}>
                {`Sign Up`}
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
    width: SCREEN_WIDTH,
    height: "100%",
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  body: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
  },
  email: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    flex: 1,
    padding: 10,
  },
  loginBox: {
    display: 'flex',
    width: 227,
    paddingVertical: 13,
    paddingHorizontal: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    rowGap: 10,
  },
  emailBox: {
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
  logInButton: {
    flexDirection: 'row',
    width: 121,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: COLOURS.LIGHT_GREEN,
  },
  whiteSpace: {
    width: 209,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  googleLogIn: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  googleIconBox: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  bodyText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  companyLogIn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    columnGap: 10,
    alignSelf: 'stretch',
    borderRadius: 30,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowRadius: 2,
    shadowOffset: {"width":0,"height":2},
  },
  facebookLogIn: {
    backgroundColor: 'rgba(58, 73, 117, 1)',
  },
  appleLogIn: {
    backgroundColor: 'rgba(217, 217, 217, 1)',
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
  back: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  topPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: "100%",
  },
  bottomPattern: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: "100%",
  },
  signUpPrompt: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 16,
    fontStyle: 'normal',  
    fontWeight: '400',
  },    
  signUpLink: {
    color: 'rgba(34, 139, 34, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
  },
});

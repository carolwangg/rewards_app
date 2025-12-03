import FONTS from '@/constants/fonts';
import { useRef, useState } from 'react';
import { Dimensions, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_HEIGHT = Dimensions.get('window').height
const TABBAR_HEIGHT = 60
const contactType = "email"
const GRAY = 'rgba(146, 144, 180, 1)'
type props={
  setLoading: (loading: boolean) => void
  setVerifying: (verify: boolean) => void, 
  handleVerification: (code: string) => void
}
export default function EnterPin({ setLoading, setVerifying, handleVerification }: props) {
  const [firstPinDigit, setFirstPinDigit] = useState("")
  const [secondPinDigit, setSecondPinDigit] = useState("")
  const [thirdPinDigit, setThirdPinDigit] = useState("")
  const [fourthPinDigit, setFourthPinDigit] = useState("")
  const [fifthPinDigit, setFifthPinDigit] = useState("")
  const [sixthPinDigit, setSixthPinDigit] = useState("")
  const firstRef = useRef<TextInput>(null);
  const secondRef = useRef<TextInput>(null);
  const thirdRef = useRef<TextInput>(null);
  const fourthRef = useRef<TextInput>(null);
  const fifthRef = useRef<TextInput>(null);
  const sixthRef = useRef<TextInput>(null);
  const changeFirstPinDigit = (text: string) => {
    setFirstPinDigit(text);
    if (text.length === 1) {
      secondRef.current?.focus();
    }
  }
  const changeSecondPinDigit = (text: string) => {
    setSecondPinDigit(text);
    if (text.length === 1) {
      thirdRef.current?.focus();
    } else {
      firstRef.current?.focus();
    }
  }
  const changeThirdPinDigit = (text: string) => {
    setThirdPinDigit(text);
    if (text.length === 1) {
      fourthRef.current?.focus();
    }else{
      secondRef.current?.focus();
    }
  }
  const changeFourthPinDigit = (text: string) => {
    setFourthPinDigit(text);
    if (text.length === 1) {
      fifthRef.current?.focus();
    }else{
      thirdRef.current?.focus();
    }
  }
  const changeFifthPinDigit = (text: string) => {
    setFifthPinDigit(text);
    if (text.length === 1) {
      sixthRef.current?.focus();
    }else{
      fourthRef.current?.focus();
    }
  }
  const changeSixthPinDigit = (text: string) => {
    setSixthPinDigit(text);
    if (text.length === 0) {
      fifthRef.current?.focus();
    }
  }
  const sendDigits = () => {
    const finalCode = firstPinDigit + secondPinDigit + thirdPinDigit + fourthPinDigit + fifthPinDigit + sixthPinDigit;
    handleVerification(finalCode);
    setLoading(true);
    setVerifying(false);
    console.log("all done")
  }
  return (
    <SafeAreaView testID={"53:187"} style={styles.root}>
        <TouchableWithoutFeedback testID="7:121" style={styles.frame24} onPress={Keyboard.dismiss}>
        <View style={styles.body}>
          
            <View testID="6:81" style={styles.frame16}>
              <Text testID="6:82" style={styles.enterYourPin}>
                  {`Enter your PIN`}
              </Text>
            </View>
            <View testID="7:85" style={styles.frame162}>
              <Text testID="7:86" style={styles.pinText}>
                {`A six-digit pin was sent to your `}{contactType}
              </Text>
            </View>
            <View testID="6:84" style={styles.frame162}>
              <View testID="6:66" style={styles.digitBox}>
                  <TextInput ref={firstRef} testID="6:67" placeholderTextColor={GRAY} style={styles.textInput} onChangeText={changeFirstPinDigit} maxLength={1} keyboardType="numeric"/>
              </View>
              <View testID="6:69" style={styles.digitBox}>
                  <TextInput ref={secondRef} testID="6:70" placeholderTextColor={GRAY} style={styles.textInput} onChangeText={changeSecondPinDigit} maxLength={1} keyboardType="numeric"/>
              </View>
              <View testID="6:75" style={styles.digitBox}>
                  <TextInput ref={thirdRef} testID="6:76" placeholderTextColor={GRAY} style={styles.textInput} onChangeText={changeThirdPinDigit} maxLength={1} keyboardType="numeric"/>
              </View>
              <View testID="6:78" style={styles.digitBox}>
                  <TextInput ref={fourthRef} testID="6:79" placeholderTextColor={GRAY} style={styles.textInput} onChangeText={changeFourthPinDigit} maxLength={1} keyboardType="numeric"/>
              </View>
              <View testID="6:78" style={styles.digitBox}>
                  <TextInput ref={fifthRef} testID="6:79" placeholderTextColor={GRAY} style={styles.textInput} onChangeText={changeFifthPinDigit} maxLength={1} keyboardType="numeric"/>
              </View>
              <View testID="6:78" style={styles.digitBox}>
                  <TextInput ref={sixthRef} testID="6:79" placeholderTextColor={GRAY} style={styles.textInput} onChangeText={changeSixthPinDigit} maxLength={1} keyboardType="numeric"/>
              </View>
            </View>
            <View testID="7:117" style={styles.frame22}>
              <Pressable testID="7:118" onPress={ () => {console.log("resend pin")}}>
                <Text style={styles.resendPin}>
                {`Resend PIN`}
                </Text>
              </Pressable>
            </View>
            <View testID="7:120" style={styles.backVerifyRow}>
              <Pressable testID="7:111" style={styles.backButton} onPress={() => {setVerifying(false)}}>
                <Text testID="7:112" style={styles.back}>
                  {`Back`}
                </Text>
              </Pressable>
              <Pressable testID="7:114" style={styles.verifyButton} onPress={() => { sendDigits() }}>
                <Text testID="7:115" style={styles.verify}>
                  {`Verify`}
                </Text>
              </Pressable>
            </View>
          
        </View>
        </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  body: {

    paddingTop: 50,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '89%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
  },
  enterYourPin: {
    color: 'rgba(58, 73, 117, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  frame24: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame16: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
  },
  pinText: {
    color: 'rgba(78, 176, 162, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame162: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textInput: {
    color: 'black',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 36,
    width: 20,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame20: {
    flexDirection: 'row',
    paddingTop: 24,
    paddingLeft: 12,
    paddingBottom: 24,
    paddingRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 17,
    columnGap: 17,
  },
  digitBox: {
    flexDirection: 'row',
    width: 41,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  resendPin: {
    color: 'rgba(78, 176, 162, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  frame22: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  back: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  backVerifyRow: {
    flexDirection: 'row',
    width: 355,
    paddingTop: 2,
    paddingLeft: 14,
    paddingBottom: 2,
    paddingRight: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  verify: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  verifyButton: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
});

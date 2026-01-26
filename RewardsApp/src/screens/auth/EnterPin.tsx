import FONTS from '@/constants/fonts';
import { JSX, use, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_HEIGHT = Dimensions.get('window').height
const TABBAR_HEIGHT = 60
const CODE_LENGTH = 6
const GRAY = 'rgba(146, 144, 180, 1)'
type props={
  setLoading: (loading: boolean) => void
  setVerifying: (verify: boolean) => void, 
  handleVerification: (code: string) => void
}

class Pin {
  digits: string[];
  setDigits: Function[];
  constructor() {
    this.digits = [];
    this.setDigits = [];
    for (let i = 0; i < CODE_LENGTH; i++) {
      [this.digits[i], this.setDigits[i]] = useState("");
    }
  }    
}


export default function EnterPin({ setLoading, setVerifying, handleVerification }: props) {
  const {t} = useTranslation();
  const pin = new Pin();
  const refs: React.RefObject<TextInput|null>[] = [
    useRef<TextInput|null>(null), useRef<TextInput|null>(null), useRef<TextInput|null>(null), useRef<TextInput|null>(null), useRef<TextInput|null>(null), useRef<TextInput|null>(null)
  ];
  const changeTextFunction = (index: number) => {
    return (text: string) => {    
      ;
      pin.setDigits[index](text);
      let newIndex;
      if (text.length === 1) {
        newIndex = index + 1;
        if (newIndex >= CODE_LENGTH) return;
        refs[newIndex].current?.focus();
      }else{
        newIndex = index - 1;
        if (newIndex < 0) return;
        refs[newIndex].current?.focus();
      }
    };
  }
  const keyPressFunction = (index: number) =>{
    return (e: any) => {
      
      let newIndex;
      if (e.nativeEvent.key === 'Backspace' && pin.digits[index] === '') {
        newIndex = index - 1;
        if (newIndex < 0) return;
        refs[newIndex].current?.focus();
        
      }else if (isFinite(e.nativeEvent.key) && pin.digits[index] !== '') {
        newIndex = index + 1;
        if (newIndex >= CODE_LENGTH) return;
        refs[newIndex].current?.focus();
        
      }
    }
  }

  const factory = (index: number, refs: React.RefObject<TextInput|null>[]) => {
    return <View  key={"6:1"+index} testID={"6:"+index} style={styles.digitBox}>
              <TextInput key={"6:1"+index} ref={refs[index]} testID={"6:1"+index} placeholderTextColor={GRAY} style={styles.textInput} onKeyPress={keyPressFunction(index)} onChangeText={changeTextFunction(index)} maxLength={1} keyboardType="numeric"/>
            </View>
  }

  const createPinComponents = () => {
    let components: JSX.Element[] = [];
    for (let i = 0; i < CODE_LENGTH; i++) {
      components.push(
        factory(i, refs)
      );
    } 
    ;
    
    return components;
  };

  const pinComponents = useMemo(() => {
    return createPinComponents();
  }, [createPinComponents]);
  ;
  const sendDigits = useCallback(() => {
    ;
    handleVerification(pin.digits.join(''));
    setLoading(true);
    setVerifying(false);
    
  }, [pin.digits]);

  return (
    <SafeAreaView testID={"53:187"} style={styles.root}>
      <TouchableWithoutFeedback testID="7:121" style={styles.touchable} onPress={Keyboard.dismiss}>
      <View style={styles.body}>
        <View testID="6:81" style={styles.bodyText}>
          <Text testID="6:82" style={styles.enterYourPin}>
              {t("auth.enterPin")}
          </Text>
        </View>
        <View testID="7:85" style={styles.bodyText2}>
          <Text testID="7:86" style={styles.pinText}>
            {t("auth.pinMessage")}
          </Text>
        </View>
        <View testID="6:84" style={styles.bodyText2}>
          {pinComponents}
        </View>
        <View testID="7:117" style={styles.resendPin}>
          <Pressable testID="7:118" onPress={ () => {}}>
            <Text style={styles.resendPinText}>
            {t("auth.resendPin")}
            </Text>
          </Pressable>
        </View>
        <View testID="7:120" style={styles.backVerifyRow}>
          <Pressable testID="7:111" style={styles.backButton} onPress={() => {setVerifying(false)}}>
            <Text testID="7:112" style={styles.back}>
              {t("auth.back")}
            </Text>
          </Pressable>
          <Pressable testID="7:114" style={styles.verifyButton} onPress={() => { sendDigits() }}>
            <Text testID="7:115" style={styles.verify}>
              {t("auth.verify")}
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
  touchable: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
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
  bodyText2: {
    flexDirection: 'row',
    padding: 10,
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
  resendPinText: {
    color: 'rgba(78, 176, 162, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  resendPin: {
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
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
});

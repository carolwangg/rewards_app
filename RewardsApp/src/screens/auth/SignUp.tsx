import { TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, Pressable, Text, View, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Checkmark from '@/assets/images/checkmark.svg'
import BottomPolygon from '@/assets/images/bottom-pattern-light.svg';
import TopPolygon from '@/assets/images/top-pattern-light.svg';
import FONTS from '@/constants/fonts';
import { COUNTRY_CODES } from '@/constants/constants';
import { useState, useMemo, useRef } from 'react';
type props={
  userType: string,
  onSignUp: (email: string, name: string, country: string)=>void
}

export default function SignUp({userType, onSignUp}: props) {
    const [checked, setChecked] = useState(false);
    const [checkFill, setCheckFill] = useState('rgba(255, 255, 255, 1)');
    const [selectedCountryID, setSelectedCountryID] = useState(-1);
    const [selectedCountry, setSelectedCountry] = useState("Country");
    const emailRef = useRef<string>(null);
    const performSignUp = () => {
      if (!checked){
        Alert.alert("Error signing up", "Please agree to terms and conditions and privacy policy first.");
        return;
      }
      if (selectedCountryID == -1){
        Alert.alert("Error signing up", "Please pick a country.");
        return;
      }
      const email = emailRef.current?emailRef.current: "";
      console.log(COUNTRY_CODES[selectedCountry]);
      onSignUp(email, name, COUNTRY_CODES[selectedCountry]);
    }

    const acceptTerms = () => {
        //toggle checkBox
        const temp = !checked
        setChecked(temp);
        const color = temp ? '#ededed' : 'rgba(255, 255, 255, 1)';
        setCheckFill(color);
    }

    const changeSelectedCountry = (countryID: number) => {
        //change selected country based on dropdown selection
        //dummy country data for now
        const countries = ["USA", "Canada", "UK", "Germany", "France"];
        setSelectedCountry(countries[countryID]);
    }

    const data = [
        { label: 'USA', value: 0 },
        { label: 'Canada', value: 1 },
        { label: 'Spain', value: 2 },
      ];

  const [name, setName] = useState("");
  const { formContents } = useMemo(() => {
    let formContents = <View></View>;
    if (userType == "business"){
      Alert.alert("set contents for business");
      formContents = <TextInput style={[styles.bodyText, styles.containerStyle]} placeholder='Business Name' placeholderTextColor={'rgba(146, 144, 180, 1)'} onChangeText={(newName: string)=>{setName(newName)}}/>;
    }else{
      Alert.alert("set contents for customers");
    }
    return { formContents: formContents}}, []);

  console.log(emailRef.current);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View testID={"139:1288"} style={styles.root}>
        <View testID={"131:000"} style={styles.topPattern}>
            <TopPolygon/>
        </View>
        <View testID={"131:001"} style={styles.bottomPattern}>
          <BottomPolygon/>
        </View>
        <View testID="139:1197" style={styles.signUpBox}>
            <View testID="139:1222" style={styles.signUpText}>
                <Text testID="139:1223" style={styles.signUp}>
                    {`Sign Up`}
                </Text>
            </View>
            <View style={styles.formContents}>
              {formContents}
                <TextInput style={[styles.containerStyle, styles.bodyText, {width: '100%'}]} placeholder='Email' placeholderTextColor={'rgba(146, 144, 180, 1)'} onChangeText={(text) => {
                emailRef.current = text;}}/>
              <DropdownComponent data ={data} value={selectedCountryID} setValue={setSelectedCountryID} subFunction={changeSelectedCountry} placeholder="Country"/> 
            </View>
            <View testID="139:1237" style={styles.termsFrame}>
                <Pressable testID="139:1241" style={[styles.checkBox, {backgroundColor: checkFill}]} onPress={acceptTerms}>
                  <View style={styles.checkMarkBox}>
                    <Checkmark style={{display: checked? 'flex': 'none'}}/>
                  </View>
                </Pressable>
                <View testID="139:1281" style={styles.frame68}>
                    <Text testID="139:1238" style={styles.termsText}>
                    {`Accept `}
                    </Text>
                    <View testID="139:1278" style={styles.frame66}>
                    <Text testID="139:1271" style={styles.termsText2}>
                        {`Terms and Conditions `}
                    </Text>
                    </View>
                    <Text testID="139:1275" style={styles.termsText3}>
                    {`and`}
                    </Text>
                    <View testID="139:1280" style={styles.frame67}>
                    <Text testID="139:1273" style={styles.termsText4}>
                        {`Privacy Policy`}
                    </Text>
                    </View>
                </View>
            </View>
            <View testID="7:120" style={styles.joinRow}>  
                <Pressable testID="139:1268" style={styles.joinNowButton} onPress={performSignUp}>
                    <Text testID="139:1269" style={styles.joinNow}>
                        {`Join now`}
                    </Text>
                </Pressable>
            </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

type dropdownProps = {
    data: any
    value: Number
    setValue: Function
    subFunction: Function
    placeholder: string
}
const DropdownComponent = ({data, value, setValue, subFunction, placeholder}: dropdownProps) => {
    return <Dropdown
        style={[styles.containerStyle]}
        containerStyle={styles.dropdownItemContainer}
        placeholderStyle={styles.placeholderText}
        selectedTextStyle={styles.bodyText}
        inputSearchStyle={styles.bodyText}
        searchPlaceholderTextColor='rgba(146, 144, 180, 1)'
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search countries"
        value={value}
        onChange={item => {
            setValue(item.value);
            subFunction(item.value);
        }}/>;
    }
const styles = StyleSheet.create({
  root: {
    width: 393,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContents: {
    width: '100%', 
    rowGap: 10
  },
  bodyText: {
    color: 'black',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  placeholderText: {
    color: 'rgba(146, 144, 180, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  signUpBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 295,
    paddingVertical: 13,
    paddingHorizontal: 7,
    flexDirection: 'column',    
    columnGap: 10,
  },
  containerStyle: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 30,
    borderWidth: 1,
  },
  countryFrame: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  checkMarkBox: {
    position:'absolute',
    left: 0,
    top: 0,
    width: '100%', 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  checkBox: {
    position: 'relative',
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  termsText: {
    width: 47,
    flexShrink: 0,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  termsText2: {
    color: 'rgba(74, 189, 172, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  termsFrame: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  frame68: {
    flexDirection: 'row',
    width: '85%',
    alignItems: 'center',
    alignContent: 'center',
    columnGap: 9,
    flexWrap: 'wrap',
  },
  frame66: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText3: {
    width: 25,
    flexShrink: 0,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  termsText4: {
    width: 136,
    color: 'rgba(74, 189, 172, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  frame67: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinNow: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  joinNowButton: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'rgba(183, 230, 130, 1)',
  },
  signUp: {
    color: 'rgba(58, 73, 117, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 48,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  signUpText: {
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 20,
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
  joinRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dropdownItemContainer: {
    height: 'auto',
    width: 200,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

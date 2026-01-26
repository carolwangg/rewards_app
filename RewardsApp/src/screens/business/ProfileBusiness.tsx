import FONTS from '@/constants/fonts';
import { useBusiness } from '@/constants/useBusiness';
import { useCard } from '@/constants/useCards';
import { getBusiness, getCard, updateCardImage } from '@/services/apiCalls';
import { useClerk } from '@clerk/clerk-expo';
import DefaultLogo from '@/assets/images/default-logo.svg';
import { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshControl, Pressable, ScrollView, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import Editable from '@/components/Editable';
import { updateBusiness, updateCard } from '@/services/apiCalls';
import Header from '@/components/Header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { EMPTY_BUSINESS, EMPTY_CARD } from '@/constants/interfaces';
import Settings from '@/assets/images/settings-icon.svg'
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import ColorPicker, {Panel1, HueSlider, InputWidget} from "reanimated-color-picker";
import ColorWidget from "@/assets/images/color-widget.svg"
import Pencil from "@/assets/images/pencil-icon.svg"
import { pickImage } from '@/helpers/imagePicker';
import COLOURS, { DEFAULT_CARD_COLOUR, DEFAULT_CARD_TEXT_COLOUR } from '@/constants/colours';
import { UNIVERSAL_STYLES } from '@/constants/styles';
import { BusinessHook, CardHook } from '@/constants/hooks';
import UpdateCard from './UpdateCard';
import BusinessInfo from '@/components/BusinessInfo';
import BusinessPage from './BusinessPage';
import UpdateBusinessProfile from './UpdateBusinessProfile';

type Props = {
  userId: string, 
}
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BUSINESS_ATTRIBUTES = ["Email", "Business Name"];

export default function Profile({userId}: Props) {
  const {t} = useTranslation();
  const { signOut } = useClerk()
  const business = useBusiness(EMPTY_BUSINESS);

  const card = useCard(EMPTY_CARD);

  const [editingCard, setEditingCard] = useState(false);
  const [editingDetails, setEditingDetails] = useState(false);
  const [editingColourStrategy, setEditingColourStrategy] = useState("");
  const imageEdited = useRef(false);

  useEffect(()=>{
    performGetBusiness(userId, business);
    performGetCard(userId, card);
  }, []);
  const onSignOut = () => {
    signOut();
    
    router.replace('/welcome');
    
  }

  const editBusiness = useCallback(() => {
    console.log("getbusiness:"+JSON.stringify(business.getBusiness()) )
    router.push({pathname: './edit-business', params: { userId: userId, business: JSON.stringify(business.getBusiness()) }})
  }, [business]);

  const editCard = useCallback(() => {
    router.push({pathname: './edit-card', params: { userId: userId, card: JSON.stringify(card.getCard()) }})
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    performGetBusiness(userId, business);
    performGetCard(userId, card);
    setRefreshing(false);
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const factory = useCallback((name: string) => {
      let value, translatedName: string;
      let setValue: (value: string) => void;
      switch(name){
          case "Business Name":
            translatedName = t('name');
            value = business.name;
            setValue = business.setName;
            break;
          case "Email":
            translatedName = t('email');
            value = business.email;
            setValue = business.setEmail;
            break;
          default:
            translatedName = "default"
            value = "default";
            setValue = (value: string) => {};
            break;
      }
      const placeholder = t('new') + translatedName;
      return <Editable key={name} editing={editingDetails} name={translatedName} placeHolder={placeholder} value={value} setValue={setValue}/>
    }, [business, editingDetails]);
  
    const editImage = useCallback( () =>{
        
        imageEdited.current = true;
        pickImage((uri: string) =>{card.setimage_url(uri);}, [1, 1]);
      }, []);
      
  const colorWidgetFactory = useCallback((attribute: string) => {
    let component;
    switch (attribute){
      case "colour":
        component = <View style={styles.colourPickerBody}>
                      <ColorPicker style={styles.colorPicker} value={card.colour} onChangeJS={
                        ({ hex }: { hex: string }) => {
                          // do something with the selected color.
                          card.setColour(hex);
                        }
                      }>
                      <Panel1 />
                      <HueSlider />
                      <InputWidget defaultFormat='HEX'/>
                    </ColorPicker>
                    {/* <Pressable style={styles.button} onPress={()=>{setEditingColor(false)}}><Text style={UNIVERSAL_STYLES.bodyText}>{t("save")}</Text></Pressable> */}
                    </View>
        break;
      case "textColour":
        component = <View style={styles.colourPickerBody}>
                      <ColorPicker style={styles.colorPicker} value={card.textColour} onChangeJS={
                        ({ hex }: { hex: string }) => {
                          // do something with the selected color.
                          card.setTextColour(hex);
                        }
                      }>
                      <Panel1 />
                      <HueSlider />
                      <InputWidget defaultFormat='HEX'/>
                    </ColorPicker>
                    {/* <Pressable style={styles.button} onPress={()=>{setEditingColor(false)}}><Text style={UNIVERSAL_STYLES.bodyText}>{t("save")}</Text></Pressable> */}
                    </View>
        break;
      default:
        component = null;
        break;
      }
      return component;
    },[card] );
  return (
    <SafeAreaProvider>
      <SafeAreaView testID={"53:202"} style={styles.root}>
        <ScrollView contentContainerStyle={styles.scroll} refreshControl={<RefreshControl style={{borderWidth: 1}} refreshing={refreshing} onRefresh={onRefresh}/>}>
          <View>
            <View style={styles.body}>
              <Pressable style={styles.settingsRow} onPress={()=>{router.replace("./options");}}><Settings/></Pressable>
              <Header headerTextStyle={styles.headerText} headerText={t('business.profile')} onPress={editBusiness} sideText={t('edit')}/>
              <View style={{width: '100%'}}>
                <BusinessPage business={business} onPress={editBusiness}/>
              </View>
            {/* <View testID="9:500" style={styles.frame}> 
              <Header headerTextStyle={styles.headerText} headerText={t('details')} onPress={editToggle} sideText={editingDetails? t('save'): t('edit')}/>
              <View testID="15:136" style={styles.infoBox}>
                {BUSINESS_ATTRIBUTES.map((attribute) => factory(attribute))}
              </View>                
            </View> */}
              <View testID="9:28" style={styles.frame}>
                <Header headerTextStyle={styles.headerText} headerText={t('business.yourCard')} onPress={editCard} sideText={t('edit')}/>
                <View testID="9:580" style={[styles.cardBox, {backgroundColor: card.colour}]}>
                <View style={styles.cardBody}>
                  <View testID="9:581" style={styles.titleBox}>
                    <View testID="154:1066" style={styles.imageBox}>
                    {card.image_url? <Image source={{uri: card.image_url}} style={styles.image}/> : <DefaultLogo width={70} height={70}/>}
                    </View>
                    <View style={styles.cardEdit}>
                      <View style={styles.row}><Editable contentContainerStyle={{flex: 1}} textInputContainerStyle={{flex: 0}} maxLength={30} textStyle={[styles.businessName, {color: card.textColour}]} editing={false} name={""} placeHolder={'Business name'} value={card.name} setValue={card.setName}/></View>
                    </View>
                  </View>
                  <View style={styles.cardInfoBox}>
                    <Editable textStyle={{color: card.textColour}} editing={false} name={""} placeHolder={t('business.contactInfo')} value={card.contactInfo} setValue={card.setContactInfo} noValuePlaceholder={t('business.contactInfo')}/>
                    <Editable textStyle={{color: card.textColour}} editing={false} name={""} placeHolder={t('business.tagline')} value={card.description} setValue={card.setDescription} noValuePlaceholder={t('business.tagline')}/>
                  </View>
                </View> 
                  {editingColourStrategy?colorWidgetFactory(editingColourStrategy): null}
                </View>
              </View>
              
              <Pressable testID="15:137" style={styles.signOutButton} onPress= {onSignOut}>
              <Text testID="15:138" style={styles.signOutText}>
                {t('signOut')}
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
  console.log("id:"+userId)
  try{
    getBusiness(userId).then(data => {
      business.populate(data.user);
    });
    console.log("business populated:"+JSON.stringify(business))
  }catch (err){
    console.error("Error fetching business:"+err);
  }
}

function performGetCard(userId: string, card: CardHook){
  try{
    getCard(userId).then(data => {      
      if (!data.user) {console.error("No card exists for user:"+ userId); return;}
      data.user.name? card.setName(data.user.name): card.setName("");
      data.user.description? card.setDescription(data.user.description): card.setDescription("");
      data.user.contact_info? card.setContactInfo(data.user.contact_info): card.setContactInfo("");
      data.user.colour? card.setColour(data.user.colour): card.setColour(DEFAULT_CARD_COLOUR);
      data.user.text_colour? card.setTextColour(data.user.text_colour): card.setTextColour(DEFAULT_CARD_TEXT_COLOUR);
      data.user.image_url? card.setimage_url(data.user.image_url): null;
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
    justifyContent: "center",
    width: SCREEN_WIDTH,
    height: 'auto',
  },
  pencil: {
    position: 'absolute',
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    // backgroundColor: 'blue'
  },
  image: {
    width: 70, 
    height: 70, 
    borderRadius: '100%',
    backgroundColor: 'white'
  },
  settingsRow: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  },
  body: {
    width: '90%',
    paddingTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    rowGap: 30,
   },
   overlay:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
   },
   colourPickerBody:{
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 1,
    backgroundColor: COLOURS.WHITE,
    width: '100%'
   },
  frame: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    flex: 1,
  },
  colorPicker: {
    width: '100%',
    height: 'auto'
  },
  colorWidget:{
    height: 20,
    width: 20,
    // borderColor: 'white',
    // borderWidth: 5,
  },
  colorWidgetBody:{
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    borderWidth: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 25,
    backgroundColor: 'rgba(109, 109, 109, 0.34)',
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
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(104, 155, 97, 1)',
  },
  cardBody:{
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    rowGap: 20
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
    columnGap: 10
    // borderWidth: 1
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
  infoBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
    flex: 1,
    // backgroundColor: 'yellow'
  },
  row:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    // backgroundColor: 'white'
  },
  colourBox:{
    paddingVertical: 0,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  button:{
    alignSelf: 'flex-end',
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: COLOURS.LIGHT_GREEN,
    paddingVertical: 10,
    paddingHorizontal: 20
  }
});

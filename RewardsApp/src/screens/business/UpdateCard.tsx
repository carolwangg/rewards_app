import Editable from "@/components/Editable"
import Header from "@/components/Header"
import COLOURS from "@/constants/colours"
import FONTS from "@/constants/fonts"
import { CardHook } from "@/constants/hooks"
import { pickImage } from "@/helpers/imagePicker"
import { RefObject, useCallback, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { View, Dimensions, Image, Pressable, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from "react-native"
import ColorPicker, { HueSlider, InputWidget, Panel1 } from "reanimated-color-picker"
import DefaultLogo from '@/assets/images/default-logo.svg';
import Pencil from "@/assets/images/pencil-icon.svg"
import ColorWidget from "@/assets/images/color-widget.svg"
import { UNIVERSAL_STYLES } from "@/constants/styles"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

type Props = {
    card: CardHook
    onSave: (event: any) => void
    imageEdited: RefObject<boolean>
}
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function UpdateCard ({card, onSave, imageEdited}: Props) {
    const {t} = useTranslation();
    const [editingColourStrategy, setEditingColourStrategy] = useState("");
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
    console.log("card image:"+card.image_url);
    return <SafeAreaProvider>
    <SafeAreaView>
        <Pressable onPress={() =>{Keyboard.dismiss(); setEditingColourStrategy("")}}>
        <View  style={[UNIVERSAL_STYLES.root, {height: '100%', borderWidth: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}]}>

        
        <View testID="9:28" style={styles.frame}>
                <View testID="9:580" style={[styles.cardBox, {backgroundColor: card.colour}]}>
                <View style={styles.cardBody}>
                <View style={styles.colorWidgetBody}>
                    <Pressable style={styles.colorWidget} onPress={()=>{setEditingColourStrategy("colour")}}>
                    <ColorWidget/>
                    </Pressable>
                    <Text style={{color: COLOURS.DARK_GRAY}}>{"Edit Card Colour"}</Text>
                </View>
                    <View testID="9:581" style={styles.titleBox}>
                    <View testID="154:1066" style={styles.imageBox}>
                    {card.image_url? <Image source={{uri: card.image_url}} style={styles.image}/> : <DefaultLogo width={70} height={70}/>}
                    <Pressable style={styles.pencil} onPress={editImage}><Pencil/></Pressable>
                    </View>
                    <View style={styles.cardEdit}>
                      <View style={styles.row}><Editable contentContainerStyle={{flex: 1}} textInputContainerStyle={{flex: 0}} maxLength={30} textStyle={[styles.businessName, {color: card.textColour}]} editing={true} name={""} placeHolder={'Business name'} value={card.name} setValue={card.setName}/><Pressable style={[styles.colorWidget]} onPress={()=>{setEditingColourStrategy("textColour")}}><ColorWidget/></Pressable></View>
                      {/* <Editable maxLength={7} textStyle={{color: 'white'}} contentContainerStyle={styles.colourBox} editing={editingCard} name={""} placeHolder={'HEX colour'} value={card.colour} setValue={card.setColour}/> */}
                    </View>
                  </View>
                  <View style={styles.cardInfoBox}>
                    <Editable textStyle={{color: card.textColour}} editing={true} name={""} placeHolder={t('business.contactInfo')} value={card.contactInfo} setValue={card.setContactInfo} noValuePlaceholder={t('business.contactInfo')}/>
                    <Editable textStyle={{color: card.textColour}} editing={true} name={""} placeHolder={t('business.tagline')} value={card.description} setValue={card.setDescription} noValuePlaceholder={t('business.tagline')}/>
                  </View>
                </View> 
                  {editingColourStrategy? colorWidgetFactory(editingColourStrategy): null}
                </View>
              </View>
              <View style={styles.saveButtonRow}>
                <Pressable style={styles.saveButton} onPress={onSave}><Text style={UNIVERSAL_STYLES.bodyText}>{"Save"}</Text></Pressable>
            </View>
           
            </View>
             </Pressable>
        </SafeAreaView>
        </SafeAreaProvider>
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
    width: '100%',
    height: 'auto',
    alignItems: 'flex-end',
  },
  body: {
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
  },
  saveButtonRow: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1
    },
    saveButton: {
        backgroundColor: COLOURS.WHITE,
        borderColor: COLOURS.DARK_BLUE,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 45,
        borderWidth: 1
    }
});

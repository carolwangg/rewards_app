import ImageViewer from '@/components/ImageViewer';
import FONTS from '@/fonts';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import StackedList from './StackedList';

const SCREEN_HEIGHT = Dimensions.get('window').height
const TABBAR_HEIGHT = 60

export default function QRcodeCustomer() {
  const items = [{name : "item 1"}, {name : "item 2"}, {name : "item 3"}, {name : "item 4"}]
  const qrcode = require("@/assets/images/qrcode.png");
  return (
    <View testID={"53:190"} style={styles.root}>
      <View style = {styles.phone} >
        <View style = {styles.body} >
          <View testID="15:2" style={styles.frame50}>
            <View testID="15:426" style={styles.frame25}>
              <Text testID="15:427" style={styles.businessName}>
                {`BUSINESS NAME`}
              </Text>
            </View>
            <View testID="15:3" style={styles.frame51}>
              <View testID="9:369" style={styles.frame34}>
                <Text testID="9:370" style={styles.cart}>
                  {`Cart`}
                </Text>
              </View>
              <StackedList items = {items}/>
            </View>
            <View testID="9:431" style={styles.frame42}>
              <Text testID="9:432" style={styles.scanQrCodeAtCheckout}>
                {`Scan QR code at checkout`}
              </Text>
            </View>
            <View testID="14:5" style={styles.frame43}>
              <ImageViewer imgSource={qrcode}/>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

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
    paddingTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '89%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    borderColor: 'red',
    borderWidth: 1,
  },
  scanQrCodeAtCheckout: {
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  frame50: {
    width: 345,
    paddingTop: 13,
    paddingLeft: 0,
    paddingBottom: 13,
    paddingRight: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 13,
    columnGap: 13,
  },
  frame42: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    alignSelf: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  frame43: {
    flexDirection: 'row',
    height: 355,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'rgba(183, 230, 130, 1)',
  },
  cart: {
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  frame51: {
    width: 353,
    height: 164,
    flexShrink: 0,
  },
  frame34: {
    flexDirection: 'row',
    width: 342,
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  itemName: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame39: {
    flexDirection: 'row',
    width: 345,
    height: 71,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  frame35: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingRight: 10,
    alignItems: 'center',
  },
  rectangle28: {
    width: 70,
    height: 70,
    flexShrink: 0,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  itemName2: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame40: {
    flexDirection: 'row',
    width: 345,
    height: 72,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  frame352: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingRight: 10,
    alignItems: 'center',
  },
  rectangle282: {
    width: 70,
    height: 70,
    flexShrink: 0,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  itemName3: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame41: {
    flexDirection: 'row',
    width: 345,
    height: 71,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  frame353: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingRight: 10,
    alignItems: 'center',
  },
  rectangle283: {
    width: 70,
    height: 70,
    flexShrink: 0,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  businessName: {
    color: 'rgba(58, 73, 117, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  frame25: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
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
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame412: {
    flexDirection: 'row',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: 'rgba(104, 155, 97, 1)',
  },
});

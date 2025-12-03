import FONTS from '@/constants/fonts';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import ListItem from './StackedList';
import QRCode from 'react-native-qrcode-svg';
import { useMemo, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RedeemInfo, AddPointInfo, isRedeemInfo } from '@/constants/interfaces';
const SCREEN_HEIGHT = Dimensions.get('window').height
const TABBAR_HEIGHT = 60

type Props = {
  data: RedeemInfo | AddPointInfo
}

function getCartView(cart: RedeemInfo | AddPointInfo){
  console.log("customer cart:"+cart);
  if (isRedeemInfo(cart)){
    console.log("cart: "+cart)
    return <View testID="15:3" style={styles.frame51}>
            <View testID="9:369" style={styles.dataBox}>
              <Text testID="9:370" style={styles.data}>
                {`Cart`}
              </Text>
            </View>
            <ListItem id={cart.reward_id} name={cart.reward_name} offset={0}/>
          </View>
  }
}


export default function QRcodeCustomer({data}: Props) {
  const [qrSize, setQrSize] = useState<number>(100);
  
  
  return (
    <SafeAreaProvider>
    <SafeAreaView testID={"53:190"} style={styles.root} edges={["top"]}>
      <View style = {styles.phone} >
        <View style = {styles.body} >
          {getCartView(data)}
          <View testID="9:431" style={styles.scanQrBox}>
            <Text testID="9:432" style={styles.scanQrCodeAtCheckout}>
              {`Scan QR at checkout`}
            </Text>
          </View>
          <View
            testID="14:5"
            style={styles.qrCodeBox}
            onLayout={({ nativeEvent }) => setQrSize(nativeEvent.layout.width - 100)}
          >
            <View style = {styles.blueBox}>
              <QRCode
              value={JSON.stringify(data)}
              size={qrSize}
              />
            </View>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

// ...existing code...
const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    height: SCREEN_HEIGHT - TABBAR_HEIGHT
  },
  phone: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    paddingTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    marginTop: 50,
  },
  blueBox:{
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'rgba(58, 73, 117, 1)',
  },
  frame25: {
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  businessName: {
    color: 'rgba(58, 73, 117, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  frame51: {
    width: 353,
    height: 164,
    flexShrink: 0,
  },
  dataBox: {
    flexDirection: 'row',
    alignSelf:'stretch',
    paddingVertical: 0,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  data: {
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  scanQrBox: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  scanQrCodeAtCheckout: {
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  qrCodeBox: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});

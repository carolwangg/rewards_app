import Zink from '@/assets/images/zinks.svg';
import FONTS from '@/constants/fonts';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const TABBAR_HEIGHT = 60

export default function Success() {
  return (
    <View testID={"53:188"} style={styles.root}>
      <View style={styles.phone}>
        <View style={styles.body}>
          <View testID="7:124" style={styles.frame16}>
            <Text testID="7:125" style={styles.pleaseWaitWhileWeVerify}>
              {`Please wait while we verify...`}
            </Text>
          </View>
          <Zink width={190} height={190}/>
          <View testID="8:152" style={styles.frame25}>
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M65.413 26.9534L38.509 53.8574L24.5835 39.9318L20 44.5153L38.509 63.0275L69.9997 31.5401L65.413 26.9534Z" fill="#689B61"/>
            </svg>
          </View>
        </View>
      </View>
    </View>
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
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '89%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    borderColor: 'red',
    borderWidth: 1,
    rowGap: 40,
  },
  pleaseWaitWhileWeVerify: {
    color: 'rgba(58, 73, 117, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame16: {
    flexDirection: 'row',
    height: 55,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  frame25: {
    flexDirection: 'row',
    width: 90,
    height: 90,
    paddingTop: 13,
    paddingLeft: 0,
    paddingBottom: 13,
    paddingRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: 'rgba(104, 155, 97, 1)',
    backgroundColor: 'rgba(183, 230, 130, 1)',
  },
});

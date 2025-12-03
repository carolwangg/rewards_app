import { StyleSheet, Pressable, Text, View } from 'react-native';

import BusinessIcon from '@/assets/images/business-button-image.svg';
import CustomerIcon from '@/assets/images/customer-button-image.svg';

import WelcomeBottomPattern from '@/assets/images/bottom-pattern.svg';
import WelcomeTopPattern from '@/assets/images/top-pattern.svg';
import FONTS from '@/constants/fonts';
import React from 'react';
import { Dimensions } from 'react-native';


type Props = {
  setChoice: Function;
  toLogin: Function;
}
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Welcome({setChoice, toLogin}: Props) {

  return (
    <View testID={"131:986"} style={styles.root}>
      <View testID={"131:000"} style={styles.topPattern}>
        <WelcomeTopPattern/>
      </View>
      
      <View testID={"131:009"} style={styles.body}>
        <View testID="131:978" style={styles.welcomeText}>
            <Text testID="131:979" style={styles.welcome}>
            {`Welcome`}
            </Text>
        </View>
        <View testID="130:578" style={styles.questionBox}>
          <Text testID="130:579" style={styles.questionText}>
            {`Are you a:`}
          </Text>
        </View>
        <View testID="130:551" style={styles.buttons}>
          <Pressable testID="130:527" style={styles.businessButton} onPress={()=>{setChoice("business"); toLogin();}}>
              <View testID="131:984" style={styles.businessButtonIcon}>
                  <BusinessIcon/>
              </View>
              <Text testID="130:528" style={styles.business}>
                  {`Business`}
              </Text>
          </Pressable>
          <Pressable testID="130:530" style={styles.customerButton} onPress={()=>{setChoice("customer"); toLogin();}}>
              <View testID="131:985" style={styles.customerButtonIcon}>
                  <CustomerIcon/>
              </View>
              <Text testID="130:531" style={styles.customer}>
                  {`Customer`}
              </Text>
          </Pressable>
        </View>
      </View>
      <View testID={"131:001"} style={styles.bottomPattern}>
        <WelcomeBottomPattern/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: SCREEN_WIDTH,
    height: "100%",
    backgroundColor: 'rgba(255, 255, 255, 1)',
    position: 'relative',
    borderColor: 'rgba(0, 0, 0, 1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    alignSelf: 'stretch',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
  },
  businessButtonIcon: {
    position: 'absolute',
    right: 0,
  },
  business: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    left: 40,
  },
  buttons: {
    width: 227,
    paddingTop: 13,
    paddingLeft: 7,
    paddingBottom: 13,
    paddingRight: 7,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
  },
  businessButton: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    overflow: 'hidden',
    alignSelf: 'stretch',
    borderRadius: 30,
    backgroundColor: 'rgba(197, 237, 206, 1)',
  },
  customerButtonIcon: {
    position: 'absolute',
    right: 0,
  },
  customer: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    left: 40,
  },
  customerButton: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    overflow: 'hidden',
    alignSelf: 'stretch',
    borderRadius: 30,
    backgroundColor: 'rgba(197, 237, 206, 1)',
  },
  questionText: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  questionBox: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  welcome: {
    color: 'rgba(58, 73, 117, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 48,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  welcomeText: {
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
});

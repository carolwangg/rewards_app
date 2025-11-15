import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import FONTS from '../fonts';
import DropdownComponent from './DropdownComponent';
import ListItem from './ListItem';

const SCREEN_HEIGHT = Dimensions.get('window').height
const TABBAR_HEIGHT = 60

export default function Landing() {
  const pointlist = [0, 100, 250, 30, 7, 15];
  const businessNames = ["Restaurant", "bus2", "bus3", "bus4", "bus5"];
  const businessIDs = [1, 2, 3, 4, 5];
  const phoneNumbers = ["6136229999", "6130098753", "1233456679", "2290873354", "8087665432"];
  const descriptions = ["we are a good restaurant", "we are a good business2", "we are a good business3", "we are a good business4", "we are a good business5"];
  const [points, setPoints] = useState(pointlist[0]);
  const [businessName, setBusinessName] = useState(businessNames[0]);
  const [phone, setPhone] = useState(phoneNumbers[0]);
  const [description, setDescription] = useState(descriptions[0]);
  const [businessID, setBusinessID] = useState(businessIDs[0]);
  const [cartSize, setCartSize] = useState(0) ;
  let cart = [];

  let data = [];
  const businessIDstoInfo = new Map();
  for (let i = 0; i < businessNames.length; i++) {
    let obj = { label: businessNames[i], value: businessIDs[i] };
    data.push(obj);
    let obj1 = { businessName: businessNames[i],  points: pointlist[i], phone: phoneNumbers[i], tagline: descriptions[i]};
    businessIDstoInfo.set(businessIDs[i], obj1);
  }
  const items = [{id: '1', title: 'chicken parm', desc: 'a delicious yummy chicken parm', price: '250'}, 
      {id: '2', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'},
    {id: '3', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'}];
    const listItems = items.map((item) => <ListItem key={item['id']} title={item['title']} description={item['desc']} price={item['price']} itemId={item['id']} />);

  const changeBusiness = (id: number) =>{
    console.log(id)
    setPoints(businessIDstoInfo.get(id).points);
    setPhone(businessIDstoInfo.get(id).phone);
    setBusinessName(businessIDstoInfo.get(id).businessName);
    setDescription(businessIDstoInfo.get(id).tagline);
  }

  return (
    
    <View testID={"53:189"} style={styles.root}>
      <View style={styles.phone}>
        <View style={styles.body}>
          <View testID="9:230" style={styles.frame25}>
            <Text testID="9:231" style={styles.welcomeJohn}>
              {`Welcome, John`}
            </Text>
          </View>
          <View testID="9:188" style={styles.frame14}>
            <View style={styles.frame32}><DropdownComponent data={data} value={businessID} setValue={setBusinessID} subFunction={changeBusiness} /></View>
          </View>
          <View testID="9:207" style={styles.frame142}>
            <View testID="9:214" style={styles.frame29}>
              <Ionicons name={'ellipse'} size={70}/>
              <Text testID="9:210" style={styles.businessName2}>
                {businessName}
              </Text>
            </View>
            <Text testID="9:212" style={styles.phoneNumber}>
              {phone}
            </Text>
            <Text testID="9:208" style={styles.tagline}>
              {description}
            </Text>
          </View>
          <View testID="9:216" style={styles.frame30}>
            <Text testID="9:218" style={styles.points}>
              {`Points:`}
            </Text>
            <View testID="9:222" style={styles.frame31}>
              <Text testID="9:220" style={styles.$124}>
                {points}
              </Text>
            </View>
          </View>
          
          <View testID="9:254" style={styles.frame34}>
            <Text testID="9:255" style={styles.yourOffers}>
              {`Your Offers`}
            </Text>
            <Text testID="9:257" style={styles.sortByLowest}>
              {`Sort by: Lowest`}
            </Text>
          </View>
          <View style={styles.offers}>
            <View testID="9:248" style={styles.frame33}>
              {listItems}
            </View>
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
  businessName: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame14: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  frame32: {
    borderRadius: 30,
    backgroundColor: 'rgba(183, 230, 130, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: 10
  },
  businessName2: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame142: {
    width: 340,
    height: 227,
    paddingTop: 10,
    paddingLeft: 30,
    paddingBottom: 10,
    paddingRight: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(104, 155, 97, 1)',
  },
  frame29: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 0,
    paddingBottom: 10,
    paddingRight: 0,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    alignSelf: 'stretch',
  },
  phoneNumber: {
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
  points: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  $124: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame30: {
    flexDirection: 'row',
    width: 320,
    padding: 10,
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 10,
  },
  frame31: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingRight: 10,
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  welcomeJohn: {
    color: 'rgba(58, 73, 117, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  frame25: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  offers: {
    display: "flex",
    flexDirection: "column",
    width: '100%',
    height: '30%',
    boxSizing: 'border-box',
    overflowY: "auto"
  },
  yourOffers: {
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  sortByLowest: {
    color: 'rgba(120, 119, 146, 1)',
    textAlign: 'center',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame34: {
    flexDirection: 'row',
    width: 342,
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  itemName: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  descriptionOfItemGoesRightOverHere: {
    width: 206,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame33: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 12,
    boxSizing: 'border-box'
  },
  frame312: {
    flexDirection: 'row',
    height: 131,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    alignSelf: 'stretch',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  frame292: {
    width: 202,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
  },
  rectangle28: {
    width: 90,
    height: 91,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  itemName2: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  descriptionOfItemGoesRightOverHere2: {
    width: 206,
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame322: {
    flexDirection: 'row',
    height: 131,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    alignSelf: 'stretch',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  frame293: {
    width: 202,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
  },
  rectangle282: {
    width: 90,
    height: 90,
    backgroundColor: 'rgba(217, 217, 217, 1)',
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
  frame282: {
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
});

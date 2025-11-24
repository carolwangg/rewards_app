import FONTS from '@/fonts';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ListItem from "./ListItemB";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCROLL_BAR_WIDTH = 10
const ITEMS_WIDTH = 10
const TABBAR_HEIGHT = 60
const WELCOME_FONT_SIZE = 28
const WELCOME_HEIGHT = 38
const YOUROFFERS_FONT_SIZE = 24

export default function Landing({onPressFunction}: {onPressFunction: () => void}) {
  const [sortType, setSortType] = useState("Lowest");

  const items = [{id: '1', title: 'chicken parm', desc: 'a delicious yummy chicken parm', price: '250'}, 
    {id: '2', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'},
  {id: '3', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'},
{id: '4', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'},
{id: '5', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'},
{id: '6', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'}];
  const listItems = items.map((item) => <ListItem key={item['id']} title={item['title']} description={item['desc']} price={(Number)(item['price'])} itemId={item['id']} />);

  return (
    <View style = {styles.root} >
      <View style = {styles.phone} >
        <View testID={"53:198"} style = {styles.body} >
          <View testID="9:552" style={styles.frame25}>
            <Text testID="9:553" style={styles.welcomeBusinessName}>
              {`Welcome, Business Name`}
            </Text>
          </View>
          <View testID="9:554" style={styles.frame34}>
            <Text testID="9:555" style={styles.yourOffers}>
              {`Your Offers`}
            </Text>
            <Pressable onPress={() => {
              if (sortType === "Lowest") {
                setSortType("Highest");
              } else {
                setSortType("Lowest");
              }}}>
            <Text testID="9:556" style={styles.sortByLowest}>
              {`Sort by: `}{sortType}
            </Text>
            </Pressable>
          </View>
          <View testID="9:557" style={styles.offers}>          
            <ScrollView testID="9:557" contentContainerStyle={styles.listItems}>
              {listItems}
            </ScrollView>
          </View>
          <Pressable onPress={onPressFunction} testID="14:105" style={styles.plus}>
              <Ionicons name={true? 'add-outline': 'add-sharp'} color={'green'} size={60}/>
          </Pressable>
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
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    paddingTop: 50,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '85%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start"
  },
  welcomeBusinessName: {
    color: 'rgba(58, 73, 117, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: WELCOME_FONT_SIZE,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  frame25: {
    paddingLeft: 10,
    width: '100%',
    height: WELCOME_HEIGHT,
    marginBottom: 10
  },
  yourOffers: {
    display: "flex",
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: YOUROFFERS_FONT_SIZE,
    fontWeight: "800",
    fontStyle: "normal",
    color: "#3A4975",
  },
  sortByLowest: {
    display: "flex",
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#787792"
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
    width: 104,
    height: 32,
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 22,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 22,
    color: "#000000"
  },
  descriptionOfItemGoesRightOverHere: {
    width: 206,
    height: 52,
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 18,
    color: "#000000"
  },
  offers: {
    display: "flex",
    flexDirection: "column",
    width: '100%',
    height: SCREEN_HEIGHT - TABBAR_HEIGHT - WELCOME_HEIGHT - YOUROFFERS_FONT_SIZE - 78,
    boxSizing: 'border-box',
    // overflowY: "scroll",
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',  
  },
  listItems: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 12,
    columnGap: 12,
    boxSizing: 'border-box',
    borderWidth : 2,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 0, 0, 1)',
  },
  frame31: {
    flexDirection: 'row',
    width: 332,
    height: 131,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  frame29: {
    width: 202,
    height: 114,
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
    width: 100,
    height: 100,
    backgroundColor: 'rgba(237, 237, 237, 1)',
  },
  plus: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: 'rgba(104, 155, 97, 1)',
    backgroundColor: 'rgba(183, 230, 130, 1)',
  },
  component3: {
    width: 30,
    height: 613,
    flexShrink: 0,
  },
});

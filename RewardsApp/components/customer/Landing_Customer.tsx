import FONTS from '@/fonts';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import DropdownComponent from './DropdownComponent';
import ListItem from './ListItem';

interface Card{
  card_id: number,
  phone_number: string,
  name: string,
  description: string, 
  points: number,
}

interface Reward{
  reward_id: number,
  name: string,
  description: string, 
  image_url: string,
  points: number,
}

const SCREEN_HEIGHT = Dimensions.get('window').height
const TABBAR_HEIGHT = 60
const userId = 1;
const backendUrl = "http://10.0.0.91:8080/";

const getCards = async (setCards: Function) => {
    try {
  // Use this when testing on computer since CORS blocks fetch requests
  // setCards([{customer_id: 1,
  // phone_number: "temp",
  // title: "temp",
  // tagline: "temp", 
  // card_id: 1,
  // points: 1,}])
      const response = await fetch(backendUrl + "users/"+userId+"/cards", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      });
      console.log("response");
      const json = await response.json();
      const result = JSON.parse(json);
      setCards(result);
    } catch (error) {
      Alert.alert("Error fetching card data", "We're having some issues on our end. Please try again later.")
      console.error(error);
    } finally {
      console.log("finished");
    }
  }

  const getOffersFromCard = async (card_id: number, setCardOffers: Function) => {
    try {
      const response = await fetch(backendUrl + "cards/"+card_id+"/rewards", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      });
      console.log("response");
      const json = await response.json();
      const result = JSON.parse(json);
      setCardOffers(result);
    } catch (error) {
      Alert.alert("Error fetching card data", "We're having some issues on our end. Please try again later.")
      console.error(error);
    } finally {
      console.log("finished");
    }
  }

  const getOffers = async (card_ids: number[], setAllOffers: Function) => {
    const offers: Map<number, Reward[]> = new Map();
    for(let i = 0; i < card_ids.length; i++){
      let temp: Reward[] = [];
      getOffersFromCard(card_ids[i], (offers: Reward[])=>{temp = offers});
      offers.set(card_ids[i], temp);
    }
    setAllOffers(offers);
  }

export default function Landing() {
  const [cards, setCards] = useState<Card[]>([]);
  const [card_ids, setCardIDs] = useState<number[]>([]);
  const [pointlist, setPointList] = useState<number[]>([]);
  const [businessNames, setBusinessNames] = useState<string[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [sortType, setSortType] = useState("Lowest");

  const [businessID, setBusinessID] = useState(0);
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [points, setPoints] = useState(0);
  const [cartSize, setCartSize] = useState(0) ;

  const [allOffers, setAllOffers] = useState<Map<number, Reward[]>>(new Map());
  const [offers, setOffers] = useState<Reward[] | null>([]);

  let cart = [];
  let data = [];

  const processCards = () => {
    
    setPointList(cards.map((value)=>{return value.points}));
    setBusinessNames(cards.map((value)=>{return value.name}));
    setPhoneNumbers(cards.map((value)=>{return value.phone_number}));
    setDescriptions(cards.map((value)=>{return value.description}));
    setCardIDs(cards.map((value)=>{return value.card_id}));
    console.log("variables loaded");
    
    if (cards.length === 0){
      setBusinessID(0);
      setBusinessName("");
      setDescription("");
      setPhone("");
      setPoints(0);
      return;
    }

    setBusinessID(card_ids[0]);
    setBusinessName(businessNames[0]);
    setDescription(descriptions[0]);
    setPhone(phoneNumbers[0]);
    setPoints(pointlist[0]);
    
  }
  
  const processOffers = () => {
    if (allOffers.size === 0){
      setOffers([]);
      return;
    }

    // setOffers(allOffers.get(businessID));

  }
  const businessIDstoInfo = new Map();
  for (let i = 0; i < businessNames.length; i++) {
    let obj = { label: businessNames[i], value: card_ids[i] };
    data.push(obj);
    let obj1 = { businessName: businessNames[i],  points: pointlist[i], phone: phoneNumbers[i], tagline: descriptions[i]};
    businessIDstoInfo.set(card_ids[i], obj1);
  }

  const listItems = offers && offers.map((item) => <ListItem key={item.reward_id} title={item.name} description={item.description} price={item.points} itemId={item.reward_id} />);
  
  const changeBusiness = (id: number) =>{
    // console.log(id)
    setPoints(businessIDstoInfo.get(id).points);
    setPhone(businessIDstoInfo.get(id).phone);
    setBusinessName(businessIDstoInfo.get(id).businessName);
    setDescription(businessIDstoInfo.get(id).tagline);
  }

  useEffect(() => {console.log("used effect"); getCards(setCards); }, []);
  useEffect(() => {processCards(); getOffers}, [cards]);
  useEffect(() => {processOffers();}, [allOffers, businessID]);
  return (
    
    <View testID={"53:189"} style={styles.root}>
      <View style={styles.phone}>
        <View style={styles.body}>
          <View testID="9:230" style={styles.welcomeBox}>
            <Text testID="9:231" style={styles.welcomeJohn}>
              {`Welcome, John`}
            </Text>
          </View>
          <View testID="9:188" style={styles.frame14}>
            <View style={styles.dropdown}>
              <DropdownComponent data={data} value={businessID} setValue={setBusinessID} subFunction={changeBusiness}/>
            </View>
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
            <Pressable onPress={() => {
              if (sortType === "Lowest") {
                setSortType("Highest");
              } else {
                setSortType("Lowest");
              }
            }}>
              <Text testID="9:257" style={styles.sortByLowest}>
                {`Sort by: `}{sortType}
              </Text>
            </Pressable>
          </View>
          <View style={styles.offerBox}>
            <ScrollView testID="9:248" contentContainerStyle={styles.offerListBox}>
              {listItems}
            </ScrollView>
          </View>
        </View>
      </View>
          
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    height: SCREEN_HEIGHT - TABBAR_HEIGHT
  },
  phone: {
    // width: 393,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
  },
  body: {
    paddingTop: 60,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '89%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    borderColor: 'blue',
    borderWidth: 1,
    flex: 1,
  },
  businessName: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame14: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dropdown: {
    height: 50,
    width: 150,
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
  welcomeBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  offerBox: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 1)',
    borderStyle: 'solid',
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
  offerListBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 12,
    boxSizing: 'border-box',
    borderWidth: 1,
    borderColor: 'rgba(104, 255, 169, 1)',
    borderStyle: 'solid',
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
  dropdown2: {
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

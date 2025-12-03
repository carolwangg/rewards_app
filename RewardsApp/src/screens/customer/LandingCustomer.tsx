import FONTS from '@/constants/fonts';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Alert, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import DropdownComponent from '@/components/DropdownComponent';
import ListItem from './ListItem';
import { getCustomerCards, getCustomerCardRewards, getCustomer } from '@/services/apiCalls';
import { CustomerCard, CustomerReward } from '@/constants/interfaces';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';

function performGetCustomerName(userId: string, setCustomerName: any){
  try{
    getCustomer(userId).then(data => {
      console.log("data fetched:"+data.user);
      if (data.user) data.user.name? setCustomerName(data.user.name): setCustomerName("");
    });
  }catch (err){
    console.error("Error fetching business name:"+err);
  }
}


const getCards = async (userId: string, setCards: Function) => {
  try {
    const response = await getCustomerCards(userId);
    setCards(response.user);
  } catch (error) {
    Alert.alert("Error fetching card data", "We're having some issues on our end. Please try again later.")
    console.error(error);
  } finally {
    console.log("finished");
  }
}

const getRewardsFromCard = async (customerId: string, cardId: string, setCardRewards: Function) => {
  try {
    const response = await getCustomerCardRewards(customerId, cardId);
    setCardRewards(response.user);
  } catch (error) {
    Alert.alert("Error fetching card reward data", "We're having some issues on our end. Please try again later.")
    console.error(error);
  } finally {
    console.log("finished");
  }
}
const getAllRewards = async (customerId: string, cards: CustomerCard[], setAllRewards: Function) => {
  const allRewards: Map<string, CustomerReward[]> = new Map();
  for(let i = 0; i < cards.length; i++){
    let temp: CustomerReward[] = [];
    console.log(cards[i]);
    console.log(cards[i].id)
    await getRewardsFromCard(customerId, cards[i].id, (rewards: CustomerReward[])=>{temp = rewards});
    allRewards.set(cards[i].id, temp);
  }
  setAllRewards(allRewards);
}

type Props = {
  userId: string, 
  cart: string, 
  setCart: Function,
  setCartReward: Function,
  setCardPoints: Function
}

const processData = (cards: CustomerCard[], allRewards: Map<string, CustomerReward[]>, setIdToCard: Function, setData: Function, 
  setSelectedCard: Function, setSelectedRewards: Function, setCardId: Function) => {
  const data = [];
  const temp = new Map();
  for (let i = 0; i < cards.length; i++) {
    data.push({ label: cards[i].name, value: cards[i].id });
    temp.set(cards[i].id, cards[i]);
  }
  setData(data);
  setIdToCard(temp);
  
  if (cards.length !== 0){
    setSelectedCard(cards[0])
    setCardId(cards[0].id)
    setSelectedRewards(allRewards.get(cards[0].id));
  }else{
    setSelectedCard(null)
    setCardId(-1)
    setSelectedRewards([]);
  }
  console.log(cards);
  console.log(allRewards);
}

const rewardToElement = (cart: string, setCart: Function, setCartReward: Function, selectedRewards: CustomerReward[]) => {
  if (selectedRewards.length === 0){
    return <View style={{justifyContent: 'center', width: '80%', alignItems: 'center', height: 200}}><Text style={[styles.itemName, {textAlign: 'center'}]}> {`Get points by visiting businesses`} </Text></View>;
  }
  return selectedRewards.map((reward) => <ListItem cart={cart} setCart={setCart} setCartReward={setCartReward} key={reward.id} reward={reward} />);
}

const cardToElement = (selectedCard: CustomerCard | null) => {
  if (selectedCard == null){
    return <View style={{justifyContent: 'center', alignItems: 'center', width: '80%', height: 200}}><Text style={styles.itemName}>{`Add a card from the discover page to get started!`}</Text></View>;
  }
  return <View>
            <View testID="9:207" style={[styles.cardBox, {backgroundColor: selectedCard.colour}]}>
              <View testID="9:214" style={styles.frame29}>
                <Ionicons name={'ellipse'} size={70}/>
                <Text testID="9:210" style={styles.businessName2}>
                  {selectedCard.name}
                </Text>
              </View>
              <Text testID="9:212" style={styles.contactInfo}>
                {selectedCard.contactInfo}
              </Text>
              <Text testID="9:208" style={styles.tagline}>
                {selectedCard.description}
              </Text>
            </View>
            <View testID="9:216" style={styles.frame30}>
              <Text testID="9:218" style={styles.points}>
                {`Points:`}
              </Text>
              <View testID="9:222" style={styles.frame31}>
                <Text testID="9:220" style={styles.$124}>
                  {selectedCard.points}
                </Text>
              </View>
            </View>
          </View>;
  }
export default function Landing({userId, cart, setCart, setCartReward, setCardPoints}: Props) {
  const [sortType, setSortType] = useState("Lowest");
  const [cards, setCards] = useState<CustomerCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<CustomerCard | null>(null);
  const [selectedCardId, setSelectedCardId] = useState("user_0");
  const [idToCard, setIdToCard] = useState<Map<string, CustomerCard>>(new Map());
  const [idToRewards, setIdToRewards] = useState<Map<string, CustomerReward[]>>(new Map());
  const [selectedRewards, setSelectedRewards] = useState<CustomerReward[]>([]);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState("");
  console.log("userid:"+userId);
  const onRefresh = useCallback(() => {
    console.log("userid:"+userId);
    setRefreshing(true);
    getCards(userId, setCards);
    setCart("reward_0");
    setCartReward(null);
    setRefreshing(false);
  }, []);

  const changeBusiness = (cardId: string) =>{
    // console.log(id)
    const temp = idToCard.get(cardId);
    const temp2 = idToRewards.get(cardId);
    if (temp && temp2){
      setSelectedCard(temp);
      setSelectedRewards(temp2);
      setCardPoints(temp.points);
    }else{
      setSelectedCard(null);
      setSelectedRewards([]);
      setCardPoints(0);
    }
  }
  const onSortByPress = ()=>{
    if(sortType === "Lowest") {
        setSortType("Highest");
      } else {
        setSortType("Lowest");
      }
      let newArray = [...selectedRewards]
      newArray.reverse()
      setSelectedRewards(newArray);
  }
                  
  useEffect(() => {console.log("used effect"); getCards(userId, setCards);performGetCustomerName(userId, setName) }, []);
  useEffect(() => {getAllRewards(userId, cards, setIdToRewards);}, [cards]);
  useEffect(() => {processData(cards, idToRewards, setIdToCard, setData, setSelectedCard, setSelectedRewards, setSelectedCardId);}, [idToRewards]);
  return (
    <SafeAreaProvider>
    <SafeAreaView testID={"53:190"} style={styles.root} edges={["top"]}>
      <ScrollView testID={"53:189"} contentContainerStyle={styles.scroll} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          <View style={styles.body}>
            <View testID="9:230" style={styles.welcomeBox}>
              <Text testID="9:231" style={styles.headerText}>
                {`Welcome, `}{name}
              </Text>
            </View>
            <View testID="9:188" style={styles.frame14}>
              <View style={styles.dropdown}>
                <DropdownComponent data={data} value={selectedCardId} setValue={setSelectedCardId} subFunction={changeBusiness}/>
              </View>
            </View>
              {cardToElement(selectedCard)}     
            <Header headerTextStyle={styles.yourOffers} headerText={"Your Offers"} onPress={onSortByPress} sideText={`Sort by: `+sortType}/>
    
            <View testID="9:254" style={styles.frame34}>
            </View>
            <View style={styles.offerBox}>
              <View testID="9:248" style={styles.offerListBox}>
                {rewardToElement(cart, setCart, setCartReward, selectedRewards)}
              </View>
            </View>
          </View>         
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  scroll: {
    width: '100%',
    height: 'auto',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center"
  },
  phone: {
    // width: 393,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    paddingVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '89%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
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
    width: 220,
    alignSelf: 'stretch',
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
  cardBox: {
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
  contactInfo: {
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
  headerText: {
    color: 'rgba(58, 73, 117, 1)',
    fontFamily: FONTS.BALOO_BHAI_BOLD,
    fontSize: 30,
    fontStyle: 'normal',
  },
  welcomeBox: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  offerBox: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  yourOffers: {
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI_BOLD,
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
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    alignItems: 'center',
    rowGap: 12,
    boxSizing: 'border-box',
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
});

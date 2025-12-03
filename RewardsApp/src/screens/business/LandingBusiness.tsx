import FONTS from '@/constants/fonts';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState, useCallback } from 'react';
import { Alert, Dimensions, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import ListItem from "./ListItem";
import { getBusiness, getBusinessRewards } from '@/services/apiCalls';
import { Reward } from '@/constants/interfaces';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const TABBAR_HEIGHT = 60
const WELCOME_FONT_SIZE = 32
const WELCOME_HEIGHT = 38
const YOUROFFERS_FONT_SIZE = 24

const getRewards = async (userId: string, setRewards: Function) => {
  console.log("getting rewards...");
  try {
    const response = await getBusinessRewards(userId);
    setRewards(response.user);
  } catch (error) {
    Alert.alert("Error fetching reward data", "We're having some issues on our end. Please try again later.")
    console.error(error);
  } finally {
    console.log("finished");
  }
}

type Props = {
  userId: string,
  onPressFunction: ()=>void
}

function performGetBusinessName(userId: string, setBusinessName: any){
  try{
    getBusiness(userId).then(data => {
      console.log("data fetched:"+data.user);
      if (data.user) data.user.name? setBusinessName(data.user.name): setBusinessName("");
    });
  }catch (err){
    console.error("Error fetching business name:"+err);
  }
}
export default function Landing({userId, onPressFunction}: Props) {
  const [sortType, setSortType] = useState("Lowest");
  const [listItems, setListItems] = useState<React.JSX.Element[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getRewards(userId, setRewards);
    performGetBusinessName(userId, setBusinessName)
    setRefreshing(false);
  }, []);
  
  const[rewards, setRewards] = useState<Reward[]>([]);
  useEffect(() => {performGetBusinessName(userId, setBusinessName); getRewards(userId, setRewards)}, []);
  useEffect(()=>{updateListItems()}, [rewards]);
  const updateListItems = () => {
    console.log(rewards);
    const temp = rewards.map((reward) => <ListItem key={reward.id} itemId={reward.id} reward={reward}/>);
    setListItems(temp);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style = {styles.root}>
        <ScrollView contentContainerStyle = {styles.scroll} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        
        <View testID={"53:198"} style = {styles.body} >
          <View testID="9:552" style={styles.welcomeBox}>
            <Text testID="9:553" style={styles.welcome}>
              {`Welcome, `}{businessName}
            </Text>
          </View>
            <View testID="9:554" style={styles.frame34}>
            <Text testID="9:555" style={styles.yourOffers}>
              {`Your Rewards`}
            </Text>
            <Pressable onPress={() => {
                if (sortType === "Lowest") {
                  setSortType("Highest");
                } else {
                  setSortType("Lowest");
                }
                let newArray = [...listItems]
                newArray.reverse()
                setListItems(newArray);
                console.log(newArray);
              }}>
              <Text testID="9:556" style={styles.sortByLowest}>
                {`Sort by: `}{sortType}
              </Text>
            </Pressable>
          </View>
          <View testID="9:557" style={styles.listItems}>
            {listItems}
            <View testID="9:557" style={{height: 100, width: '100%'}}/>
          </View>
          </View>
        </ScrollView>
        <Pressable onPress={onPressFunction} testID="14:105" style={styles.plus}>
          <Ionicons name={true? 'add-outline': 'add-sharp'} color={'green'} size={60}/>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: '100%',
    width: SCREEN_WIDTH,
  },
   scroll: {
    display: 'flex',
    width: SCREEN_WIDTH,
    height: 'auto',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: "flex-start",
   },
  body: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
  },
  welcome: {
    color: 'rgba(58, 73, 117, 1)',
    fontFamily: FONTS.BALOO_BHAI_BOLD,
    fontSize: WELCOME_FONT_SIZE,
    fontStyle: 'normal',
  },
  welcomeBox: {
    width: 'auto',
    height: 'auto',
    marginVertical: 20,
    alignSelf: 'stretch',
    boxSizing: 'border-box',
  },
  yourOffers: {
    display: "flex",
    fontFamily: FONTS.BALOO_BHAI_BOLD,
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
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  },
  listItems: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 15,
    boxSizing: 'border-box',
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
});

import DropdownComponent from '@/components/DropdownComponent';
import ImageViewer from '@/components/ImageViewer';
import ListItem from '@/components/ListItem';
import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const businessImages = ["@/assets/images/card-0.png","@/assets/images/card-1.png","@/assets/images/card-2.png","@/assets/images/card-3.png","@/assets/images/card-4.png","@/assets/images/card-5.png"];
  const businessPoints = [0, 100, 250, 30, 7, 15];
  const businessNames = ["Business A", "Business B", "Business C", "Business D", "Business E", "Business F"];
  const businessIDs = [101, 102, 103, 104, 105, 106];
  const cards: Array<{name: string, id: number, url: string, points: number}> = [];

  for (let i = 0; i < businessImages.length; i++) {
    cards[i] = { name: businessNames[i], id: businessIDs[i], url: businessImages[i], points: businessPoints[i] };
  }
  const data = new Array();
  for (let i = 0; i < cards.length; i++) {
    data[i] = { label: cards[i]['name'], value: cards[i]['id'] };
  }
  const items = [{id: 1, title: 'chicken parm', desc: 'a delicious yummy chicken parm', price: 250, url: ""}, 
    {id: 2, title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: 500, url: ""},
  {id: 3, title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: 500, url: ""}];

  const [img, setImg] = useState(require(cards[0]['url']));
  const [cardID, setCardID] = useState(cards[0]['id']);
  const [points, setPoints] = useState(cards[0]['points']);
  
  const listItems = items.map((item) => <ListItem key={item['id']} title={item['title']} description={item['desc']} price={item['price']} itemId={item['id']} />);

  const changeCardDetails = (id: number) =>{
    console.log(id)
    let cardDetails = getCardDetails(id);
    if (cardDetails == null){
      throw new Error("Card details not found");
    }
    let [imgUrl, points] = cardDetails;
    setImg(require(imgUrl));
    setPoints(points);
  }

  const getCardDetails = (id: number): [string, number] | null =>{
    for(let i = 0; i < cards.length; i++){
      if(cards[i]['id'] == id){
        return [cards[i]['url'], cards[i]['points']];
      }
    }
    return null;
  }
  
  return (
    
    <View style={styles.body}>
      
      <View style={styles.header}>
        <View style={styles.headerbuttons}><Link href="/" style={styles.button}> Cards </Link></View>
        <View style={styles.headerbuttons}><Link href="/offers" style={styles.button}> All rewards </Link></View>
      </View>
      <View style={styles.card_container}>
        <View style={styles.dropdown}><DropdownComponent data= {data} value={cardID} setValue={setCardID} subFunction={changeCardDetails}/></View>
        <View style={styles.card}><ImageViewer imgSource={img}/></View>
        <View style={styles.points}><Text style={styles.text}>Points amount: {points} pts</Text></View>
      </View>
      
      <View style={styles.card_container}>
        <View><Text style={styles.title}>Your Rewards</Text></View>
        {listItems}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    overflow: 'scroll',
    width: '100%', // width: 400, 
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_container: {
    width: '80%',
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  title: {
    color: 'black',
    fontSize: 18,
    padding: 10,
  },
  button: {
    fontSize: 20,
    color: 'black',
  },
  header: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerbuttons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cards: {
    backgroundColor: 'blue',
    flex: 1,
  },
  points: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dropdown: {
    marginBottom: 10,
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'flex-start',
    left: 0,
    backgroundColor: 'purple',
  },
  card:{
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  items:{
    margin: 5,
    flexDirection: 'row',
    flex: 1,
    width: 300,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  photo:{
    flex: 1/3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  info:{
    flex: 2/3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  }

})
import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import { useState } from 'react';
import DropdownComponent from '@/components/DropdownComponent';
import ImageViewer from '@/components/ImageViewer';
import ListItem from '@/components/Item';
import { enableScreens } from "react-native-screens";


export default function Index() {
  const images = ["@/assets/images/card-0.png","@/assets/images/card-1.png","@/assets/images/card-2.png","@/assets/images/card-3.png","@/assets/images/card-4.png","@/assets/images/card-5.png"];
  const pointlist = [0, 100, 250, 30, 7, 15];
  const [imgNum, setImgNum] = useState(0);
  const [points, setPoints] = useState(pointlist[0]);
  const [img, setImg] = useState(require("@/assets/images/card-0.png"));
  const items = [{id: '1', title: 'chicken parm', desc: 'a delicious yummy chicken parm', price: '250'}, 
    {id: '2', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'},
  {id: '3', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'}];
  const changeImg = (imgNum: number) =>{
    console.log(imgNum)
    if (imgNum === 1){
      setImg(require("@/assets/images/card-1.png"));
      setPoints(pointlist[1])
    }else if (imgNum === 2){
      setImg(require("@/assets/images/card-2.png"))
      setPoints(pointlist[2])
    }else if (imgNum === 3){
      setImg(require("@/assets/images/card-3.png"))
      setPoints(pointlist[3])
    }else if (imgNum === 4){
      setImg(require("@/assets/images/card-4.png"))
      setPoints(pointlist[4])
    }else if (imgNum === 5){
      setImg(require("@/assets/images/card-5.png"))
      setPoints(pointlist[5])
    }
  }
  const listItems = items.map((item) => <ListItem key={item['id']} title={item['title']} description={item['desc']} price={item['price']} itemId={item['id']} />);
  
  return (
    
    <View style={styles.body}>
      
      <View style={styles.header}>
        <View style={styles.headerbuttons}><Link href="/" style={styles.button}> Cards </Link></View>
        <View style={styles.headerbuttons}><Link href="/offers" style={styles.button}> All rewards </Link></View>
      </View>
      <View style={styles.card_container}>
        <View style={styles.dropdown}><DropdownComponent value={imgNum} setValue={setImgNum} subFunction={changeImg} /></View>
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
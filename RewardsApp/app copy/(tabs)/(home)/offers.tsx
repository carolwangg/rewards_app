import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import {useState} from 'react';
import ListItem from '@/components/ListItem';

export default function Offers() {
  const images = ["@/assets/images/card-0.png","@/assets/images/card-1.png","@/assets/images/card-2.png","@/assets/images/card-3.png","@/assets/images/card-4.png","@/assets/images/card-5.png"];
  const [imgNum, setImgNum] = useState(0);
  const items = [{id: '1', title: 'chicken parm', desc: 'a delicious yummy chicken parm', price: '250'}, 
  {id: '2', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'},
  {id: '3', title: 'chicken parm', desc: 'a delicious yummy chicken parm', price: '250'}, 
  {id: '4', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'},
  {id: '5', title: 'chicken parm', desc: 'a delicious yummy chicken parm', price: '250'}, 
  {id: '6', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'},
  {id: '7', title: 'chicken parm', desc: 'a delicious yummy chicken parm', price: '250'}, 
  {id: '8', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'}];
  const listItems = items.map((item) => <ListItem key={item['id']} title={item['title']} description={item['desc']} price={item['price']} itemId={item['id']} />);
  
  return (
    
    <View style={styles.body}>
      <View style={styles.header}>
        <View style={styles.headerbuttons}><Link href="/" style={styles.button}> Cards </Link></View>
        <View style={styles.headerbuttons}><Link href="/offers" style={styles.button}> All rewards </Link></View>
      </View>
      <View style={styles.card_container}>
        {listItems}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
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
    flex: 1/5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dropdown: {
    marginBottom: 10,
    marginTop: 10,
    height: 100,
    flex: 1/5,
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
    overflowY: 'scroll',
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
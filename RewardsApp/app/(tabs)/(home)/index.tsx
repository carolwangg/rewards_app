import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import {useState} from 'react';
import DropdownComponent from '@/components/DropdownComponent';
import ImageViewer from '@/components/ImageViewer';

export default function Index() {
  const images = ["@/assets/images/card-0.png","@/assets/images/card-1.png","@/assets/images/card-2.png","@/assets/images/card-3.png","@/assets/images/card-4.png","@/assets/images/card-5.png"];
  const [img, setImg] = useState(0);
  const url = images[img]
  
  const photo = require(url);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerbuttons}><Link href="/item" style={styles.button}> Cards </Link></View>
        <View style={styles.headerbuttons}><Link href="/item" style={styles.button}> All rewards </Link></View>
      </View>
      <View style={styles.container}>
        <View style={styles.dropdown}><DropdownComponent value={img} setValue={setImg} /></View>
        <View style={styles.card}><ImageViewer imgSource={photo}/></View>
        <View style={styles.points}><Text style={styles.text}>Points amount: 126 pts</Text></View>
      </View>
    
      <View style={styles.container}>
        <View style={styles.points}><Text style={styles.text}>Your Rewards</Text></View>
        
        <Link href="/item" style={styles.button}> 
          <View style={styles.items}>
            <View style={styles.photo}>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>Chicken parm</Text>
              <Text style={styles.text}>Points needed: 250 pts</Text>
            </View>
          </View>
        </Link>

        <Link href="/item" style={styles.button}> 
          <View style={styles.items}>
            <View style={styles.photo}>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>Alfredo pasta</Text>
              <Text style={styles.text}>Points needed: 500 pts</Text>
            </View>
          </View>
        </Link>

        <Link href="/item" style={styles.button}> 
          <View style={styles.items}>
            <View style={styles.photo}>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>Foot massage</Text>
              <Text style={styles.text}>Points needed: 1234 pts</Text>
            </View>
          </View>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
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
    flex: 1/5,
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
    margin: 10,
    width: '10%',
    height: 100,
    flex: 1/5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  card:{
    flex: 1,
    height: '100%',
    width: 300,
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
import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';

type Props = {
  title: string;
  description: string;
  price: string;
  itemId: string;
};


export default function ListItem({title, description, price, itemId}: Props) {
    return <Link href="/item" style={[styles.button, styles.items]}> 
            <View style={styles.photo}>
              <Text>hello</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.text}>{description}</Text>
              <Text style={styles.text}>Points needed: {price} pts</Text>
            </View>
            <View style={styles.icon}>
              <Text>+</Text>
            </View>
        </Link>
  }

const styles = StyleSheet.create({
  items:{
    overflow: 'scroll',
    margin: 5,
    flexDirection: 'row',
    width: '90%',
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 25,
  },
  photo:{
    flex: 1/4,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  info:{
    height: '100%',
    flex: 1/2,
    flexDirection: 'column',
    backgroundColor: 'purple',
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
  icon: {
    borderRadius: '100%',
    fontSize: 60,
    borderWidth: 4,
    flex: 1/4,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  } 
  });
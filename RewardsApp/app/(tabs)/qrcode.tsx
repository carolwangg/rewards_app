import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';

type Props = {
  title: string,
  price: string, 
  itemId: string
}
export default function AboutItem({title, price, itemId}: Props) {
  const rewards_text = "redeem rewards" //win points
  let longDescription = `Have the employee scan your QR code to ${rewards_text}!`;
  const items = [{id: '1', title: 'chicken parm', desc: 'a delicious yummy chicken parm', price: '250'}, 
  {id: '2', title: 'Alfredo pasta', desc: 'a delicious yummy pasta', price: '500'}];
  const offers = items.map((item) => <Text key={item['id']}>{item['title']}</Text>);
  return (
    <View style={styles.container}>
      <View style={styles.itemDescription}>
        <Text style={styles.text}>{longDescription}</Text>
      </View>
      <View style={styles.cartContainer}>
        <View style={styles.cartText}>
          <Text style={styles.text}>Cart</Text>
        </View>
        <View style={styles.cart}>
          <Text style={styles.text}>{offers}</Text>
        </View>
      </View>
      <View style={styles.itemQR}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
  },
  text: {
    color: 'black',
  },
  button: {
    fontSize: 20,
    color: 'black',
  },
  itemHeader: {
    flex: 1/4,
    flexDirection: 'row',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  itemPoints: {
    flex: 1/4,
    right: 0,
    top: 0,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDescription: {
    flex: 1/4,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemQR: {
    flex: 1/2,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartContainer: {
    flexDirection: 'row',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartText: {
    backgroundColor: 'yellow',
    flex: 1/3,
  },
  cart: {
    flexDirection: 'column',
    backgroundColor: 'orange',
    flex: 2/3,
  }
})
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string,
  price: string, 
  itemId: string
}
export default function AboutItem({title, price, itemId}: Props) {
  let longDescription = 'Have the employee scan the QR code below to redeem your reward!';
  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.title, styles.itemPoints]}> {price} pts</Text>
      </View>
      <View style={styles.itemDescription}>
        <Text style={styles.text}>{longDescription}</Text>
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
  }
})
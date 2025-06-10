import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';

export default function AboutItem() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Item info below</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  button: {
    fontSize: 20,
    color: 'white',
  },
})
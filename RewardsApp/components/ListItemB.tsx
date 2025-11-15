import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import FONTS from '../fonts';

type Props = {
  title: string;
  description: string;
  price: string;
  itemId: string;
};

export default function ListItem({title, description, price, itemId}: Props) {
    return <Link href="/item"> 
            <View style={styles.frame31}>
              <View style={styles.frame29}>
                <Text style={styles.itemName}>
                  {title}
                </Text>
                <Text style={styles.descriptionOfItemGoesRightOverHere}>
                  {description}
                </Text>
              </View>
              <View style={styles.rectangle28}/>
            </View>
        </Link>
  }

const styles = StyleSheet.create({
  itemName: {
    height: 32,
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 22,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 22,
    color: "#000000"
  },
  descriptionOfItemGoesRightOverHere: {
    width: 160,
    height: 52,
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 18,
    color: "#000000"
  },
  frame31: {
    flexDirection: 'row',
    width: 300,
    height: 131,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  frame29: {
    width: '70%',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    rowGap: 10,
  },
  rectangle28: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(237, 237, 237, 1)',
  },
  
  });
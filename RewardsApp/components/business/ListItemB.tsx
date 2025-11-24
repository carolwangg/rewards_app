import FONTS from '@/fonts';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ListInterior } from '../customer/ListItem';
type Props = {
  title: string;
  description: string;
  price: number;
  itemId: string;
};

export default function ListItem({title, description, price, itemId}: Props) {
    return <View style={styles.item}><Link href={{pathname: '/edit/[editItem]',
          params: { editItem: itemId, name: title, description: description, points: price }}}> 
          <ListInterior title={title} description={description} price={price}></ListInterior>
            {/* <View style={styles.frame31}>
              <View style={styles.frame29}>
                <Text style={styles.itemName}>
                  {title}
                </Text>
                <Text style={styles.descriptionOfItemGoesRightOverHere}>
                  {description}
                </Text>
              </View>
              <View style={styles.rectangle28}/>
            </View> */}
        </Link>
        </View>
  }

const styles = StyleSheet.create({
  item:{
    display: "flex",
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 150,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgb(255, 255, 255)',
    columnGap: 10,
  },
  itemName: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 22,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000"
  },
  descriptionOfItemGoesRightOverHere: {
    width: 160,
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000"
  },
  frame31: {
    flexDirection: 'row',
    width: 300,
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
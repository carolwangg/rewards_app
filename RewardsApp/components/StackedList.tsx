import FONTS from "@/fonts";
import { StyleSheet, Text, View } from "react-native";
type PropsList = {
  items: Array<any>;
}
export default function StackedList({items}: PropsList) {
  let itemsShown;
  if(items.length > 3){
    itemsShown = items.slice(0, 3);
  }else{
    itemsShown = items;
  }
  const listItems = itemsShown.map((item, index) => <ListItem name={item['name']} offset={10*index}/>);
    return <View style = {styles.listBody}>
        {listItems}
    </View>
}
type Props = {
  name: string
  offset: number
}
function ListItem({name, offset}: Props) {
  return <View testID="9:384" style={[styles.itemBody, {["top" as string]: offset}]} >
            <View testID="9:385" style={styles.textBody}>
                <Text testID="9:386" style={styles.itemName}>
                {name}
                </Text>
            </View>
            <View testID="9:409" style={styles.picture}/>
        </View>
}

const styles = StyleSheet.create({
  listBody: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(91, 91, 91, 0.5s)",
    position: "relative",
  },
  textBody: {
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  picture: {
    width: 70,
    height: 70,
    flexShrink: 0,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  itemBody: {
    flexDirection: 'row',
    width: 345,
    height: 72,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    position: 'absolute',
  },
  itemName: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});

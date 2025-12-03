import FONTS from "@/constants/fonts";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
const GRAY = 'rgba(146, 144, 180, 1)'
type PropsStackedList = {
  items: Array<any>;
}

function StackedList({items}: PropsStackedList) {
  let itemsShown;
  if(items.length > 3){
    itemsShown = items.slice(0, 3);
  }else{
    itemsShown = items;
  }
  // const listItems = itemsShown.map((item, index) => <ListItem name={item['name']} offset={10*index}/>);
  //   return <View style = {styles.listBody}>
  //       {listItems}
  //   </View>
}

type PropsListItem = {
  id: string
  name: string
  offset: number
}
export default function ListItem({id, name, offset}: PropsListItem) {
  return <Pressable style= {styles.root} onPress={() => 
    {router.push({ pathname: "/",  params: { item: id, itemName: name}})}}>
            <View testID="9:384" style={[styles.itemBody, {["top" as string]: offset}]}  >
              <View testID="9:409" style={styles.picture}/>
              <View testID="9:385" style={styles.textBody}>
                <Text testID="9:386" style={styles.itemName}>
                {name}
                </Text>
              </View>
            </View>
          </Pressable>
  
  
  
  
}

const styles = StyleSheet.create({
  root: {
    width: "100%", borderStyle: "solid"
  },
  listBody: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(91, 91, 91, 0.5s)",
    position: "relative",
  },
  textBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picture: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  itemBody: {
    width: "100%",
    display: "flex",
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  itemName: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});

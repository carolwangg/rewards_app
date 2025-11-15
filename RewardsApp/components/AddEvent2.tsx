import {View, Text, StyleSheet} from 'react-native';

import Ionicons from "@expo/vector-icons/Ionicons";

export default function LandingAddEvent() {
  return (
    <View testID={"53:204"} style={styles.root}>
      <View testID="15:1539" style={styles.frame34}>
        <Ionicons name={'chevron-back-outline'} color={'black'} size={24}/>
        <Text testID="15:1540" style={styles.addEvent}>
          {`Add Event`}
        </Text>
      </View>
      <View testID="15:1622" style={styles.frame38}>
        <View testID="15:1618" style={styles.frame7}>
          <View testID="104:951" style={styles.frame58}>
            <Ionicons name={'image-outline'} color={'gray'} size={130}/>
          </View>
          <View testID="104:952" style={styles.frame59}>
            <Text testID="104:943" style={styles.addPhoto}>
              {`Add photo`}
            </Text>
            <Text testID="104:945" style={styles.mustBeJpegJpgOrPng}>
              {`*Must be .jpeg, .jpg or .png`}
            </Text>
          </View>
        </View>
        <View testID="15:1627" style={styles.frame37}>
          <View testID="15:1649" style={styles.frame31}>
            <Text testID="15:1650" style={styles.addDescription}>
              {`Add description...`}
            </Text>
            <Text testID="15:1652" style={styles.$4450}>
              {`44/50`}
            </Text>
          </View>
        </View>
        <View testID="15:1631" style={styles.frame36}>
          <View testID="15:1640" style={styles.frame312}>
            <Text testID="15:1641" style={styles.addPointCount}>
              {`Add point count`}
            </Text>
          </View>
          <Text testID="15:1638" style={styles.pts}>
            {`pts`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 393,
    height: 852,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  addEvent: {
    gridRowStart: '1',
    gridRowEnd: 'span 1',
    gridColumnStart: '2',
    gridColumnEnd: 'span 1',
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: 'Baloo Bhai',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame34: {
    width: 364,
    height: 38,
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingRight: 10,
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    gridTemplateRows: 'repeat(1, minmax(0px, 1fr))',
    gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  frame28: {
    flexDirection: 'row',
    width: 393,
    height: 60,
    paddingTop: 0,
    paddingLeft: 6,
    paddingBottom: 0,
    paddingRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 75,
    columnGap: 75,
    flexShrink: 0,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  frame26: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  frame27: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  frame262: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  frame38: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  frame7: {
    width: 308,
    height: 43,
    paddingTop: 10,
    paddingLeft: 99,
    paddingBottom: 10,
    paddingRight: 99,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  frame58: {
    paddingTop: 0,
    paddingLeft: 9,
    paddingBottom: 0,
    paddingRight: 9,
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
  },
  addPhoto: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Gowun Dodum',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  mustBeJpegJpgOrPng: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Gowun Dodum',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame59: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  addDescription: {
    gridRowStart: '1',
    gridRowEnd: 'span 1',
    gridColumnStart: '1',
    gridColumnEnd: 'span 1',
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Gowun Dodum',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  $4450: {
    gridRowStart: '4',
    gridRowEnd: 'span 1',
    gridColumnStart: '4',
    gridColumnEnd: 'span 1',
    color: 'rgba(120, 119, 146, 1)',
    fontFamily: 'Gowun Dodum',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame37: {
    width: 320,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
  },
  frame31: {
    height: 128,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    rowGap: 10,
    columnGap: 10,
    alignSelf: 'stretch',
    gridTemplateRows: 'repeat(4, minmax(0px, 1fr))',
    gridTemplateColumns: 'repeat(4, minmax(0px, 1fr))',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  addPointCount: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Gowun Dodum',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame36: {
    flexDirection: 'row',
    width: 320,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
  },
  frame312: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingRight: 10,
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  pts: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Gowun Dodum',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});

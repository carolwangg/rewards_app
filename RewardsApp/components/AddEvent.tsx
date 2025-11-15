import FONTS from '@/fonts';
import { Link } from 'expo-router';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const SCREEN_HEIGHT = Dimensions.get('window').height
const TABBAR_HEIGHT = 60
const wordCount = 40
const pointCount = 100
export default function AddEvent() {

  return (
    <View testID={"53:204"} style={styles.root}>
      
      <View style={styles.phone}>
        <View testID="15:1539" style={styles.frame34}>
            <Link href="/about" style={styles.plus}>
              <Ionicons name={'chevron-back-outline'} color={'black'} size={30}/>
            </Link>
            
            <Text testID="15:1540" style={styles.addEvent}>
              {`Add Event`}
            </Text>
        </View>
        <View style={styles.body}>
          <View testID="15:1622" style={styles.frame38}>
            <View testID="15:1618" style={styles.frame7}>
              <Text testID="15:1620" style={styles.addPhoto}>
                {`Add photo`}
              </Text>
              <Text testID="104:945" style={styles.photoSpecification}>
                {`*Must be .jpeg, .jpg or .png`}
              </Text>
            </View>
            <View testID="15:1623" style={styles.frame35}>
              <View testID="15:1625" style={styles.frame31}>
                <Text testID="15:1626" style={styles.nameHere}>
                  {`Add name`}
                </Text>
              </View>
            </View>
            <View testID="15:1627" style={styles.frame37}>
              <View testID="15:1649" style={styles.frame312}>
                <Text testID="15:1650" style={styles.inputDescription}>
                  {`Add description here...`}
                </Text>
                <Text testID="15:1652" style={styles.wordCount}>
                  {wordCount}/50
                </Text>
              </View>
            </View>
            <View testID="15:1631" style={styles.frame36}>
              <View testID="15:1640" style={styles.frame313}>
                <Text testID="15:1641" style={styles.ptsCountHere}>
                  {`Add points needed`}
                </Text>
              </View>
              <Text testID="15:1638" style={styles.pts}>
                {`pts`}
              </Text>
            </View>
            <View style={styles.saveContainer}>
              <View testID="104:910" style={styles.frame314}>
                <Text testID="104:911" style={styles.addToCart}>
                {`Save`}
                </Text>
              </View>
            </View>
          </View>
          
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    height: SCREEN_HEIGHT - TABBAR_HEIGHT
  },
  phone: {
    width: 393,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
  },
  body: {
    paddingTop: 70,
    width: '89%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    borderColor: 'red',
    borderWidth: 1,
  },
  addEvent: {
    gridRowStart: '1',
    gridRowEnd: 'span 1',
    gridColumnStart: '2',
    gridColumnEnd: 'span 1',
    color: 'rgba(58, 73, 117, 1)',
    textAlign: 'center',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '800',
  },
  frame34: {
    display: 'flex', 
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    top: 0,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    marginBottom: 10,
  },
  plus:{
    position: 'absolute',
    left: 0,
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
    padding: 10,
    alignItems: 'center',
  },
  addPhoto: {
    width: '100%',
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'center',
  },
  frame7: {
    width: 308,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(217, 217, 217, 1)',
    borderWidth: 3,
    borderColor: '#787792',
    borderStyle: 'dashed',
  },
  frame4: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    alignSelf: 'stretch',
  },
  name: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  nameHere: {
    color: '#787792',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
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
    borderWidth: 2,
    borderColor: 'black'
  },
  frame35: {
    flexDirection: 'row',
    width: 320,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderWidth: 2,
    borderColor: 'black'
  },
  frame31: {
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
    borderWidth: 2,
    borderColor: 'black'
  },
  description: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  inputDescription: {
    width: '100%',
    height: '100%',
    color: '#787792',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  wordCount: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    color: 'rgba(120, 119, 146, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
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
    borderWidth: 2,
    borderColor: 'black'
  },
  frame312: {
    position: 'relative',
    display: 'flex',
    height: 128,
    padding: 10,
    alignSelf: 'stretch',
    gridTemplateRows: 'repeat(4, minmax(0px, 1fr))',
    gridTemplateColumns: 'repeat(4, minmax(0px, 1fr))',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 1)',
  },
  ptsCountHere: {
    color: '#787792',
    fontFamily: FONTS.GOWUN_DODUM,
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
  frame313: {
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
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  photoSpecification: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  addToCart: {
    color: 'rgba(28, 39, 76, 1)',
    fontFamily: FONTS.BALOO_BHAI,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  frame314: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(28, 39, 76, 1)',
  },
  saveContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
});

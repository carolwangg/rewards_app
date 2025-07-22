import { View, ImageSourcePropType, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

type Props = {
  imgSource: ImageSourcePropType;
};

export default function ImageViewer({ imgSource }: Props) {
  return (<View style={styles.imgcontainer}>
    <Image source={imgSource} style={styles.image} />
    </View>);
}

const styles = StyleSheet.create({
  imgcontainer:{
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: 'green',
    objectFit: 'contain',
  },
  image: {
    flex: 2,
    alignSelf: 'flex-start',
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: 'blue',
    resizeMode: 'contain',
  },
});
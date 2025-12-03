import { CustomerReward } from '@/constants/interfaces';
import RewardList from './RewardList';
import { StyleProp, ViewStyle, StyleSheet, Dimensions, ScrollView } from "react-native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('window').width;
type Props = {
    style?: StyleProp<ViewStyle>
    rewards: CustomerReward[]
}

export default function RewardPage({style, rewards}: Props){
    return <SafeAreaProvider>
        <SafeAreaView style={[styles.root, style]}>
            <ScrollView style={styles.scroll}>
                <RewardList rewards = {rewards}/>
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
}

const styles = StyleSheet.create({
  root: {
    width: SCREEN_WIDTH,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  scroll:{
    width: '100%', height: 'auto', minHeight: '100%'
  },
})
import { CustomerReward } from '@/constants/interfaces';
import RewardBox from './RewardBox';
import VerticalList from './VerticalList';
import { StyleProp, ViewStyle, StyleSheet } from "react-native"

const generateListContents = (rewards: CustomerReward[]) => {
    return rewards.map((reward) => <RewardBox key={reward.id} reward={reward}/>);
}

type Props = {
    style?: StyleProp<ViewStyle>
    rewards: CustomerReward[]
}

export default function RewardList({style, rewards}: Props){
    return <VerticalList style = {[style, styles.root]}>
        {generateListContents(rewards)}
    </VerticalList>
}

const styles = StyleSheet.create({
    root: {
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})
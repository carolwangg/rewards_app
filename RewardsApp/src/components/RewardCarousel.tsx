import { CustomerReward } from '@/constants/interfaces';
import HorizontalList from './HorizontalList';
import RewardBox from './RewardBox';
import { StyleProp, ViewStyle } from "react-native"

const generateListContents = (rewards: CustomerReward[], loading: boolean|undefined) => {
    return rewards.map((reward) => <RewardBox loading={loading} key={reward.id} reward={reward}/>);
}

type Props = {
    loading?: boolean,
    style?: StyleProp<ViewStyle>
    rewards: CustomerReward[]
}

export default function RewardCarousel({loading, style, rewards}: Props){
    return <HorizontalList style={[style]}>
        {generateListContents(rewards, loading)}
    </HorizontalList>
}
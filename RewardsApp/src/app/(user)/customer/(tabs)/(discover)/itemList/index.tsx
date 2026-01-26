import RewardPage from "@/components/RewardsPage";
import { defaultCustomerReward } from "@/constants/interfaces";
import { useLocalSearchParams } from "expo-router";
export default function ItemList() {
    const { rewards } = useLocalSearchParams();
    const rewardsParsed = JSON.parse(rewards?.toString());
    console.log("rewards:"+rewards)
    // const rewards = [defaultCustomerReward];
    return <RewardPage rewards={rewardsParsed}/>;
}
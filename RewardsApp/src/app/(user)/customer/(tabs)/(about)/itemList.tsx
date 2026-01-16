import RewardPage from "@/components/RewardsPage";
import { defaultCustomerReward } from "@/constants/interfaces";
import { useLocalSearchParams } from "expo-router";
export default function ItemList() {
    const { rewards } = useLocalSearchParams();
    const rewardsParsed = JSON.parse(rewards?.toString());
    // const rewards = [defaultCustomerReward];
    return <RewardPage rewards={rewardsParsed}/>;
}
import RewardPage from "@/components/RewardsPage";
export default function ItemList() {
    const rewards = [{id: 12346, name: "Temp", description: "Temp", image_url: "Temp", points: 10, business_id: "Temp", distance: 1.2}]
    return <RewardPage rewards={rewards}/>;
}
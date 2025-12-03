import FONTS from "@/constants/fonts"
import { Business, CustomerReward } from "@/constants/interfaces"
import { View, StyleSheet, Text, ScrollView } from "react-native"
import ListItemMinimal from "@/screens/customer/ListItemMinimal"
import COLOURS from "@/constants/colours"
import Star from "@/assets/images/star.svg"
type Props = {
    business: Business,
    businessRewards: CustomerReward[]    
}

const rewardsToElement = (rewards: CustomerReward[]) => {
  return rewards.map((reward) => <ListItemMinimal key={reward.id} reward={reward}/>);
}


export default function BusinessPopUp({business, businessRewards}: Props){
    return <View style={styles.root}>
        <ScrollView style={styles.scroll}>
            <View style={styles.body}>
                <View style={styles.info}>
                    <View style={styles.logo}/>
                    <View style={styles.description}>
                        <Text style={styles.title}>{business.name}</Text>
                        <View style={styles.details}>
                            <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">{business.location}</Text>
                            <View style={styles.ratingBox}>
                                <Star/>
                                <Text style={styles.rating}>{business.rating}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.rewardList}>
                    {rewardsToElement(businessRewards)}
                </View>
            </View>
                
        </ScrollView>        
    </View>
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowOpacity: 1,
        shadowColor: 'rgba(0, 0, 0, 0.250980406999588)',
        shadowRadius: 4,
        shadowOffset: {"width":3,"height":1},
        backgroundColor: COLOURS.WHITE,
        width: '100%',
        height: '100%',
        padding: 10,
    },
    scroll:{
        width: '100%',
        
        borderWidth: 1,
        borderColor: 'blue'
    },
    description:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    details:{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    body:{
        flex: 1,
        flexDirection: 'column',
        rowGap: 10,
    },
    rating:{
        color: COLOURS.WHITE,
    },
    ratingBox: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 25,
        backgroundColor: COLOURS.GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 3,
    },
    logo:{borderRadius: '100%', width: 60, height: 60, backgroundColor: COLOURS.GRAY},
    title: {
        fontFamily: FONTS.BALOO_BHAI_BOLD,
        fontSize: 20,
    },
    location: {
        fontFamily: FONTS.GOWUN_DODUM,
        fontSize: 16,
    },
    info: {
        columnGap: 10,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    rewardList: {
        flexDirection: 'column',
        rowGap: 10
    }
})
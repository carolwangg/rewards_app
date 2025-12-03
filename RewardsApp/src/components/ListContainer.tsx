import { ReactNode } from "react"
import { StyleSheet, StyleProp, ViewStyle } from "react-native"
import { ScrollView } from "react-native"
type Props = {
    horizontal?: boolean
    style?: StyleProp<ViewStyle>
    children: ReactNode
}
export default function ListContainer({horizontal, style, children}: Props){
    return <ScrollView showsVerticalScrollIndicator={false}  horizontal={horizontal} contentContainerStyle={[styles.container, style]}>{children}</ScrollView>
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
}
);
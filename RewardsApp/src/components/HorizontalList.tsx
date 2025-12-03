import ListContainer from './ListContainer';
import { ReactNode } from "react"
import { StyleProp, ViewStyle } from "react-native"
type Props = {
    style?: StyleProp<ViewStyle>
    children: ReactNode
}

export default function HorizontalList({style, children}: Props){
    return <ListContainer horizontal={true} style={[{flexDirection: 'row', padding: 10, 
    justifyContent: 'flex-start', alignItems: 'center', columnGap: 10, width: 'auto'}, style]}>
        {children}
    </ListContainer>
}
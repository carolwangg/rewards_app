import ListContainer from './ListContainer';
import { ReactNode } from "react"
import { StyleProp, ViewStyle } from "react-native"
type Props = {
    style?: StyleProp<ViewStyle>
    children: ReactNode
}

export default function VerticalList({style, children}: Props){
    return <ListContainer horizontal={false} style={[{flexDirection: 'column', padding: 10, 
    justifyContent: 'flex-start', alignItems: 'center', rowGap: 10, height: '100%', borderColor: 'red', borderWidth: 2}, style]}>
        {children}
    </ListContainer>
}
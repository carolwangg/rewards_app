import { useState, useRef, useEffect } from "react";
import { Animated, Pressable, ViewStyle, StyleProp, TextStyle } from "react-native"
type Props = {
    texts: string[];
    textColours: string[];
    bgColours: string[];
    onPressAction: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export default function AnimatedButton({texts, textColours, bgColours, containerStyle, textStyle, onPressAction}: Props){
    const currentValue = useRef(new Animated.Value(0)).current;
    const [text, setText] = useState(texts[0]);
    const [selected, setSelected] = useState(false);

    const bgColour = currentValue.interpolate({
        inputRange: [0, 1],
        outputRange: [bgColours[0], bgColours[1]]
    })
    const textColour = currentValue.interpolate({
        inputRange: [0, 1],
        outputRange: [textColours[0], textColours[1]]
    })
    
    useEffect(()=> {console.log("use effect button");
          console.log("texts:"+texts);
          console.log("bgColours:"+bgColours);
          console.log("textColours:"+textColours);
        }, [])
    

    const onPressFunction = () => {
        onPressAction();
        if (!selected){
            Animated.timing(currentValue, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }).start();
            setText(texts[1]);
        }else{
            Animated.timing(currentValue, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
            setText(texts[0]);
        }
        setSelected(!selected);
    }
    console.log("selected:"+selected);
    console.log("text:"+text);
    console.log("bgColour:"+bgColour);
    console.log("textColour:"+textColour);
    return <Pressable onPress={onPressFunction}>
                <Animated.View testID="104:910" style={[containerStyle, {backgroundColor: bgColour}]}>
                    <Animated.Text testID="104:911" style={[textStyle, {color: textColour}]}>
                        {text}
                    </Animated.Text>
                </Animated.View>
            </Pressable>
}


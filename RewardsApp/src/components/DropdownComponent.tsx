import COLOURS from '@/constants/colours';
import FONTS from '@/constants/fonts';
import React from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';  

type Props = {
  data: any
  value: any
  setValue: Function
  subFunction?: Function
  placeholder: string
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  placeholderTextStyle?: StyleProp<TextStyle>
  textStyle?: StyleProp<TextStyle>
  maxHeight: number
  searchPlaceholder: string
}
const DropdownComponent = ({data, value, setValue, subFunction, placeholder, style, containerStyle, placeholderTextStyle, textStyle, maxHeight, searchPlaceholder}: Props) => {
  console.log("setValue:"+setValue)
  return (
    <Dropdown
      style={[styles.dropdown, style]}
      containerStyle={[styles.containerStyle, containerStyle]}
      placeholderStyle={[styles.bodyText, styles.placeholderTextStyle, placeholderTextStyle]}
      selectedTextStyle={[styles.bodyText, styles.selectedTextStyle, textStyle]}
      inputSearchStyle={[styles.bodyText, styles.inputSearchStyle, textStyle]}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={maxHeight}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      searchPlaceholderTextColor={COLOURS.GRAY}
      value={value}
      onChange={item => {
        setValue(item.value);
        if (subFunction) {subFunction(item.value);}
      }}       
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: 'auto', 
    display: 'flex',
    alignSelf: 'stretch',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 30,
  },
  containerStyle: {
    width: 200,
    height: 'auto',
  },
  icon: {
    marginRight: 5,
  },
  placeholderTextStyle: {
    color: 'rgba(146, 144, 180, 1)',
  },
  selectedTextStyle: {
    color: 'black',
  },
  bodyText: {
    fontFamily: FONTS.GOWUN_DODUM,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: COLOURS.BLACK
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default DropdownComponent;
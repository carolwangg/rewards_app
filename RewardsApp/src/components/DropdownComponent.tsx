import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
  const images = ["@/assets/images/temp/card-0.png","@/assets/images/temp/card-1.png","@/assets/images/temp/card-2.png","@/assets/images/temp/card-3.png","@/assets/images/temp/card-4.png","@/assets/images/temp/card-5.png"];
  
  type Props = {
    data: any
    value: string
    setValue: Function
    subFunction: Function
  }
  const DropdownComponent = ({data, value, setValue, subFunction}: Props) => {
    return (
      <Dropdown
        style={[styles.dropdown]}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Pick card..."
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
          subFunction(item.value);
        }}        
      />
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    dropdown: {
      width: 'auto', 
      display: 'flex',
      alignSelf: 'stretch',
      paddingHorizontal: 10,
    },
    containerStyle: {
      width: 200,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      height: 'auto',
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
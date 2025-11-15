import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
  const images = ["@/assets/images/card-0.png","@/assets/images/card-1.png","@/assets/images/card-2.png","@/assets/images/card-3.png","@/assets/images/card-4.png","@/assets/images/card-5.png"];
  
  type Props = {
    data: any
    value: Number
    setValue: Function
    subFunction: Function
  }
  const DropdownComponent = ({data, value, setValue, subFunction}: Props) => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
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
      height: '100%',
      width: '100%',
    },
    containerStyle: {
      height: '100%',
      width: 200,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
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
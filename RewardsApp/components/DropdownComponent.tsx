import React, { useState } from 'react';
  import { StyleSheet, ImageSourcePropType } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  const images = ["@/assets/images/card-0.png","@/assets/images/card-1.png","@/assets/images/card-2.png","@/assets/images/card-3.png","@/assets/images/card-4.png","@/assets/images/card-5.png"];
  const data = [
    { label: 'Card 1', value: 1 },
    { label: 'Card 2', value: 2 },
    { label: 'Card 3', value: 3 },
    { label: 'Card 4', value: 4 },
    { label: 'Card 5', value: 5 },
  ];

  type Props = {
    value: Number
    setValue: Function
    subFunction: Function
  }
  const DropdownComponent = ({value, setValue, subFunction}: Props) => {
    return (
      <Dropdown
        style={styles.dropdown}
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
      padding: 16,
      height: '100%',
      width: '100%',
      backgroundColor: 'blue',
      borderRadius: 30,
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
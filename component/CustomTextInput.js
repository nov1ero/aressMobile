import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';

const CustomTextInput = ({ label, placeholder, onChangeText, error }) => {
  const [value, setValue] = useState('');

  const handleOnChangeText = (text) => {
    setValue(text);
    onChangeText(text);
  };

  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={handleOnChangeText}
      />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default CustomTextInput;
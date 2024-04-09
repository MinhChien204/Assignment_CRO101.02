import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';

const WrappedInput = ({ placeholder, secureTextEntry, onChangeText, onError }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTextInputChange = (text) => {
    // Kiểm tra điều kiện và gọi hàm onError nếu cần
    if (text.length < 5) {
      onError("Tài khoản phải có ít nhất 5 ký tự");
    } else {
      // Xử lý input bình thường
    }
    onChangeText(text);
  };

  return (
    <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#606060"
        secureTextEntry={secureTextEntry}
        onChangeText={handleTextInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
      />
      {isFocused && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error message goes here</Text>
          <Text style={styles.descriptionText}>Description goes here</Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  inputContainer: {
    marginTop: 20,
    width: '90%',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#606060',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
  inputContainerFocused: {
    borderColor: '#000000',
  },
  input: {
    paddingVertical: 15,
    fontSize: 16,
    color: '#606060',
  },
  errorContainer: {
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  descriptionText: {
    color: '#828282',
    fontSize: 14,
  },
};

export default WrappedInput;

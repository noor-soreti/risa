import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function InputBox(props: any) {
  const { placeholder, value, secureTextEntry, onChangeText, autoCapitalize } = props;

  return (
    <TextInput style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        autoCapitalize={autoCapitalize || 'none'}
        secureTextEntry={secureTextEntry}
        >
    </TextInput>
  );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 307,
      marginBottom: 10,
      padding: 10,
      borderColor: '#e7e7e7',
      color: '#7b8d93',
      borderWidth: 1,
    }
  })
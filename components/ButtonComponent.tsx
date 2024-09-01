import { Link } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, StyleSheet, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ButtonComponent(props: any) {

  const { text, screenName, disabled } = props  
  const navigation = useNavigation()

  const onLinkPress = () => {
    navigation.navigate(screenName)
}
  
  return (
    <Pressable onPress={() => onLinkPress() } style={[styles.button, disabled && styles.disabled]} disabled={disabled}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#7CA4FC',
    width: 307,
    height: 38,
    marginBottom: 10
  },
  text: {
    fontSize: 15,
    height: 16,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  disabled: {
    backgroundColor: '#e7e7e7',
  }
});

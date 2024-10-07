import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles } from '@/constants/Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {ColorPalette} from '@/constants/Colors'
import { Link } from 'expo-router'

const BottomLoginSheet = ({navigation}) => {

  const { bottom }  = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
        <TouchableOpacity style={[defaultStyles.btn, styles.btnDark]} onPress={() => navigation.navigate('register')}>
          <Ionicons name="mail" size={20} style={styles.btnIcon} color={ColorPalette.white}/>
          <Text style={styles.btnDarkText}>Register with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[defaultStyles.btn, styles.btnDark]} onPress={() => navigation.navigate('sign-in')}>
          <Text style={styles.btnDarkText}>Log in</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    padding: 26,
    gap: 14,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  btnLight: {
    backgroundColor: '#fff',
  },
  btnIcon: {
    paddingRight: 7,
  },
  btnLightText: {
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: ColorPalette.grey,
  },
  btnDarkText: {
    color: '#fff',
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: ColorPalette.grey,
  }
})

export default BottomLoginSheet
import { View, StyleSheet, Text, Pressable, KeyboardAvoidingView } from "react-native";
import { useEffect, useState } from "react";
import InputBox from "@/components/InputBox";
import { setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import ButtonComponent from "@/components/ButtonComponent";
import { auth } from "@/firebase";
import { useAuth } from "@/context/AuthContext";

export default function LogInScreen({navigation}: any) {
    // const [phoneNumber, setPhoneNumber] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, warn } = useAuth()

    const isButtonDisabled = !email || password.length < 6

    const onLogIn = async () => {
      const signin = await login(email, password)
    }

     return (
    <View style={styles.container}>
      <View style={styles.welcome}>
      <Text style={{color: '#7CA4FC', fontSize: 20}}>Welcome to</Text>
        <Text style={{fontFamily: 'SingleDay', fontSize: 55, color: '#7CA4FC'}}>RISA</Text>
      </View>

      <View style={styles.text}>
        <Text style={{color: '#7CA4FC'}}>Already have an account?</Text>
      </View>

      <View style={styles.input}>
        <KeyboardAvoidingView behavior="padding"> 
          <InputBox placeholder="Email" value={email} onChangeText={setEmail}/>
          <InputBox placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true}/>
        </KeyboardAvoidingView>
      </View>

      { warn && <View><Text style={{color: 'red', paddingBottom: 10}}>{warn}</Text></View>}

      <View>
        <Pressable onPress={() => onLogIn() } style={[styles.button, isButtonDisabled && styles.disabled]} disabled={isButtonDisabled}>
          <Text style={styles.btnText}>LOG IN</Text>
        </Pressable>
        <ButtonComponent text='SIGN UP' screenName='register'/>
      </View>

      <View style={styles.text}>
        <Pressable onPress={() => navigation.navigate("forgotPassword")} >
          <Text style={{color: '#7CA4FC'}}>Forgot your password?</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF'
    },
    welcome: {
      marginTop: 200,
      marginBottom: 40,
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      marginBottom: 5
    },
    testInput: {
      height: 40,
      width: 307,
      marginBottom: 10,
      padding: 10,
      borderColor: '#e7e7e7',
      color: '#7b8d93',
      borderWidth: 1,
    },
    text: {
      marginBottom: 20,
    },
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
    btnText: {
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
  
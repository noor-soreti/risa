import InputBox from "@/components/InputBox";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { View, StyleSheet, Text, Pressable, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./api/features/users/userThunk";
import Toast from "react-native-toast-message";

export default function LogInScreen({navigation}: any) {
    const [phoneNumber, setPhoneNumber] = useState('123-123-1234')
    const [password, setPassword] = useState('test123')
    const [warn, setWarn] = useState(null)
    const { loading } = useSelector((state) => state.user)
    const dispatch = useDispatch() 

    const isButtonDisabled = !phoneNumber || password.length < 6

    const handleSubmit = () => {
      const test = async () => { 
        const status = await dispatch(loginUser({phoneNumber, password}))
        if (status != null) {
          Toast.show({
            type: 'error',
            visibilityTime: 5000,
            text1: 'Woops!',
            text2: `This phone number has not been registered yet!`
          })
        }
      }
      test()
    }

     return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignSelf: 'flex-start', padding: 15}} onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={28} />
        </TouchableOpacity>
      <View style={styles.welcome}>
      <Text style={{color: '#7CA4FC', fontSize: 20}}>Welcome to</Text>
        <Text style={{fontFamily: 'SingleDay', fontSize: 55, color: '#7CA4FC'}}>RISA</Text>
      </View>

      <View style={styles.text}>
        <Text style={{color: '#7CA4FC'}}>Already have an account?</Text>
      </View>

      <View style={styles.input}>
        <KeyboardAvoidingView behavior="padding"> 
          <InputBox placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber}/>
          <InputBox placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true}/>
        </KeyboardAvoidingView>
      </View>

      { warn && <View><Text style={{color: 'red', paddingBottom: 10}}>{warn}</Text></View>}

      <TouchableOpacity onPress={handleSubmit} style={[defaultStyles.btn, styles.btnColour, isButtonDisabled && styles.disabled]} disabled={isButtonDisabled}>
        <Text style={styles.text}>{ loading ? "Loading.." : "NEXT"}</Text>
      </TouchableOpacity>      

      <View style={styles.text}>
        <Pressable onPress={() => navigation.navigate("forgotPassword")} >
          <Text style={{color: '#7CA4FC'}}>Forgot your password?</Text>
        </Pressable>
      </View>
      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF7F8',
    padding: 20
  },
  welcome: {
    marginTop: 120,
    marginBottom: 40,
    alignItems: 'center',
  },
  input: {
    marginBottom: 15,
  },
  textInput: {
    height: 40,
    width: 320,
    marginBottom: 10,
    padding: 10,
    borderColor: '#FFD1DC',
    color: '#7b8d93',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFF0F5',
    shadowColor: '#FFC1CC',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Arial',
    padding: 10
  },
  btnColour: {
    backgroundColor: '#7CA4FC',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: '#e7e7e7',
  },
});

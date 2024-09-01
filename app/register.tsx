import { useState } from "react";
import { View, Text, Pressable, TextInput, Button, KeyboardAvoidingView, Image } from "react-native";
import { StyleSheet } from "react-native";
import InputBox from "@/components/InputBox";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import { useAuth } from "@/context/AuthContext";
// import * as ImagePicker from 'expo-image-picker';

export default function Register({navigation}: any) { 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [image, setImage] = useState(null);
  const [warn, setWarn] = useState('')
  const { register } = useAuth()

  const isButtonDisabled = !email || password.length < 6 || confirmPassword.length < 6 || !username

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  };

  const registerUser = () => {
    if (password === confirmPassword) {      
      register(email, password)
    } else {
      setWarn("Passwords must match")
    }
  }

    return (
        <View style={styles.container}>
            {/* <Text style={{color: '#7CA4FC', fontWeight: '700', fontSize: 17}}>Enter your phone number</Text> */}

            {/* <View style={styles.inputArea}>
                <Pressable style={styles.dropdown}>
                    <Text style={styles.dropdownText}>+251</Text>
                </Pressable>
                <TextInput style={styles.input} value={email} onChangeText={setEmail}/>
            </View> */}

          <Button title="Pick an image from camera roll" onPress={pickImage} />
          { image && <Image source={{ uri: image}} style={styles.image} />}
          {!image && <Image 
              source={require('../assets/images/user-profile.png')}
              style={styles.image}
          />}


          <View style={{marginBottom: 5}}>
            <KeyboardAvoidingView behavior="padding"> 
              <InputBox placeholder="Email" value={email} onChangeText={setEmail}/>
              <InputBox placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true}/>
              <InputBox placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true}/>
              <InputBox placeholder="Username" value={username} onChangeText={setUsername}/>
            </KeyboardAvoidingView>
          </View>

      { warn && <View><Text style={{color: 'red', paddingBottom: 10}}>{warn}</Text></View>}
            
          <Pressable onPress={() => registerUser() } style={[styles.button, isButtonDisabled && styles.disabled]} disabled={isButtonDisabled}>
            <Text style={styles.text}>NEXT</Text>
          </Pressable>

          {/* <ButtonComponent text='Next' screenName='verification' disabled={isButtonDisabled}/> */}

          <View  style={{alignItems:'center'}}>
              <Text style={{marginTop: 20, color: 'grey'}}>
                  We'll send you a 5-digit code to verify your number
              </Text>
              <Text style={{marginTop: 20, color: 'grey'}}>
                  Don't have a local number?
              </Text>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 90,
        backgroundColor: '#FFFFFF',
        gap: 20
      },
      image: {
        width: 80, 
        height: 80, 
        borderWidth: 1,
        borderColor: '#e7e7e7',
        borderRadius: 40
      },
      inputArea: {
        display: 'flex',
        flexDirection: 'row',
        width: 307,
        marginTop: 20
      },
      dropdown: {
        width: 102,
        height: 38,
        backgroundColor: '#7CA4FC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
      },
      dropdownText: {
        color: '#FFFFFF'
      },
      input: {
        height: 38,
        width: 207,
        marginBottom: 10,
        padding: 10,
        borderColor: '#e7e7e7',
        color: '#7b8d93',
        borderWidth: 1,
        borderRadius: 3
      },
      invalidPhoneNumber: {
        color: 'red',
        paddingBottom: 10
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
      
    })
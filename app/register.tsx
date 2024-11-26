import { useState } from "react";
import { View, Text, Button, KeyboardAvoidingView, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import InputBox from "@/components/InputBox";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { defaultStyles } from "@/constants/Styles";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { postImage } from "./api/axiosApiFunctions";
import * as FileSystem from 'expo-file-system';
import { register } from "./api/features/users/userThunk";
import { ColorPalette } from "@/constants/Colors";

export default function Register({navigation}: any) { 
  const [phoneNumber, setPhoneNUmber] = useState('123-123-1234')
  const [password, setPassword] = useState('test123')
  const [confirmPassword, setConfirmPassword] = useState('test123')
  const [fullName, setFullName] = useState('Buffy Derman')
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [warn, setWarn] = useState('')
  const { user, loading, error } = useSelector((state)=> state.user)
  const dispatch = useDispatch()
  const isButtonDisabled = !phoneNumber || password != confirmPassword ||  password.length < 6 || confirmPassword.length < 6 || !fullName    
  
  const handleSubmit = async () => {
    const status = await dispatch(register({fullName, phoneNumber, password}))
    
    switch (status.payload) {
      case 409:
        Toast.show({
          type: 'error',
          visibilityTime: 5000,
          text1: 'Woops!',
          text2: `This phone number seems to already be registered`
        })
        // let uriParts = imageUri?.split(".")
        // let fileType = uriParts[uriParts?.length - 1]
        // let formData = new FormData()
        // formData.append('photo', {
        //   imageUri,
        //   name: `photo.${fileType}`,
        //   type: `image/${fileType}`
        // })
        // try {
        //   console.log(formData._parts);
        //   let t = postImage(formData) 
        // } catch (error) {
        //   throw error
        // }
      case 404: 
        Toast.show({
          type: 'error',
          visibilityTime: 5000,
          text1: 'Woops!',
          text2: `Server(s) are down`
        })  
      default: 
        Toast.show({
          type: 'error',
          visibilityTime: 5000,
          text1: 'Woops!',
          text2: `Something went wrong... please try again`
        })
    }
    
  }

  const pickImage = async () => {
    // According to Expo doc: permissions request NOT necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setImageUri(result.assets[0].uri)
    }
  };

  // const handleRegister = async () => {
  //   // setLoading(true)
  //   if (password === confirmPassword) {            
  //     try {
  //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //       await uploadImage(imageUri)
  //       await setDoc(doc(db, "users", userCredential.user.uid), {
  //         displayName: fullName,
  //         phoneNumber,
  //         avatar: imageUri,
  //         status: 'Feeling Happy',
  //         friends: [],
  //         id: userCredential.user.uid})
  //       await setDoc(doc(db, "userChats", userCredential.user.uid), {
  //         chats: []
  //       })
  //       await setDoc(doc(db, "userCalls", userCredential.user.uid), {
  //         calls: []
  //       })
  //     } catch (e) {
  //       console.log(e.message);
  //       setWarn(e.message)
  //     }
  //   } else {
  //     setWarn("Passwords must match")
  //   }
  //   // setLoading(false)
  // }

    return (
        <View style={styles.container}>

            {/* <Text style={{color: '#7CA4FC', fontWeight: '700', fontSize: 17}}>Enter your phone number</Text> */}
            {/* <View style={styles.inputArea}>
                <Pressable style={styles.dropdown}>
                    <Text style={styles.dropdownText}>+251</Text>
                </Pressable>
                <TextInput style={styles.input} value={email} onChangeText={setEmail}/>
            </View> */}

          <TouchableOpacity style={{alignSelf: 'flex-start', padding: 5}} onPress={() => navigation.goBack()}>
            <Ionicons name="close-outline" size={28} />
          </TouchableOpacity>

          <Button title="Pick an image from camera roll" onPress={pickImage} />
          { imageUri && <Image source={{ uri: imageUri}} style={styles.image} />}
          {!imageUri && <Image 
              source={require('../assets/images/profile.png')}
              style={styles.image}
          />}


          <View style={{marginBottom: 5}}>
            <KeyboardAvoidingView behavior="padding"> 
              <InputBox placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNUmber} autoCapitalize="none" />
              <InputBox placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true}/>
              <InputBox placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true}/>
              <InputBox placeholder="Full Name" value={fullName} onChangeText={setFullName} autoCapitalize="words"/>
            </KeyboardAvoidingView>
          </View>

          { warn && <View><Text style={{color: 'red'}}>{warn}</Text></View>}
            
          <TouchableOpacity onPress={() => handleSubmit() } style={[defaultStyles.btn, styles.btnColour, isButtonDisabled && styles.disabled]} disabled={isButtonDisabled}>
            <Text style={styles.text}>{ loading ? "Loading.." : "NEXT"}</Text>
          </TouchableOpacity>

          {/* <ButtonComponent text='Next' screenName='verification' disabled={isButtonDisabled}/> */}

          <View  style={{alignItems:'center'}}>
              <Text style={{marginTop: 20, color: 'grey'}}>
                  We'll send you a 5-digit code to verify your phone number
              </Text>
              {/* <Text style={{marginTop: 20, color: 'grey'}}>
                  Don't have a local number?
              </Text> */}
          </View>
          <Toast/>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF7F8',
    gap: 15,
    padding: 20,
  },
  image: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderRadius: 45,
    marginTop: 20,
  },
  inputArea: {
    flexDirection: 'row',
    width: 320,
    marginTop: 20,
    backgroundColor: '#FFF0F5',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#FFC1CC',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  dropdown: {
    width: 100,
    height: 40,
    backgroundColor: '#7CA4FC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  dropdownText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    height: 40,
    width: 200,
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
  invalidPhoneNumber: {
    color: 'red',
    paddingBottom: 10,
    fontSize: 14,
  },
  btnColour: {
    backgroundColor: ColorPalette.darkGreen,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  disabled: {
    backgroundColor: '#e7e7e7',
  },
});

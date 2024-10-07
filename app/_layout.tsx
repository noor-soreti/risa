import HomeSettings from "./(app)/home/homeSettings";
import UserInfo from "./(app)/userInfo/userInfo";
import Message from "./(app)/chat/message/message";
import TabLayout from "./(app)/_layout";
import HomeScreen from "./(app)/home";
import Register from "./register";
import IndexView from "./start";
import SignIn from "./sign-in";
import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator, View } from "react-native";
import { useUserStore } from "@/helperFunction/userStore";
import { NavigationContainer } from "@react-navigation/native";
import { getItemFor, storeData } from "@/helperFunction/asyncStorageHelper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import mock from '@/mock/user.json'
import Inbox from "./(app)/home/inbox/inbox";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const HAS_LAUNCHED = false

export default function RootLayout() {

  return (
    // <Provider store={store}>
      <NavigationContainer independent={true}>
        <AppNavigator />
      </NavigationContainer>
    // </Provider>
  );
}

function AppNavigator () {
  const Stack = createNativeStackNavigator();
  const currentUser = false
  // const { currentUser, isLoading, fetchUserInfo }: any = useUserStore()

  // useEffect(() => {
  //   // const launched = async () => {
  //   //   const getItem = await getItemFor('HAS_LAUNCHED')
  //   //   if ( getItem == 'false' ) {
  //   //     console.log('HAS_LAUNCHED: false')
  //   //   } else {
  //   //     console.log('true');
  //   //   }
  //   // }
  //   // launched()
    
  //   const unSubscribe = onAuthStateChanged(auth, (user => {
  //     fetchUserInfo(user?.uid)
  //     console.log(user?.uid);
      
  //     console.log(`onAuthStateChanged - currentUser: ${JSON.stringify(currentUser)}`)
  //   }))
  //   return () => {
  //     unSubscribe()
  //   }
  // }, [fetchUserInfo]) 

  // if (isLoading) return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size='large' color='blue'/>
  //     </View>
  //   )

  return (
    <Stack.Navigator>
      { currentUser ?
        <>
          <Stack.Screen
            name="tab"
            component={TabLayout}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="message"
            component={Message}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="homeSettings"
            component={HomeSettings}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="userInfo"
            component={UserInfo}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="inbox"
            component={Inbox}
            options={{
              headerShown: false
            }}
          />
        </>
        : 
        <>
          <Stack.Screen name="start" component={IndexView} options={{headerShown: false}}/>
          <Stack.Group screenOptions={{ presentation: 'modal'}}>
            <Stack.Screen
              name="sign-in"
              component={SignIn}
              options={{
                headerShown: false
              }}
            />
          <Stack.Screen
            name="register"
            component={Register}
            options={{
              headerShown: false
            }}
            />
            </Stack.Group>
        </>
      }
    </Stack.Navigator>
  )
}
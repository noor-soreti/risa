import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./sign-in";
import Register from "./register";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import TabLayout from "./(app)/_layout";
import Message from "./(app)/chat/message/message";
import HomeScreen from "./(app)/home";
import HomeSettings from "./(app)/home/homeSettings";
import IndexView from "./start";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {

  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

function AppNavigator () {
  const Stack = createNativeStackNavigator();
  const [ hasLaunched, setHasLaunched ] = useState(false)
  const { user } = useAuth()     

  useEffect(() => {
    const getData = async () => { 
      if (user == null) {
        setHasLaunched(false)
      } else {
        setHasLaunched(true)
      }
    }
    getData().catch((e) => console.log(e))
  }, [user])

  return (
    <Stack.Navigator>
      { hasLaunched ?
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
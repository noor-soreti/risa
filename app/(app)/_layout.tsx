import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MainScreen from './home'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ChatScreen from './chat';
import CallLog from './call';


const Tab = createBottomTabNavigator()
export default function TabLayout() {
  return(
    <Tab.Navigator>
      <Tab.Screen
        name='home'
        component={MainScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name='chat'
        component={ChatScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="comment" color={color} />,
        }}
      />
      <Tab.Screen
        name='call'
        component={CallLog}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="phone" color={color} />,
        }}
      />

    </Tab.Navigator>
  )
}

import { Image, Pressable, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from "react";
import CustomDropdown from "@/components/CustomDropdown";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [isSearchSelected, setIsSearchSelected] = useState(false)
  const [channels, setChannels] = useState(false)
  const [friends, setFriends] = useState(false)
  const [groups, setGroups] = useState(false)
  const [services, setServices] = useState(false)

    return( 
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerOptions}>
                    <Pressable onPress={() => setIsSearchSelected(prev=>!prev)}>
                      <FontAwesome size={20} name="search" />
                    </Pressable>
                    <Pressable onPress={() => console.log('add friend')}>
                      <FontAwesome size={20} name="user-plus" />
                    </Pressable>
                    <Pressable onPress={() => console.log('settings')}>
                      <FontAwesome size={20} name="cog" />
                    </Pressable>
                </View>

                <View style={styles.headerContent}>
                    <Image 
                        source={require('../../../assets/images/avatar.png')}
                        style={styles.image}
                    />
                    <View style={styles.userInfo}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Daniel</Text>
                        <Text style={{color: '#7b7b92'}}>Feeling happy</Text>
                    </View>
                </View>
            </View>

              {isSearchSelected ?
                <View style={styles.search}>
                    <View style={styles.searchBar}>
                      <FontAwesome size={15} name="search" style={{padding: 8, color: '#a1a1a1'}} />
                      <TextInput style={styles.input} autoCapitalize="none"
                      
                      />
                    </View> 
                    <View>
                    </View>
                </View>
                :
                  null
              } 
              
           <CustomDropdown {...{channels, friends, groups, services, setChannels, setFriends, setGroups, setServices}} />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderBottomColor: '#BFC0C7',
      },
      header: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
      },
      headerOptions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        paddingRight: 20
      },
      headerContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
      },
      image: {
        width: 60, 
        height: 60, 
        backgroundColor: '#7CA4FC',
        borderRadius: 30,
        cursor: 'pointer'
      },
      userInfo: {
        paddingLeft:10
      },
      mainContent: {
        marginTop: 20,
      },
      search: {
        display: 'flex',
        flexDirection: 'row',
        margin: 6
      },
      searchBar: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#f7f4f4',
        borderRadius: 5
      },
      input: {
        flex: 1,
      }  
})

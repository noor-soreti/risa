import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Pressable, Keyboard, Image, ScrollView } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import mock from '../mock/channels.json'

export default function CustomDropdown(props: any) {
    const { channels, friends, groups, services, setChannels, setFriends, setGroups, setServices } = props
    const [contacts, setContacts] = useState<any>([])
    const navigation = useNavigation()

    useEffect(() => {
      // (async () => {
      //   const { status } = await Contacts.requestPermissionsAsync();
      //   if (status === 'granted') {
      //     const { data } = await Contacts.getContactsAsync({
      //       fields: [Contacts.Fields.Emails],
      //     });
  
      //     if (data.length > 0) {
      //       const contact = data[0];
      //     }
      //     setContacts(data)
      //   }
      // })();
    }, []);

    const toggleState = (key: string) => {
      switch (key.toLowerCase()) {
        case 'channels':
            setChannels((prev: any) => !prev);
            break;
        case 'friends':
            setFriends((prev: any) => !prev);
            break;
        case 'groups':
            setGroups((prev: any) => !prev);
            break;
        case 'services':
            setServices((prev: any) => !prev);
            break;
        default:
            break;
        }
      }    

      function selectSeeAll(key:string) {
        switch (key.toLocaleLowerCase()) {
          case 'channels':
              // navigation.navigate('channelList')
              break;
          case 'friends':
              console.log('friends')
              break;
          case 'groups':
              console.log('groups')
              break;
          case 'services':
              console.log('services')
              break;
          default:
              break;
          }
      }

      function viewChannel(item:any) {
        console.log('viewChannel');
        
        // navigation.navigate('channel', {id: item.id})
      }

      const channelArray = Object.keys(mock).map(key => ({
        id: key,
        channelName: mock[key].channelName
      }))

    return( 
        <View style={styles.dropDown}>
              <FlatList 
                  data={[
                  // {key: 'Channels', state: channels, value: 'channels'},
                  {key: 'Friends', state: friends, value: 'friends'},
                  {key: 'Groups', state: groups, value: 'groups',},
                  {key: 'Services', state: services,  value: 'services'},
                  ]}
                  renderItem={({item}) => 
                  <View>
                    <Pressable onPress={() => toggleState(item.key)} style={styles.flatList}>
                      <Text style={styles.flatListItem}>{item.key}</Text>
                      <FontAwesome size={20} name={ item.state ? "caret-down" :"caret-left"} style={{color: '#626262'}} />
                  </Pressable>
                  {
                    item.state ?
                    <View style={styles.dropDownItem}>
                      <Pressable style={{alignSelf: 'flex-end'}} onPress={() => selectSeeAll(item.key)}>
                        <Text style={{color: '#007aff'}}>
                          See All
                        </Text>
                      </Pressable>
                      {
                      item.value == 'channels' ?
                            <FlatList
                            horizontal
                            style={styles.itemStyle}
                            data={channelArray}
                            renderItem={({item}) => 
                            <Pressable style={styles.currentItem} onPress={() => viewChannel(item)}>
                              <Text> {item.channelName} </Text>
                            </Pressable>
                            }
                            />
                        : item.value == "friends" ?
                        <ScrollView style={styles.scrollView}>
                          {
                            Object.keys(contacts).map(contact => (
                              <View style={styles.contact}>
                                <Image style={styles.image} source={require('../assets/images/avatar.png')} />
                                <View>
                                  <Text> {contacts[contact]['name']} </Text>
                                </View>
                              </View>
                            ))
                          }
                        </ScrollView>
                        :
                        <Text>{item.value}</Text>
                      }
                    </View>
                    : null
                  }
                  </View>
                }
                />
            </View>
    )
}

const styles = StyleSheet.create({
    dropDown: {
        paddingTop: 10
      },
      flatList: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#1119270a",
        padding: 15,
        paddingTop: 10,
      },
      flatListItem: {
        flex:1,
        fontSize: 16,
        lineHeight: 23,
        fontWeight: '500'
      },
      dropDownItem: {
        minHeight: 40,
        padding: 10,
        gap: 10,
      },
      itemStyle: {
        display: 'flex',
        flexDirection: 'row',
      },
      currentItem: {
        width: 100,
        height: 70,
        marginRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e5e5e8",
        backgroundColor: "#e5e5e8", 
      },
      scrollView: {
      },
      contact: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1
      },
      image: {
        height: 50,
        width: 50,
        borderRadius: 30
      }
})
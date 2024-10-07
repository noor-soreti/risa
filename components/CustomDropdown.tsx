import { Text, View, StyleSheet, FlatList, Pressable, Keyboard, Image, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from "@/helperFunction/userStore";
import { useEffect, useState } from "react";
import { ColorPalette } from "@/constants/Colors";
import mock from '../mock/channels.json'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Contacts from 'expo-contacts';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import FriendsDropdown from "./FriendsDropdown";
import { Ionicons } from "@expo/vector-icons";

export default function CustomDropdown(props: any) {
    const { channels, friends, groups, services, setChannels, setFriends, setGroups, setServices } = props
    const navigation = useNavigation()

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
                      {
                      item.value == 'channels' ?
                        <>
                          <Pressable style={{alignSelf: 'flex-end'}} onPress={() => selectSeeAll(item.key)}>
                            <Text style={{color: '#007aff'}}>
                              See All
                            </Text>
                          </Pressable>
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
                        </>
                        : item.value == "friends" ?
                        <FriendsDropdown navigation={navigation} />
                        : item.value == "groups" ?
                        <View style={{flex: 1, alignItems: 'center'}}>
                          <Ionicons name="sad-outline" size={50}/>
                          <Text>No Groups Yet!</Text>
                      </View>
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
        borderBottomColor: ColorPalette.borderGrey,
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
      contact: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: ColorPalette.borderGrey,
      },
      image: {
        height: 50,
        width: 50,
        borderRadius: 30
      }
})
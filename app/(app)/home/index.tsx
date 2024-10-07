import CustomDropdown from "@/components/CustomDropdown";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AddFriend from "@/components/AddFriendModal";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {Alert, Image, Modal, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function MainScreen({navigation}: any) {
  const [channels, setChannels] = useState(false)
  const [friends, setFriends] = useState(false)
  const [groups, setGroups] = useState(false)
  const [services, setServices] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);    
  const { user } = useSelector((state) => state.user)

  console.log(user);
  

    return( 
        <SafeAreaView style={styles.container} >
          <View style={styles.header}>
            <View style={styles.headerOptions}>
              {/* <Pressable onPress={() => setIsSearchSelected(prev=>!prev)}>
                <FontAwesome size={20} name="search" />
              </Pressable> */}
              <Pressable onPress={() => navigation.navigate('inbox')}>
                <FontAwesome size={20} name="inbox" />
              </Pressable>
              <Pressable onPress={() => setModalVisible(prev=>!prev)}>
                <FontAwesome size={20} name="user-plus" />
              </Pressable>
              <Pressable onPress={() => navigation.navigate('homeSettings')}>
                <FontAwesome size={20} name="cog" />
              </Pressable>
            </View>
            

            <View style={styles.headerContent}>
              <Image source={require('../../../assets/images/profile.png')} style={styles.image}/>
              {/* <Image 
                  source={currentUser.avatar || require('../../../assets/images/profile.png')}
                  style={styles.image}
              /> */}
              <View style={styles.userInfo}>

                  <Text style={{fontSize: 20, fontWeight: 'bold'}}> {user.fullName} </Text>
                  <Text style={{color: '#7b7b92'}}> {user.status == null ? "Status" : user.status} </Text>
              </View>
            </View>
          </View>
          
          <CustomDropdown {...{channels, friends, groups, services, setChannels, setFriends, setGroups, setServices}} />


          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <AddFriend setModalVisible={setModalVisible} modalVisible={modalVisible} />
            </Modal>
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
        borderRadius: 30,
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
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },    
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        justifyContent: 'center',
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
      },
      modalSearch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
      input: {
        borderRadius: 10,
        height: 40,
        width: 307,
        marginBottom: 10,
        padding: 10,
        borderColor: '#e7e7e7',
        color: '#7b8d93',
        borderWidth: 1,
      }, 
      userSearchInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
      },
      blurContainer: {
        flex: 1,
        padding: 20,
        margin: 16,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 20,
      },
})

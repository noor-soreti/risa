import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform, SafeAreaView, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { ColorPalette } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { deactivateStompClient, initializeStompClient, sendMessage } from "@/app/api/websocket/stompClient";
import { useDispatch, useSelector } from "react-redux";
import { getChatLogMessages } from "@/app/api/features/messages/messageThunk";

export default function Message(props: any) {
    const iconsTop = ['phone', 'camera', 'cog']
    const iconsBottom = ['camera', 'image']
    const navigation = useNavigation()
    const [inputText, setInputText] = useState('')
    const [ messages, setMessages ] = useState([])
    const [ userInfo, setUserInfo ] = useState()
    const { chatId, names } = props.route.params   
    const { user } = useSelector((state) => state.user)   
    const dispatch = useDispatch()  
    
    useEffect(() => {
        initializeStompClient(chatId)
        const getMess = async () => {
            const messages = await dispatch(getChatLogMessages(chatId))   
            setMessages(messages.payload)            
        }
        getMess()
    }, [])
    
    const handleHeaderOptions = (option: string) => {
        if (option == 'cog') {
            navigation.navigate('userInfo', userInfo)
        } else {
            console.log(option);
        }
    }

    const handleSendMessage = async () => {
        let newMessage: ISendMessage = {
            senderId: user.id,
            message: inputText,
        }
        // dispatch(postMessage({chatId, newMessage}))
        sendMessage(chatId, newMessage)

        setInputText("")
    }

    const handleGoBack = () => {
        deactivateStompClient()
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Pressable onPress={() => handleGoBack()}>
                        <FontAwesome name="angle-left" size={20} />
                    </Pressable>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}> {names} </Text>
                </View>
                <View style={styles.headerOptions}>
                    {
                        iconsTop.map(name => (
                            <Pressable key={name} onPress={() => handleHeaderOptions(name)}>
                                <FontAwesome name={name} size={20}/>
                            </Pressable>
                        ))
                    }
                </View>
            </View>

            <KeyboardAvoidingView 
                style={{flex: 1}} 
                behavior={Platform.OS === "ios" ? "height" : undefined}
                keyboardVerticalOffset={80}>
                    {
                        messages.length == 0 
                        ? 
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10}}>
                                <Ionicons name="sad-outline" size={50}/>
                                <Text>No messages between you and {names} yet!</Text>
                            </View>
                        :
                        <FlatList
                            data={messages}
                            renderItem={({item}) => 
                            <View>
                                {
                                    item.senderId == user.id ?
                                    <View style={[styles.messageContainer, styles.receiverMessageContainer]}> 
                                        <View style={{display: 'flex'}}>
                                            <Text style={{color: 'white'}}>{item.message} </Text>
                                            <Text style={{color: 'white'}}>{item.deliveredAt} </Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={[styles.messageContainer, styles.senderMessageContainer]}> 
                                        <View style={{display: 'flex'}}>
                                            <Text style={{color: 'white'}}>{item.message} </Text>
                                            <Text style={{color: 'white'}}>{item.deliveredAt} </Text>
                                        </View>
                                    </View>
                                }
                                </View>
                            }
                            keyExtractor={item => item.id}
                            style={styles.center}
                        >

                        </FlatList>
                    }
            </KeyboardAvoidingView>
            
            <View style={styles.bottom}>
                {
                    inputText.length <= 0 
                    ?
                        <View style={styles.bottomLeft}>
                            {
                                iconsBottom.map(name => (
                                    <Pressable onPress={() => console.log(name)}>
                                        <FontAwesome name={name} size={20}/>
                                    </Pressable>
                                ))
                            }
                        </View>
                    :
                        <Pressable onPress={() => console.log('plus')}>
                            <FontAwesome name='plus' size={20}/>
                        </Pressable>
                }

                <View style={styles.inputArea}>
                    <TextInput 
                        value={inputText} 
                        onChangeText={setInputText} 
                        style={styles.input}
                        placeholder="Aa" 
                        multiline
                    />
                    {
                        inputText.length != 0 &&
                        <Pressable onPress={handleSendMessage}>
                            <Ionicons name="send-sharp" size={20}/>
                        </Pressable>

                    }
                </View>

                <Pressable onPress={() => console.log('microphone')}>
                    <FontAwesome name="microphone" size={20} color="black" />
                </Pressable>
            </View> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingBottom: 10
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: ColorPalette.borderGrey,
        margin: 15
      }, 
      headerLeft:{
        display: 'flex',
        flexDirection: 'row',
        gap: 20
      },
      headerOptions: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20
      },
      center: {
        padding: 10,
      },
      messageContainer: {
        borderRadius:5, 
        padding:10,
        margin: 5
    },
    senderMessageContainer: {
        backgroundColor: '#2d2d2e',
        marginRight: 50
    },
    receiverMessageContainer: {
        backgroundColor: '#7CA4FC', 
        marginLeft: 50
    },
      bottom: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        maxHeight: 500,
        borderTopWidth: 1,
        borderTopColor: ColorPalette.borderGrey,
        paddingTop: 10
        // backgroundColor: ColorPalette.lightGrey
      },
      bottomLeft: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
      },
      inputArea: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex:1,
        backgroundColor: '#f7f4f4',
        marginLeft: 10,
        marginRight: 10,
        minHeight: 40,
        borderRadius: 20,
        padding: 10,
        maxHeight:100,
    },
    input: {
        flex: 1
    },
    emoji: {
        position: 'relative'
    },
    picker: {
        position: 'absolute'
    },
    bottomRight: {

    },
    myMessages: {

    }
})

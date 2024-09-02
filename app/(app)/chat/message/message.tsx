import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View, StyleSheet, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";

export default function Message() {
    const navigation = useNavigation()
    const [open, setOpen] = useState(false)
    const [inputText, setInputText] = useState('')
    const iconsTop = ['phone', 'camera', 'cog']
    const iconsBottom = ['plus', 'camera', 'image']

    const handleEmoji = (e) => {
        setInputText(prev=>prev+e)
        setOpen(false)
    }

    const handleHeaderOptions = (option: string) => {
        if (option == 'cog') {
            navigation.navigate('chatSettings')
        } else {
            console.log("noo");
        }
        // navigation.navigate(option)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <FontAwesome name="angle-left" size={20} />
                    </Pressable>
                    <Text style={{fontWeight: 'bold', fontSize: 17}} >Emily Grant</Text>
                </View>
                <View style={styles.headerOptions}>
                    {
                        iconsTop.map(name => (
                            <Pressable onPress={() => handleHeaderOptions(name)}>
                                <FontAwesome name={name} size={20}/>
                            </Pressable>
                        ))
                    }
                </View>
            </View>

            <KeyboardAvoidingView 
                style={{flex: 1}} 
                behavior={Platform.OS === "ios" ? "height" : undefined}
                keyboardVerticalOffset={60}
                >
                <ScrollView style={styles.center}>

                    <View style={[styles.messageContainer, styles.senderMessageContainer]}>
                        <View style={{display: 'flex'}}>
                            <Text style={{color: 'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque quos unde debitis voluptatum maxime tenetur similique consequuntur ipsa expedita quisquam molestiae earum eum, provident eveniet molestias saepe doloribus doloremque?</Text>
                            <Text style={{color: 'white', alignSelf: 'flex-end', fontSize: 12}}>1:43pm</Text>
                        </View>
                    </View>

                    <View style={[styles.messageContainer, styles.receiverMessageContainer]}>
                        <View style={{display: 'flex'}}>
                            <Text style={{color: 'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque quos unde debitis voluptatum maxime tenetur similique consequuntur ipsa expedita quisquam molestiae earum eum, provident eveniet molestias saepe doloribus doloremque?</Text>
                            <Text style={{color: 'white', alignSelf: 'flex-end', fontSize: 12}}>1:55pm</Text>
                        </View>
                    </View>


                    <View style={[styles.messageContainer, styles.senderMessageContainer]}>
                        <View style={{display: 'flex'}}>
                            <Text style={{color: 'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque quos unde debitis voluptatum maxime tenetur similique consequuntur ipsa expedita quisquam molestiae earum eum, provident eveniet molestias saepe doloribus doloremque?</Text>
                            <Text style={{color: 'white', alignSelf: 'flex-end', fontSize: 12}}>1:43pm</Text>
                        </View>
                    </View>

                    <View style={[styles.messageContainer, styles.receiverMessageContainer]}>
                        <View style={{display: 'flex'}}>
                            <Text style={{color: 'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque quos unde debitis voluptatum maxime tenetur similique consequuntur ipsa expedita quisquam molestiae earum eum, provident eveniet molestias saepe doloribus doloremque?</Text>
                            <Text style={{color: 'white', alignSelf: 'flex-end', fontSize: 12}}>1:55pm</Text>
                        </View>
                    </View>


                    <View style={[styles.messageContainer, styles.senderMessageContainer]}>
                        <View style={{display: 'flex'}}>
                            <Text style={{color: 'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque quos unde debitis voluptatum maxime tenetur similique consequuntur ipsa expedita quisquam molestiae earum eum, provident eveniet molestias saepe doloribus doloremque?</Text>
                            <Text style={{color: 'white', alignSelf: 'flex-end', fontSize: 12}}>1:43pm</Text>
                        </View>
                    </View>

                    <View style={[styles.messageContainer, styles.receiverMessageContainer]}>
                        <View style={{display: 'flex'}}>
                            <Text style={{color: 'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque quos unde debitis voluptatum maxime tenetur similique consequuntur ipsa expedita quisquam molestiae earum eum, provident eveniet molestias saepe doloribus doloremque?</Text>
                            <Text style={{color: 'white', alignSelf: 'flex-end', fontSize: 12}}>1:55pm</Text>
                        </View>
                    </View>


                </ScrollView>

            </KeyboardAvoidingView>
            
             <View style={styles.bottom}>
                <View style={styles.bottomLeft}>
                    {
                        iconsBottom.map(name => (
                            <Pressable onPress={() => console.log(name)}>
                                <FontAwesome name={name} size={20}/>
                            </Pressable>
                        ))
                    }
                </View>

                <View style={styles.inputArea}>
                    <TextInput  value={inputText} onChangeText={setInputText} style={styles.input} placeholder="Aa" multiline={true}/>
                    {/* <Pressable onPress={() => setOpen((prev)=>!prev)}>
                        <AntDesign name="smileo" size={20} color="black" />
                    </Pressable>
                    <View style={styles.emoji}>
                        { 
                            open ?
                                <EmojiModal style={styles.picker} onEmojiSelected={(emoji) => handleEmoji(emoji)} />
                            :
                                null
                        }
                    </View>  */}
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
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: "#1119270a",
        padding: 15
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
        maxHeight: 100,
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
        height: 40,
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

    }
})

import { ColorPalette } from "@/constants/Colors";
import { getUserNotifications } from "@/app/api/axiosApiFunctions";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Inbox() {
    const navigation = useNavigation()
    const [ notifications, setNotifications ] = useState([])

    useEffect(() => {
        const notifications = async () => {
            const getNotifications = await getUserNotifications('852')
            setNotifications(getNotifications)
        }
        notifications()
    }, [])    

    return(
        <SafeAreaView style={styles.container}>
           <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <FontAwesome name="angle-left" size={20} />
                    </Pressable>
                    <Text style={{fontWeight: 'bold', fontSize: 17}} >Inbox</Text>
                </View>
            </View>
            {
                notifications.length <= 0 ?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="sad-outline" size={50}/>
                    <Text>No Notification Yet!</Text>
                </View>
                :
                <View>
                    <Text>yes</Text>
                </View>
            }
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
        paddingTop: Platform.OS === "android" ? 30 : 0
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: ColorPalette.borderGrey,
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
})
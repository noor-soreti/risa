import Header from "@/components/Header";
import { StyleSheet } from "react-native";
import ChatList from "./chatList/chatList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
    const icons = ['search', 'comments', 'folder-open']
    return(
        <SafeAreaView style={styles.container}>
            <Header title='Chat' icons={icons}/>
            <ChatList/>
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
      }
})

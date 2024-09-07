import Header from "@/components/Header";
import { SafeAreaView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import CallList from "./callList/callList";

export default function CallLog() {
    const icons = ['search', 'phone', 'camera']
    return(
        <SafeAreaView style={styles.container}>
            <Header title='Calls' icons={icons}/>
            <CallList/>
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
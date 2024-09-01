import { useAuth } from "@/context/AuthContext";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

export default function HomeSettings() {
    const { logout } = useAuth()
    return(
        <SafeAreaView style={styles.container}>
            <Pressable onPress={logout}>
                <Text>signout</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
import { Text, View, StyleSheet } from "react-native";

// find out how many new messages are available
export default function NewMessage(props: any) {
    const { newMessage } = props
    return(
        <View style={styles.container}>
            <Text style={{color: 'white'}} >4</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        width: 20,
        backgroundColor: '#33d473',
        borderRadius: 30,
        marginLeft: 15
    }
})
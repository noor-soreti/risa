import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Header(props: any) {
    const {title, icons, back} = props    

    return(
        <View style={styles.header}>
            <Text style={{fontWeight: 'bold', fontSize: 20}} >{title}</Text>
            <View style={styles.headerOptions}>
            {
                icons.map((name) => (
                    <Pressable onPress={() => console.log(name)}>
                        <FontAwesome name={name} size={20}/>
                    </Pressable>
                ))
            }
            </View>
        </View>
    )
}
// thank you for the help, was my question clear enough or are there any improvements i should make to my question 
const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        padding: 10,
        justifyContent: 'space-between'
    },
    headerOptions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    }
})
// import { CustomSwitch } from "@/components/CustomSwitch";
// import { ToggleButton } from "@/components/ToggleButton";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable, Image, Animated, TouchableOpacity } from "react-native";

export default function CallList() {  
    const [leftButtonActive, setLeftButtonActive] = useState(true)
    const username = 'Jane Doe'
    return(
        <View style={styles.container}>
            <View style={styles.toggleContainer}>
            </View>

            {/* change to ListView */}
            <View style={styles.callList}>
                <Pressable onPress={() => console.log(`calling ${username}`)} style={styles.callItem}>
                    <View style={styles.callerInfo}>
                        <Image source={require('../../../../assets/images/avatar.png')} style={styles.image} />
                        <Text style={{marginLeft: 15, fontWeight: 600}}>Jane Doe</Text>
                    </View>
                    <View style={styles.callInfo}>
                        <Text>Today</Text>
                        <Text style={{color: 'red'}} >Incomming</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 15,
        gap: 15
    },
    toggleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      },
    callList: {
        display: 'flex',
        // padding: 5,
        gap: 6,
    },
    callItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#f7f4f4',
        borderRadius: 10,
        borderColor: 'white'
    }, 
    callerInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    callInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    }, 
    image: {
        width: 40, 
        height: 40, 
        backgroundColor: '#7CA4FC',
        borderRadius: 30,
        cursor: 'pointer'
    },
})
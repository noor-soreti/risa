import { Client, Stomp, Versions } from "@stomp/stompjs"
import 'text-encoding-polyfill';

// 1. init stompClient w/brokerURL -> path where websocket server awaits for connections
export const stompClient = new Client({    
    brokerURL: "ws://192.168.100.29:8080/websocket",
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    forceBinaryWSFrames: true,
    appendMissingNULLonIncoming: true,
})

// 2. client subscribes to /topic/greeting destination which is where server will publish greeting messages
// 2.1 once greeting message is received on that destination, it will append a paragraph element to DOM to display greeting message
stompClient.onConnect = (frame) => {
    stompClient.subscribe('/topic/chat', (greeting) => {
        console.log(JSON.parse(greeting.body).content);
    })
}

stompClient.onStompError = (error) => {
    console.log(error)
}
stompClient.onWebSocketError = (error) => {
    console.log(error)
}

stompClient.onDisconnect = () => {
    console.log("DISCONNECT");
}

stompClient.debug = (str) => {
    console.log(str)
}

stompClient.beforeConnect = () => {
    console.log('BEBE');    
}

// 3. retrieves text entered by user and uses STOMP client to send it to /app/hello destination (where GreetingController.greeting will received it)
export const sendMessage = (message: ISendMessage, chatlogId: number) => {
    stompClient.publish({
        destination: `/app/chatlog/${chatlogId}`,
        body: JSON.stringify(message)
    })
}
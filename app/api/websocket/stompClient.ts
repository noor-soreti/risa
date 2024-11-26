import { Client, Stomp } from "@stomp/stompjs"
import 'text-encoding-polyfill';

let stompClient: Client | null = null;

export const initializeStompClient = (roomId: number, onMessageReceivedCallBack: () => void) => {
    stompClient = new Client({    
        brokerURL: "ws://192.168.100.29:8080/websocket",
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
    })
    stompClient.onConnect = (frame) => {
        const topic = `/topic/chat-${roomId}`
        onMessageReceivedCallBack()  // update component when message is received
    }
    stompClient.onStompError = (error) => {
        console.log(error)
    }
    stompClient.onWebSocketError = (error) => {
        console.log(error)
    }

    stompClient.onDisconnect = () => {
        console.log("DISCONNECT");        
        stompClient = null
    }

    stompClient.debug = (str) => {
        console.log(str)
    }

    stompClient.beforeConnect = () => {
        console.log('BEBE');    
    }
    stompClient.activate()
}

export const deactivateStompClient = () => {
    stompClient?.deactivate()
}

export const subscribeToTopic = (roomId: string, messageHandler: (message:any) => void) => {
    if (stompClient) {
        stompClient.subscribe(`/topic/chat-${roomId}`, (message) => {
            console.log("Message received: " + message.body);
            messageHandler(JSON.parse(message.body))
        })
    }
}

export const sendMessage = (roomId: number, message: ISendMessage) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: `/app/chatlog/${roomId}`,
            body: JSON.stringify(message)
        })
    }
}
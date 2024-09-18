import { useEffect } from "react";
import useConversation from "../../store/useConversation";
import { useSocketContext } from "../context/SocketContext"
import notificationSound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
 const {socket} = useSocketContext();
 const {messages,setMessages} = useConversation();
 
 useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
        newMessage.shouldShake = true;
        const sound = new Audio();
        sound.play();
        setMessages([...messages,newMessage]);
    })

    return ()=> socket.off("newMessage");
 },[socket,messages,setMessages])
}

export default useListenMessages
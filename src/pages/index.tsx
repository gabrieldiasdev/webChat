import Head from "next/head";
import styles from './Home.module.scss';
import Header from "@/components/Header";
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import { Message } from "@/types/Message.type";
import { GetServerSideProps } from "next";
import { useApi } from "@/libs/useApi";
import { useState } from "react";

export default function Home(data: Props) {
    const [newMessages, setNewMessages] = useState<Message[]>(data.messages);
    
    function handleSendNewMessage(message: Message) {
        setNewMessages([...newMessages, message]);
    }

    return (
        <>
            <Head>
                <title>Home | bc.chat</title>
            </Head>

            <div className={styles.container}>
                <Header 
                    status="online"
                    lastSeen={new Date()}
                />
                <Chat 
                    messages={newMessages}
                />
                <ChatInput
                    handleSendMessage={handleSendNewMessage} 
                />
            </div>
        </>
    );
}

type Props = {
    messages: Message[];
};

export const getServerSideProps: GetServerSideProps = async () => {
    const api = useApi();

    const messages = await api.getAllMessages();
    
    return {
        props: {
            messages,
        },
    };
};
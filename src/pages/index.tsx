import Head from "next/head";
import styles from './Home.module.scss';
import Header from "@/components/Header";
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import { Message } from "@/types/Message.type";
import { GetServerSideProps } from "next";
import { useApi } from "@/libs/useApi";
import { useEffect, useState } from "react";
import { Status } from "@/types/Status.type";

export default function Home(data: Props) {
    const [newMessage, setNewMessage] = useState<Message>();
    const [messagesArray, setMessagesArray] = useState<Message[]>(data.messages);
    const [status, setStatus] = useState<Status>(Status.ONLINE);

    useEffect(() => {
        if(newMessage) {
            setMessagesArray([...messagesArray, newMessage])
        };
    }, [newMessage]);

    function sendMessage(message: Message) {
        setNewMessage(message);

        generateResponse(message.text);
    };

    async function generateResponse(requestMessage: string) {
        const response = await fetch('/api/gpt3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ prompt: requestMessage }),
        });

        if (!response.ok) {
            setStatus(Status.OFFLINE);

            setNewMessage({
                sentDate: new Date().toISOString(),
                text: 'Não estou disponivel no momento!',
                sent: false,
                messageAuthor: 'Cecilia',
            });

            return;
        };

        setStatus(Status.TYPING);

        const data = response.body;
        if (!data) {
            setNewMessage({
                sentDate: new Date().toISOString(),
                text: 'Não sei te responder!',
                sent: false,
                messageAuthor: 'Cecilia',
            });

            return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();

        let done = false;
        let fullResponse = '';
        
        while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            const chunkValue = decoder.decode(value);
            fullResponse = fullResponse + chunkValue;
        };

        setNewMessage({
            sentDate: new Date().toISOString(),
            text: fullResponse,
            sent: false,
            messageAuthor: 'Cecilia',
        });

        setStatus(Status.ONLINE);
    };

    return (
        <>
            <Head>
                <title>Web Chat</title>
            </Head>

            <div className={styles.container}>
                <Header 
                    status={status}
                    lastSeen={new Date()}
                />
                <Chat
                    messages={messagesArray}
                />
                <ChatInput
                    sendMessage={sendMessage}
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
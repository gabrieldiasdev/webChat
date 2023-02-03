import { Message } from '@/types/Message.type';
import MessageBox from '../MessageBox';
import styles from './Chat.module.scss';
import { RefObject, useEffect, useRef } from 'react';

interface ChatProps {
    messages: Message[];
}

export default function Chat({ messages }: ChatProps) {
    const divRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
      if (divRef.current) {
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }
    }, [messages]);

    return (
        <div className={styles.container} ref={divRef}>
            {messages.map(((message, index) => {
                return (
                    <MessageBox
                        key={index}
                        message={message}
                    />
                );
            }))}
        </div>
    );
}
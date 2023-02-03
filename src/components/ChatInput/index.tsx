import { PaperPlaneRight } from 'phosphor-react';
import styles from './ChatInput.module.scss';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Message } from '@/types/Message.type';

interface ChatInputProps {
    sendMessage: (message: Message) => void;
}

export default function ChatInput({ sendMessage }: ChatInputProps) {
    const [message, setMessage] = useState('');

    function handleMessageChange(e: ChangeEvent<HTMLInputElement>) {
        setMessage(e.target.value);
    };

    function handleSendMessage() {
        if(message.length < 1) {
            return;
        };

        sendMessage({
            text: message,
            sentDate: new Date().toISOString(),
            sent: true,
        });
        setMessage('');
    };
    
    return (
        <div className={styles.container}>
            <input 
                type="text" 
                placeholder='Digite sua mensagem'
                value={message}
                onChange={(e) => handleMessageChange(e)}
                onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()} 
            />
            <PaperPlaneRight
                size={24} 
                color="#E1E1E6" 
                weight="fill" 
                className={styles.inputButton}
                onClick={handleSendMessage}
            />
        </div>
    );
}
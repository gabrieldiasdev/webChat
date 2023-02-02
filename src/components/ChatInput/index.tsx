import { PaperPlaneRight } from 'phosphor-react';
import styles from './ChatInput.module.scss';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Message } from '@/types/Message.type';

interface ChatInputProps {
    handleSendMessage: (message: Message) => void;
}

export default function ChatInput({ handleSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState('');

    function handleMessageChange(e: ChangeEvent<HTMLInputElement>) {
        setMessage(e.target.value);
    };

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter') {
            if(message.length < 1) {
                return;
            };

            handleSendMessage({
                text: message,
                sentDate: new Date().toISOString(),
                sent: true,
            });
        };
    };

    function handleSendClick() {
        if(message.length < 1) {
            return;
        };

        handleSendMessage({
            text: message,
            sentDate: new Date().toISOString(),
            sent: true,
        });
    };
    
    return (
        <div className={styles.container}>
            <input 
                type="text" 
                placeholder='Digite sua mensagem'
                onChange={(e) => handleMessageChange(e)}
                onKeyUp={(e) => handleKeyPress(e)} 
            />
            <PaperPlaneRight
                size={24} 
                color="#E1E1E6" 
                weight="fill" 
                className={styles.inputButton}
                onClick={handleSendClick}
            />
        </div>
    );
}
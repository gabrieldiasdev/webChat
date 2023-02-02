import { Message } from '@/types/Message.type';
import MessageBox from '../MessageBox';
import styles from './Chat.module.scss';

interface ChatProps {
    messages: Message[];
}

export default function Chat({ messages }: ChatProps) {
    return (
        <div className={styles.container}>
            {messages.map((message => {
                return (
                    <MessageBox
                        message={message}
                    />
                );
            }))}
        </div>
    );
}
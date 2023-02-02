import { Message } from '@/types/Message.type';
import styles from './MessageBox.module.scss';

interface MessageBoxProps {
    message: Message;
}

export default function MessageBox({ message }: MessageBoxProps) {
    const sentDateFormated = new Date(message.sentDate).toLocaleString('pt-br', { hour: '2-digit', minute: '2-digit' });

    return (
        <div 
            className={styles.container}
            style={{ alignItems: message.sent ? 'flex-end' : 'flex-start' }}
        >
            <div className={styles.messageInfo}>
                <p>
                    {message.sent ? 'Você' : message.messageAuthor} - {sentDateFormated}
                </p>
            </div>
            <div
                className={styles.messageContainer}
                style={{ 
                    backgroundColor: message.sent ? '#07847E' : '#633BBC',
                    borderRadius: message.sent ? '8px 8px 0px 8px' : '0px 8px 8px 8px'
                }}
            >
                <p>
                    {message.text}
                </p>
            </div>
        </div>
    );
}
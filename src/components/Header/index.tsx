import styles from './Header.module.scss';
import botPicture from '../../../public/images/botPicture.png';
import Image from 'next/image';
import { X } from 'phosphor-react';
import { useRouter } from 'next/router';
import { Status } from '@/types/Status.type';

interface HeaderProps {
    status: Status;
    lastSeen: Date;
}

export default function Header({ status, lastSeen }: HeaderProps) {
    const router = useRouter();

    const lastSeenFormated = lastSeen.toLocaleString('pt-br', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={styles.container}>
            <div className={styles.topContent}>
                <div className={styles.userInfos}>
                    <div className={styles.userImageBox}>
                        <Image
                            src={botPicture}
                            alt='Bot Picture'
                            className={styles.userImage}
                        />
                    </div>
                    <div className={styles.userInfoTextBox}>
                        <h2>
                            Bot Cecilia
                        </h2>
                        <div className={styles.statusContainer}>
                            <div 
                                className={styles.statusDot}
                                style={{ backgroundColor: status === Status.ONLINE ? '#00B37E' : status === Status.TYPING ? '#b38900' : '#B30000' }}
                            ></div>
                            <p style={{ color: status === Status.ONLINE ? '#00B37E' : status === Status.TYPING ? '#b38900' : '#B30000' }}>
                                {status === Status.TYPING ? 'typing...' : status}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className={styles.closeChat}
                    onClick={() => router.reload()}
                >
                    <X size={16} color="#E1E1E6" weight="bold" />
                </div>
            </div>
            <div className={styles.bottomContent}>
                <p>
                    Última Visita: {lastSeenFormated}
                </p>
            </div>
        </div>
    );
}
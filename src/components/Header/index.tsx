import styles from './Header.module.scss';
import userPicture from '../../../public/images/userPicture.png';
import Image from 'next/image';
import { X } from 'phosphor-react';

interface HeaderProps {
    status: 'online' | 'offline';
    lastSeen: Date;
}

export default function Header({ status, lastSeen }: HeaderProps) {
    const lastSeenFormated = lastSeen.toLocaleString('pt-br', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

    return (
        <div className={styles.container}>
            <div className={styles.topContent}>
                <div className={styles.userInfos}>
                    <div className={styles.userImageBox}>
                        <Image
                            src={userPicture}
                            alt='User Picture'
                            className={styles.userImage}
                        />
                    </div>
                    <div className={styles.userInfoTextBox}>
                        <h2>
                            Cecilia Sassaki
                        </h2>
                        <div className={styles.statusContainer}>
                            <div 
                                className={styles.statusDot}
                                style={{ backgroundColor: status === 'online' ? '#00B37E' : '#B30000' }}
                            ></div>
                            <p style={{ color: status === 'online' ? '#00B37E' : '#B30000' }}>
                                {status}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.closeChat}>
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
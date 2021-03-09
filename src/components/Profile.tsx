import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level, totalXP } = useContext(ChallengesContext);
    
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/rafa1st.png" alt="Rafael Rolim" />
            <div>
                <strong>Rafael Rolim</strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Nível: {level}
                </p>
                <p>
                    Experiência total: {totalXP} xp
                </p>
            </div>
        </div>
    );
}
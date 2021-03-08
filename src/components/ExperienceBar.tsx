import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
    const { currentXP, xpToNextLvl }= useContext(ChallengesContext)
    const percentToNextLvl = Math.round((currentXP * 100) / xpToNextLvl);
    
    return (
        <header className={styles.experienceBar}>
            <span>{currentXP} xp</span>
            <div>
                <div style={{ width: `${percentToNextLvl}%` }} />

                <span className={styles.currentExperience} style={{ left: `${percentToNextLvl}%` }}>
                    {percentToNextLvl}%
                </span>
            </div>
            <span>{xpToNextLvl} xp</span>
        </header>
    )

}
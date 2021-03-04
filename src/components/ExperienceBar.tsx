import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
    const { currentXP, xpToNextLvl }= useContext(ChallengesContext)
    const percentToNextLvl = Math.round((currentXP * 100) / xpToNextLvl);
    
    return (
        <header className={styles.experienceBar}>
            <span>{percentToNextLvl} %</span>
            <div>
                <div style={{ width: `${percentToNextLvl}%` }} />

                <span className={styles.currentExperience} style={{ left: `${percentToNextLvl}%` }}>
                    Experiencia atual: {currentXP} xp
                </span>                
            </div>
            <span>{xpToNextLvl} xp</span>
        </header>
    )

}
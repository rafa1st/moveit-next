import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentXP: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    xpToNextLvl: number;
    totalXP: number;
    leveUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentXP: number;
    totalXP: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest } : ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentXP, setCurrentXP] = useState(rest.currentXP ?? 0);
    const [totalXP, setTotalXP] = useState(rest.totalXP ?? 0);
    const [challengesCompleted, setChallengesComplete] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    
    //math to calculate xpToLevelUP
    const xpToNextLvl = Math.pow((level + 1) * 4, 2);
    
    useEffect(()=>{
        Cookies.set('level', String(level));
        Cookies.set('currentXP', String(currentXP));
        Cookies.set('totalXP', String(totalXP));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentXP, totalXP, challengesCompleted]);
    
    useEffect(() =>{
        Notification.requestPermission();
    }, []);

    function leveUp() {
      setLevel(level + 1);
      setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge () {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!!!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);    
    }

    function completeChallenge () {
        if (!activeChallenge) {
            return ;
        }                        
            const { amount } = activeChallenge;
            
            let challengeXP = totalXP + amount;
            let finalXP = currentXP + amount;

        if (finalXP >= xpToNextLvl) {
        finalXP = finalXP - xpToNextLvl;
        leveUp();
        }

        setCurrentXP(finalXP);
        setTotalXP(challengeXP);
        setActiveChallenge(null);
        setChallengesComplete(challengesCompleted + 1);
    }
    
    return (
        <ChallengesContext.Provider value={{
            level,
            currentXP,
            totalXP,
            challengesCompleted,
            activeChallenge,
            xpToNextLvl,
            leveUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal
            }}>
            {children}

            { isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}
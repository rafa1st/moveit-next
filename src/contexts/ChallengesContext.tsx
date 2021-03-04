import { createContext, useState, ReactNode, useEffect } from 'react'
import challenges from '../../challenges.json'

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
    leveUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children } : ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentXP, setCurrentXP] = useState(0);
    const [challengesCompleted, setChallengesComplete] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const xpToNextLvl = Math.pow((level + 1) * 4, 2);
    
    useEffect(() =>{
        Notification.requestPermission();

    }, []);
    
    function leveUp() {
      setLevel(level + 1);
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

            let finalXP = currentXP + amount;

        if (finalXP >= xpToNextLvl) {
        finalXP = finalXP - xpToNextLvl;
        leveUp();
        }

        setCurrentXP(finalXP);
        setActiveChallenge(null);
        setChallengesComplete(challengesCompleted + 1);
    }
    
    return (
        <ChallengesContext.Provider value={{
            level,
            currentXP,
            challengesCompleted,
            activeChallenge,
            xpToNextLvl,
            leveUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    );
}
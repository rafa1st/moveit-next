import Head from 'next/head'
import { GetServerSideProps } from 'next'

//components
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';

//styles css
import styles from '../styles/pages/Home.module.css';

//content provider
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentXP: number;
  totalXP: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
    
  return (
      <ChallengesProvider
        level={props.level}
        currentXP={props.currentXP}
        totalXP={props.totalXP}
        challengesCompleted={props.challengesCompleted}
      >
        <div className={styles.container}>
          <Head>
            <title> Início | Move.it</title>
          </Head>

        <ExperienceBar />

        <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, currentXP, totalXP, challengesCompleted} = ctx.req.cookies;
  
  return {
    props: {
      level: Number(level),
      currentXP: Number(currentXP),
      totalXP: Number(totalXP),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
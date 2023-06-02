import getCurrentUser from "@/actions/getCurrentUser";
import Exercises from "@/components/exercise/Exercises";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";

import WorkoutPlan from "@/components/workout/WorkoutPlan";
import ToasterProvider from "@/providers/ToasterProvider";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>FitGenLive.com</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToasterProvider />
      <RegisterModal />
      <LoginModal />

      <Exercises />
      <WorkoutPlan />
    </>
  );
}

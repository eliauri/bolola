import React, { useEffect } from 'react'
import Collection from '../../../components/account/collection/Collection';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import Head from 'next/head';


export default function Account() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/signin');
    }
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>Коллекция боликов - Болола</title>
        <meta name="description" content="Собери полную коллецию боликов и получи орден - супер редкий болик" />
      </Head>
      <Collection />
    </>
  )
}


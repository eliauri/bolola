import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import Profile from '../../components/account/profile/Profile';



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
        <title>Личный кабинет - Болола</title>
        <meta name="description" content="" />
      </Head>
    <Profile/>
    </>
  )
}


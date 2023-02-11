import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import AuthLayout from '../../components/layout/AuthLayout'
import Registration from '../../components/auth/Registration'
import Head from 'next/head';

export default function Auth() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/account');
    }
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>Регистрация - Болола</title>
        <meta name="description" content="Авторизируйтесь в личном кабинете Bolola" />
      </Head>
      <Registration />
    </>
  )
}

Auth.getLayout = function getLayout(page) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}
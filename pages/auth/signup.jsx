import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import AuthLayout from '../../components/layout/AuthLayout'
import Registration from '../../components/auth/Registration'

 

export default function Auth() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);
  return (
  <Registration/>
  )
}

Auth.getLayout = function getLayout(page) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}
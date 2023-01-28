import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Profile from '../../components/account/profile';
import { useSelector } from 'react-redux'


export default function Account() {
  // const { auth } = UseAuth();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/signin');
    }
  }, [isLoggedIn]);
    
  return (
    <Profile /> 
  )
}


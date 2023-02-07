/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Html5Qrcode } from "html5-qrcode"
import Container from '../../components/Container'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import HeaderLayout from '../../components/layout/HeaderLayout'
import AddBolik from '../../components/addbolik/AddBolik';




export default function Skaner() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/signin');
    }
  }, [isLoggedIn]);

  return (
   <AddBolik/>
  )

}

Skaner.getLayout = function getLayout(page) {
  return (
    <HeaderLayout>
      {page}
    </HeaderLayout>
  )
}
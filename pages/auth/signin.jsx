import React from 'react'
import Login from '../../components/auth/Login'
import AuthLayout from '../../components/layout/AuthLayout'

export default function Auth() {
  return (
    <Login/>
  )
}

Auth.getLayout = function getLayout(page) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}
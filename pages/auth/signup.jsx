import React from 'react'
import Registration from '../../components/auth/Registration'

import AuthLayout from '../../components/layout/AuthLayout'

export default function Auth() {
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
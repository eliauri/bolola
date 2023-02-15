import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Login from '../../components/auth/Login'
import ResetPassword from '../../components/auth/ResetPassword';
import AuthLayout from '../../components/layout/AuthLayout'

export default function Password() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.back();
        }
    }, [isLoggedIn]);

    return (
        <>
        <ResetPassword/>
        </>
    )
}


Password.getLayout = function getLayout(page) {
    return (
        <AuthLayout>
            {page}
        </AuthLayout>
    )
}
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
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
            <Head>
                <title>Смена пароля - Болола</title>
                <meta name="description" content="Авторизируйтесь в личном кабинете Bolola" />
            </Head>
            <ResetPassword />
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
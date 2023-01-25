import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import cl from 'classnames'
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";
import s from './auth.module.scss'
import { useDispatch } from 'react-redux'
import { setCredetianals } from '../../store/authSlice'

import { useLoginMutation } from '../../store/authApiSlice'

import eye from '../../public/eye.svg'
import eyeClose from '../../public/eyeClose.svg'



const Login = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onBlur' });

  const [passwordVisible, setVisiblePassword] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const userData = await login(data).unwrap();
      dispatch(setCredetianals({ ...userData }))
      router.push({
        pathname: '/account',
      })
    } catch (err) {
      console.log(err)
      if (!err?.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 401) {
        setErrMsg(err.data.detail);
      } else {
        setErrMsg('Login Failed');
      }
    }
  }

  return (
    <>
      <h1 className={s.auth__title}>Войдите в аккаунт, <br />чтобы добавить болик</h1>
      {
        errMsg ? <p className={s.auth__serverError}>{errMsg}</p> : ''
      }
      <form className={s.auth__form} onSubmit={handleSubmit(onSubmit)}>
        {/* <div className={s.auth__inputLine}>
        <label htmlFor="tel">
          Телефон:
        </label>
        <Controller
          name="tel"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChange={onChange}
              rules={{
                validate: (value) => isValidPhoneNumber(value),
              }}
              defaultCountry='RU'
              id="tel"
            />
          )}
        />
      </div> */}
        <div className={s.auth__inputLine}>
          <label htmlFor="email">
            Почта:
          </label>
          <input
            type="mail"
            id="mail"
            className={cl({ [s.auth__inputError]: errors.mail })}
            {...register('email',
              { required: 'Введите вашу почту' },
            )}
          />
          {errors.mail && (<p className={s.auth__textError}>{errors.mail.message}</p>)}
        </div>
        <div className={s.auth__inputLine}>
          <label htmlFor="password">
            Пароль:
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            className={cl({ [s.auth__inputError]: errors.password })}
            {...register('password',
              {
                required: 'Введите пароль',
              },
            )}
            autoComplete="on"
          />
          <Image src={passwordVisible ? eyeClose : eye} alt='Показать пароль' onClick={() => setVisiblePassword(!passwordVisible)} />
          {errors.password && (<p className={s.auth__textError}>{errors.password.message}</p>)}
        </div>
        <button disabled={false}>Войти</button>
      </form>
      <p className={s.auth__reference}>Нет аккаунта?{<Link href={'/auth/signup'} className={s.auth__blueLink}> Зарегистрироваться</Link>}</p>
      <p className={s.auth__reference}>{<Link href={'/auth'}>Забыли пароль?</Link>}</p>
    </>
  )
}

export default Login


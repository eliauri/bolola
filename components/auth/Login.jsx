import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import cl from 'classnames'
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";
import s from './auth.module.scss'
import eye from '../../public/eye.svg'
import eyeClose from '../../public/eyeClose.svg'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../button/Button'
import { login } from '../../store/auth/auth-slice'

const Login = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onBlur' });
  const [passwordVisible, setVisiblePassword] = useState(false);
  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(login(data));
  }

  return (
    <>
      <h1 className={s.auth__title}>Войдите в аккаунт, <br />чтобы добавить болик</h1>
      {
        error ? <p className={s.auth__serverError}>{error}</p> : ''
      }
      <form className={s.auth__form} onSubmit={handleSubmit(onSubmit)}>

        <div className={s.auth__inputLine}>
          <label htmlFor="phone">
            Телефон:
          </label>
          <Controller
            name="phone"
            control={control}
            rules={{
              validate: value => isValidPhoneNumber(String(value)) || 'Некорректный номер телефона'
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                rules={{
                  validate: (value) => isValidPhoneNumber(value),
                }}
                defaultCountry='RU'
                id="phone"
                className={cl({ [s.auth__inputError]: errors.phone })}
              />
            )}
          />
          {errors.tel && (<p className={s.auth__textError}>{errors.tel.message}</p>)}
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
        <Button>Войти</Button>
      </form>
      <p className={s.auth__reference}>Нет аккаунта?{<Link href={'/auth/signup'} className={s.auth__blueLink}> Зарегистрироваться</Link>}</p>
      <p className={s.auth__reference}>{<Link href={'/auth/password'}>Забыли пароль?</Link>}</p>
    </>
  )
}

export default Login


import Image from 'next/image'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import React, { useState } from 'react'
import Container from '../../components/Container'
import EmptyLayout from '../../components/layout/EmptyLayout'
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";



import logo from '../../public/logoWhite.svg'
import s from '../../styles/auth.module.scss'

import eye from '../../public/eye.svg'
import eyeClose from '../../public/eyeClose.svg'
import cl from 'classnames'


export default function Auth() {
  const { register, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onBlur' });

  const [passwordVisible, setVisiblePassword] = useState(false);

  // console.log(errors);
  const onSubmit = data => {
    console.log(data);
  }
  return (
    <section className={s.auth}>
      <Container>
        <div className={s.auth__wrapper}>
          <Link href={'/'} className={s.auth__logo}>
            <Image src={logo} alt="логотип" height={35} width={162} />
          </Link>
          <div className={s.auth__window}>
            <h1 className={s.auth__title}>Войдите в аккаунт, чтобы добавить болик</h1>
            <form className={s.auth__form} onSubmit={handleSubmit(onSubmit)}>
              <div className={s.auth__inputLine}>
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
            <p className={s.auth__reference}>Нет аккаунта?{<Link href={'/registration'} className={s.auth__blueLink}> Зарегистрироваться</Link>}</p>
            <p className={s.auth__reference}>{<Link href={'/auth'}>Забыли пароль?</Link>}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

Auth.getLayout = function getLayout(page) {
  return (
    <EmptyLayout>
      {page}
    </EmptyLayout>
  )
}
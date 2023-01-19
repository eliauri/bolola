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
            <h1 className={s.auth__title}>Зарегистрируйте личный аккаунт
              и собирайте болики</h1>
            <form className={s.auth__form} onSubmit={handleSubmit(onSubmit)}>
              <div className={s.auth__inputLine}>
                <label htmlFor="tel">
                  Телефон:
                </label>
                <Controller
                  name="tel"
                  control={control}
                  rules={{
                    validate:  value => isValidPhoneNumber(String(value)) || 'Некорректный номер телефона'
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      onChange={onChange}
                      rules={{
                        validate: (value) => isValidPhoneNumber(value),
                      }}
                      defaultCountry='RU'
                      id="tel"
                      className={cl({ [s.auth__inputError]: errors.tel })}
                    />
                  )}
                />
                {errors.tel && (<p className={s.auth__textError}>{errors.tel.message}</p>)}
              </div>
              <div className={s.auth_flexLine}>
                <div className={s.auth__inputLine}>
                  <label htmlFor="firstname">
                    Имя:
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className={cl({ [s.auth__inputError]: errors.firstname })}
                    {...register('firstname',
                      {
                        required: 'Это обязательное поле',
                        minLength: { value: 3, message: 'Имя слишком короткое' }
                      })}
                  />
                  {errors.firstname && (<p className={s.auth__textError}>{errors.firstname.message}</p>)}
                </div>
                <div className={s.auth__inputLine}>
                  <label htmlFor="lastname">
                    Фамилия:
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className={cl({ [s.auth__inputError]: errors.lastname })}
                    {...register('lastname',
                      {
                        required: 'Это обязательное поле',
                        pattern: {
                          value: /[а-яА-ЯёЁa-zA-Z0-9]/,
                          message: 'Не используйте числа и символы в имени'
                        },
                        minLength: { value: 3, message: 'Имя слишком короткое' }
                      })}
                  />
                  {errors.lastname && (<p className={s.auth__textError}>{errors.lastname.message}</p>)}
                </div>
              </div>
              <div className={s.auth__inputLine}>
                <label htmlFor="mail">
                  Почта:
                </label>
                <input
                  type="email"
                  id="mail"
                  className={cl({ [s.auth__inputError]: errors.mail })}
                  {...register('mail',
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
                      pattern: {
                        value: /(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]/,
                        message: 'Пароль не может состоять только из цифр и символов'
                      },
                      minLength: { value: 8, message: 'Пароль должен содержать минимум 8 символов' }
                    },
                  )}
                  autoComplete="on"
                />
                <Image src={passwordVisible ? eyeClose : eye} alt='Показать пароль' onClick={() => setVisiblePassword(!passwordVisible)} />
                {errors.password && (<p className={s.auth__textError}>{errors.password.message}</p>)}
              </div>

              <button disabled={false}>Зарегистрироваться</button>
            </form>
            <p className={s.auth__reference}>Уже есть аккаунт? {<Link href={'/auth'} className={s.auth__blueLink}>Войти</Link>}</p>
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
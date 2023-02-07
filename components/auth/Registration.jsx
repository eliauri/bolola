import React, { useState } from 'react'
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";
import Image from 'next/image'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import s from './auth.module.scss'
import axios from '../../pages/api/axios';
import eye from '../../public/eye.svg'
import eyeClose from '../../public/eyeClose.svg'
import cl from 'classnames'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/auth/action-creators';
import { setCookie } from "cookies-next";
import Button from '../button/Button';

const Registration = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onBlur' });
  const [errMsg, setErrMsg] = useState();
  const [passwordVisible, setVisiblePassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const login = async (data) => {
    try {
      const response = await axios.post('/user/login/',
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      dispatch(loginUser());
      setCookie('accessToken', response?.data.access, {maxAge: 2629743});
      setCookie('refreshToken', response?.data.refresh,{maxAge: 2629743});
      router.push({
        pathname: '/account',
      })
    } catch (err) {
      console.log(err)
      setErrMsg('Ошибка сервера');
    }
  }

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/user/create',
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setErrMsg('');
      login({phone: data.tel, password: data.password});
    } catch (err) {
      console.log(err);
      if (err?.response?.data.email) {
        setErrMsg(err.response.data?.email);
      } else {
        if (err?.response?.data?.phone) {
          setErrMsg(err.response.data.phone);
        }
      }

    }
  }

  return (
    <>
      <h1 className={s.auth__title}>Зарегистрируйте личный аккаунт
        и собирайте болики</h1>
      {
        errMsg ? <p className={s.auth__serverError}>{errMsg}</p> : ''
      }
      <form className={s.auth__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.auth__inputLine}>
          <label htmlFor="tel">
            Телефон:
          </label>
          <Controller
            name="tel"
            control={control}
            rules={{
              validate: value => isValidPhoneNumber(String(value)) || 'Некорректный номер телефона'
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
                  minLength: { value: 2, message: 'Имя слишком короткое' }
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
                  minLength: { value: 2, message: 'Имя слишком короткое' }
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
        <Button>Зарегистрироваться</Button>
      </form>
      <p className={s.auth__reference}>Уже есть аккаунт? {<Link href={'/auth/signin'} className={s.auth__blueLink}>Войти</Link>}</p>
    </>
  )
}

export default Registration
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";
import cl from 'classnames'
import Image from 'next/image'

import AccountNav from '../AccountNav'
import Container from '../../Container'

import s from './profile.module.scss'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Button from '../../button/Button';


// import eye from '../../public/eyeGreen.svg'
// import eyeClose from '../../public/eyeCloseGreen.svg'



const Profile = () => {
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState();
   
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axiosPrivate.get('/user/current-user-info/');
                setData(response.data);
            } catch (err) {
                console.error(err);
            }
            return () => {

            }
        }
        getData();
    },[]);

    const values = {
        firstname: data?.first_name,
        lastname: data?.last_name,
        tel: data?.phone,
        mail: data?.email,
    }


    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onChange',
        defaultValues: {
            firstname: '',
            lastname: '',
            tel: '',
            mail: '',
        },
        values
    });

    const [passwordVisible, setVisiblePassword] = useState(false);

    const onSubmit = async (data) => {
        console.log(data);
        try{
            const responce = await axiosPrivate.put('/user/update/', data);
        } catch (err)  {
            console.log(err)
        }
        
    }

    return (
        <section className={s.account} >
            <Container>
                <AccountNav />
                <h1 className={s.account__title}>Мои данные</h1>
                <form className={s.account__form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.account__grid}>
                        <div className={s.account__inputLine}>
                            <label htmlFor="firstname">
                                Имя:
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                className={cl({ [s.account__inputError]: errors.firstname })}
                                {...register('firstname',
                                    {
                                        required: 'Это обязательное поле',
                                        minLength: { value: 3, message: 'Имя слишком короткое' }
                                    })}

                            />
                            {errors.firstname && (<p className={s.account__textError}>{errors.firstname.message}</p>)}
                        </div>
                        <div className={s.account__inputLine}>
                            <label htmlFor="lastname">
                                Фамилия:
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                className={cl({ [s.account__inputError]: errors.lastname })}
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
                            {errors.lastname && (<p className={s.account__textError}>{errors.lastname.message}</p>)}
                        </div>
                        <div className={s.account__inputLine}>
                            <label htmlFor="mail">
                                Почта:
                            </label>
                            <input
                                type="email"
                                id="mail"
                                className={cl({ [s.account__inputError]: errors.mail })}
                                {...register('mail',
                                    { required: 'Введите вашу почту' },
                                )}
                            />
                            {errors.mail && (<p className={s.account__textError}>{errors.mail.message}</p>)}
                        </div>
                        <div className={s.account__inputLine}>
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
                                        className={cl({ [s.account__inputError]: errors.tel })}
                                    />
                                )}
                            />
                            {errors.tel && (<p className={s.account__textError}>{errors.tel.message}</p>)}
                        </div>
                        {/* <div className={s.account__inputLine}>
                            <label htmlFor="password">
                                Пароль:
                            </label>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                className={cl({ [s.account__inputError]: errors.password })}
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
                            {errors.password && (<p className={s.account__textError}>{errors.password.message}</p>)}
                        </div> */}
                    </div>
                    <Button> Сохранить</Button>
                    {/* <button disabled={false}>Сохранить</button> */}
                </form>
            </Container>
        </section>
    )
}

export default Profile
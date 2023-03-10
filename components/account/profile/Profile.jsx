/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";
import cl from 'classnames'
import Image from 'next/image'
import AccountNav from '../AccountNav/AccountNav'
import Container from '../../Container'
import s from './profile.module.scss'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Button from '../../button/Button';
import Password from './Password';

const Profile = () => {
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axiosPrivate.get('/user/current-user-info/');
                setData(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        getData();
    }, []);

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
    const onSubmit = async (data) => {
        try {
            const responce = await axiosPrivate.put('/user/update/', data);
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <section className={s.account} >
            <Container >
                <AccountNav />
                <h1 className={s.title}>Мои данные</h1>
                {!isLoading ?
                <>
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.grid}>
                        <div className={s.inputLine}>
                            <label htmlFor="firstname">
                                Имя:
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                className={cl({ [s.inputError]: errors.firstname })}
                                {...register('firstname',
                                    {
                                        required: 'Это обязательное поле',
                                        minLength: { value: 3, message: 'Имя слишком короткое' }
                                    })}

                            />
                            {errors.firstname && (<p className={s.textError}>{errors.firstname.message}</p>)}
                        </div>
                        <div className={s.inputLine}>
                            <label htmlFor="lastname">
                                Фамилия:
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                className={cl({ [s.inputError]: errors.lastname })}
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
                            {errors.lastname && (<p className={s.textError}>{errors.lastname.message}</p>)}
                        </div>
                        <div className={s.inputLine}>
                            <label htmlFor="mail">
                                Почта:
                            </label>
                            <input
                                type="email"
                                id="mail"
                                className={cl({ [s.inputError]: errors.mail })}
                                {...register('mail',
                                    { required: 'Введите вашу почту' },
                                )}
                            />
                            {errors.mail && (<p className={s.textError}>{errors.mail.message}</p>)}
                        </div>
                        <div className={s.inputLine}>
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
                                        disabled={true}
                                        rules={{
                                            validate: (value) => isValidPhoneNumber(value),
                                        }}
                                        defaultCountry='RU'
                                        id="tel"
                                        className={cl({ [s.inputError]: errors.tel })}
                                    />
                                )}
                            />
                            {errors.tel && (<p className={s.textError}>{errors.tel.message}</p>)}
                        </div>
                        <Button>Сохранить</Button>
                    </div>
                </form>
                <Password /> 
                </>
                : <p>Загрузка данных...</p> }
            </Container>
        </section>
    )
}

export default Profile
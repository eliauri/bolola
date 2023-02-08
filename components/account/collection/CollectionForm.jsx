import React, { useState } from 'react'
import Button from '../../button/Button'
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";
import { useForm, Controller } from 'react-hook-form'
import s from './collection.module.scss'
import cl from 'classnames'
import { axiosPrivate } from '../../../pages/api/axios';

const CollectionForm = props => {
    const [message, setMessage] = useState();
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = async (data) => {
        data['collection'] = props.id;
        try {
            const response = await axiosPrivate.post('/finish/', data)
            .then((res) => {
                if (res.status == 200) setMessage(<p className='successMsg'>Поздравляем со сборобом коллекции. <br/>Ожидайте получения суперболика</p>)
            })            
        } catch (err) {
            console.log(err);
            if (err.response.status == 406) setMessage(<p className='errMsg'>Произошла ошибка, попробуйте позже</p>)
        }
        props.refresh();
    }
    return (
        !message ? 
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={s.formTitle}>Введите данные получатели посылки и заберите суперболик</h2>
            <div className={s.inputLine}>
                <label htmlFor="name">
                    Имя и Фамилия:
                </label>
                <input
                    type="text"
                    id="name"

                    {...register('name',
                        {
                            required: 'Это обязательное поле',
                            minLength: { value: 2, message: 'Имя слишком короткое' }
                        })}
                />
                {errors.name && (<p className={s.textError}>{errors.name.message}</p>)}
            </div>

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
                    render={({ field: { onChange, value } }) => (
                        <Input
                            value={value}
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
                {errors.phone && (<p className={s.textError}>{errors.phone.message}</p>)}
            </div>
            <div className={s.inputLine}>
                <label htmlFor="city">
                    Город:
                </label>
                <input
                    type={"text"}
                    id="city"

                    {...register('city',
                        {
                            required: 'Это обязательное поле',

                        },
                    )}
                />
                {errors.city && (<p className={s.textError}>{errors.city.message}</p>)}
            </div>
            <div className={s.inputLine}>
                <label htmlFor="address">
                    Адрес:
                </label>
                <input
                    type={"text"}
                    id="address"
                    className={cl({ [s.inputError]: errors.city })}
                    {...register('address',
                        {
                            required: 'Это обязательное поле',

                        },
                    )}
                />
                {errors.address && (<p className={s.textError}>{errors.address.message}</p>)}
            </div>
            <Button>Отправить</Button>
        </form> :
        message
    )
}

export default CollectionForm
import React from 'react'
import Button from '../../button/Button'
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";
import { useForm, Controller } from 'react-hook-form'
import s from './collection.module.scss'
import cl from 'classnames'
import { axiosPrivate } from '../../../pages/api/axios';

const CollectionForm = props => {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onBlur',
    });
    const onSubmit = async (data) => {
        console.log({
            data: data,
            collection_id: props.id
        })
        
        try {
            const response = await axiosPrivate.post('/finish/', { data: data, collection_id: props.id })
        } catch (err) {
            console.log(err)
        }
    }
    return (


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
                {errors.tel && (<p className={s.textError}>{errors.tel.message}</p>)}
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
                <label htmlFor="adress">
                    Адрес:
                </label>
                <input
                    type={"text"}
                    id="adress"
                    className={cl({ [s.inputError]: errors.city })}
                    {...register('adress',
                        {
                            required: 'Это обязательное поле',

                        },
                    )}
                />
                {errors.adress && (<p className={s.textError}>{errors.adress.message}</p>)}
            </div>
            <Button>Отправить</Button>
        </form>
    )
}

export default CollectionForm
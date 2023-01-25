import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import cl from 'classnames'

import auto from '../../public/authorization.svg'
import s from './header.module.scss';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../store/authSlice';


const User = () => {
 
  const [userAuto, setUserAuto] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const token = useSelector(selectCurrentToken);
  console.log(token);
  
  return (
    <div
      className={s.header__user}
      onMouseEnter={() => setProfileActive(true)}
      onMouseLeave={() => setProfileActive(false)}
      onClick={() => setProfileActive(!profileActive)}
    >
      <Image
        src={auto}
        alt="authorization icon"
      />
      <div className={cl(s.miniProfile, { [s.active]: profileActive })}>
        <div className={s.miniProfile__wrapper}>
          <div className={s.miniProfile__user}>
            {userAuto ?
              <>
                <Link href="/account">
                  <div className={s.miniProfile__name}>Георгий Элиаури</div>
                  <div className={s.miniProfile__mail}>bolik@mail.ru</div>
                </Link>
                <Link href='/account/collection' className={s.miniProfile__link}>
                  Моя коллекция
                </Link>
                <button>exit</button>
              </>
              :
              <>
                <p className={s.miniProfile__unauthorized}>Вы не авторизировались</p>
                <Link href='/auth/signin' className={s.miniProfile__link}>
                  Вход/Регистрация
                </Link>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
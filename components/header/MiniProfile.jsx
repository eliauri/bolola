import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import cl from 'classnames'
import auto from '../../public/authorization.svg'
import s from './header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../../store/auth/action-creators";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const MiniProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState();
  const [profileVisible, setProfileVisible] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get('/user/current-user-info/');
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    if (isLoggedIn && !user) {
      getUser();
    }
  }, [isLoggedIn, user, axiosPrivate]);

  return (
    <div
      className={s.header__user}
      onMouseEnter={() => setProfileVisible(true)}
      onMouseLeave={() => setProfileVisible(false)}
      onClick={() => setProfileVisible(!profileVisible)}
    >
      <Image
        src={auto}
        alt="authorization icon"
      />
      <div className={cl(s.miniProfile, { [s.active]: profileVisible })}>
        <div className={s.miniProfile__wrapper}>
          <div className={s.miniProfile__user}>
            {user && isLoggedIn ?
              <>
                <Link href="/account">
                  <div className={s.miniProfile__name}>{`${user.first_name} ${user.last_name}`}</div>
                  <div className={s.miniProfile__mail}>{user.email}</div>
                </Link>
                <Link href='/account/collection' className={s.miniProfile__link}>
                  Моя коллекция
                </Link>
                <nav className={s.miniProfile__nav}>
                  <ul>
                    <li>
                      <Link href={'/account'}>Мои данные</Link>
                    </li>
                    <hr />
                    <li >
                      <Link href={''} onClick={() => dispatch(logoutUser())}>Выход</Link>
                    </li>
                  </ul>
                </nav>
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

export default MiniProfile
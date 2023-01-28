import React from 'react'
import Container from '../Container'
import s from './UnauthorizedPage.module.scss'


const UnauthorizedPage = () => {
  return (
    <section className={s.page}>
      <Container>
        <h1 className={s.page__title}>У вас нет доступа</h1>
        <p className={s.page__info}>Авторизируйтесь для просмотра страницы</p>
      </Container>

    </section>
  )
}

export default UnauthorizedPage
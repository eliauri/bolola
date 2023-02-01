import React from 'react'
import cl from 'classnames'
import s from './button.module.scss'
const Button = ({children, className, onClick}) => {

  return (
    <button onClick={onClick} className={cl(className, s.button)}>{children}</button>
  )
}

export default Button
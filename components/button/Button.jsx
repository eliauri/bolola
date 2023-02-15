import React from 'react'
import cl from 'classnames'
import s from './button.module.scss'
const Button = ({children, className, onClick, disabled}) => {

  return (
    <button onClick={onClick} disabled={disabled} className={cl(className, s.button)}>{children}</button>
  )
}

export default Button
import React from 'react'
import cl from 'classnames'

const Container = (props) => {
  return (
   <div className={cl(props.className, 'container')}>
        {props.children}
   </div>
  )
}

export default Container
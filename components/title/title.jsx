import React from 'react'
import { useRef, useEffect } from 'react';
import s from './title.module.scss'
import cl from 'classnames'
import { gsap } from "gsap";
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

const Title = ({
  children, type, color, className
}) => {
 
  const titleStyle = {
    color: `var(--color-${color})`,
  }


  if (type == 'medium') {
    return (
      <h2  className={cl(s.title, className)} style={titleStyle} >
        {children}
      </h2>
    );
  }

  return (
    <h1 className={cl(s.title, className)} style={titleStyle}>
      {children}
    </h1>
  )
}

export default Title
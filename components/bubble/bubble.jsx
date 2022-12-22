import React from 'react'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from "gsap";

// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);


const Bubble = ({size, color}) => {
    const sizes = {
        big: {
            size: 75,
            glare: 20
        },
        medium:{
            size: 53,
            glare: 12
        },
        small:{
            size: 34,
            glare: 9
        },
        tiny:{
            size: 24,
            glare: 6
        }
    }
    const bubbleStyle =  {
        border:`4px solid var(--color-${color})`,
        width:`${sizes[size].size}px`,
        height: `${sizes[size].size}px`,
        background: 'transparent',
        borderRadius: '50%',
    
    }
    const glareStyle = {
        display: 'inline-block',
        borderRadius: '50%',
        position: 'relative',
        right: '20%',
        top: '19%',
        float: 'right',
        backgroundColor: `var(--color-${color})`,
        width:`${sizes[size].glare}px`,
        height: `${sizes[size].glare/2}px`
    }

    useLayoutEffect(() => {
        // let ctx = gsap.context(() => {
        //     gsap.current = gsap
        //     .fromTo(".bubble", { x: -25, }, { x: 0, ease: "power1.inOut", duration: 2,stagger: {each:0.1, from: "random", repeat:-1, yoyo: true} , })
        // })
      }, [])

  return (
    <div className='bubble' style = {bubbleStyle}>
        <span  style={glareStyle}></span>
    </div>
  )
}

export default Bubble
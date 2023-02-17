import Image from "next/image";
import React, { useEffect, useRef } from "react";
import s from './modal.module.scss'
import close from '../../public/close.png'
import { createPortal } from 'react-dom'

const Modal = props => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = document.querySelector("#__next")
  })

  useEffect(() => {
    props.modal ?
      document.querySelector("body").classList.add("noscroll") :
      document.querySelector("body").classList.remove("noscroll");
  }, [props.modal])

  return (
    ref.current ? createPortal(
      props.modal ?
        <div className={s.modal} onClick={props.onClose}>
          <div className={s.content} onClick={e => e.stopPropagation()}>
            <Image className={s.close} src={close} width={32} height={32} alt='закрыть' onClick={props.onClose} />
            <div className={s.body}>
              {props.children}
            </div>
          </div>
        </div> : <></>, 
        ref.current) : null
  );
};

export default Modal;
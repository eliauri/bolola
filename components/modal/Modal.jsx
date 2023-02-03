import Image from "next/image";
import React, { useEffect } from "react";
import s from './modal.module.scss'
import close from '../../public/close.png'
const Modal = props => {
  useEffect(() => {
    props.modal ?
        document.querySelector("body").classList.add("noscroll") :
        document.querySelector("body").classList.remove("noscroll");
}, [props.modal])
  return (
        props.modal ?
        <div className={s.modal} onClick={props.onClose}>
        <div className={s.content} onClick={e => e.stopPropagation()}>
        <Image className={s.close} src={close} width={32} height={32}  alt='закрыть' onClick={props.onClose}/>
          <div className={s.body}>{props.children}</div>
        </div>
      </div> : <></>
  );
};

export default Modal;
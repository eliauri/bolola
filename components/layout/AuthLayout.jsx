import Container from '../Container'
import Image from 'next/image'
import Link from 'next/link'
import s from './authLayot.module.scss'
import logo from '../../public/logoWhite.svg'
import { gsap } from "gsap";
import { useEffect, useRef } from 'react'

export default function AuthLayout({ children }) {
    const el = useRef(null);
    useEffect(() => {
            gsap.current = gsap
                .fromTo(el.current, { opacity: 0, y: -200, }, {opacity:1, y: 0, ease: "power2.out", duration: 1 })
    }, []);

    return (
        <main className={s.auth}>
            <section>
                <Container>
                    <div className={s.auth__wrapper} ref={el}>
                        <Link href={'/'} className={s.auth__logo}>
                            <Image src={logo} alt="логотип" height={35} width={162} />
                        </Link>
                        <div className={s.auth__window}>
                            {children}
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    )
}
import Container from '../Container'
import Image from 'next/image'
import Link from 'next/link'
import s from './authLayot.module.scss'
import logo from '../../public/logoWhite.svg'


export default function AuthLayout({ children }) {
    return (
        <main className={s.auth}>
            <section >
                <Container>
                    <div className={s.auth__wrapper}>
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
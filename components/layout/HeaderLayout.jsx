
import Header from '../header/header'

export default function HeaderLayout({ children }) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    )
}
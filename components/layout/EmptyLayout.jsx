export default function EmptyLayout({ children }) {
    return (
        <>
            <main style={{
                minHeight: '100vh',
                backgroundColor: 'var(--color-pink)',  
            }}>
                {children}
            </main>
        </>
    )
}
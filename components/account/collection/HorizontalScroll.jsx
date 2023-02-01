import React from 'react'
import { useHorizontalScroll } from '../../../hooks/useHorizontalScroll';

const HorizontalScroll = ({ className, children }) => {
    const scroll = useHorizontalScroll();
    return (
        <div className={className} ref={scroll}>
            {children}
        </div>

    )
}

export default HorizontalScroll
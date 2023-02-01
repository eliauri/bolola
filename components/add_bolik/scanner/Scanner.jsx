import React, { useEffect } from 'react'
import { Html5Qrcode } from "html5-qrcode"
import queryString from 'query-string';
import s from './scanner.module.scss'
import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';

const Scanner = ({setActiveStep, setBolik}) => {
    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");
        const config = { fps: 10, qrbox: { width: 450, height: 450 } };
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            const url = new URL(decodedText)
            setBolik(queryString.parse(url.search).bolik);
            setActiveStep(2);
            html5QrCode.stop();
        };
        html5QrCode.start(
            { facingMode: "user" },
            config,
            qrCodeSuccessCallback)
    }, [])
    return (
        <div className={s.scanner} id='reader'></div>
    )
}

export default Scanner
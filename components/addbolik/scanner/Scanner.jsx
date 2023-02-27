/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Html5Qrcode } from "html5-qrcode"
import queryString from 'query-string';
import s from './scanner.module.scss'
import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';
import { useDispatch } from 'react-redux';
import { setActiveStep, setBolik } from '../../../store/bolik/addbolik-slice';

const Scanner = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");
        const config = { fps: 10, qrbox: { width: 450, height: 450 } };
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            const url = new URL(decodedText)
            dispatch(setBolik(queryString.parse(url.search).bolik))
            dispatch(setActiveStep(2))
        };
        html5QrCode.start(
            { facingMode: "environment" },
            config,
            qrCodeSuccessCallback)
        return () => html5QrCode.stop();
    }, [])
    return (
        <div className={s.scanner} id='reader'></div>
    )
}

export default Scanner
import React, { useEffect, useState } from 'react'
import { Html5Qrcode } from "html5-qrcode"


import Container from '../../components/Container'
import AddBolik from '../../components/add_bolik/addBolik'



export default function Skaner() {

  // const [code, setCode] = useState();

  // const cameraId = 'db2cef3a7fed0a89a061cf58dd41e3f11d29836b91469661a57d5e44d8594ec4';
  // useEffect(() => {
  //   const html5QrCode = new Html5Qrcode("reader");

  //   Html5Qrcode.getCameras().then(devices => {

  //     if (devices && devices.length) {
  //       var cameraId = devices[0].id;
  //     }
  //     console.log(devices);
  //   }).catch(err => {

  //   });
  //   html5QrCode.start(
  //     cameraId,
  //     {
  //       fps: 10,    // Optional, frame per seconds for qr code scanning
  //       qrbox: { width: 400, height: 400 }  // Optional, if you want bounded box UI
  //     },
  //     (decodedText, decodedResult) => {
  //       setCode(decodedText);
  //       html5QrCode.stop();
  //     },
  //     (errorMessage) => {
  //       // parse error, ignore it.
  //     })
  //     .catch((err) => {
  //       // Start failed, handle it.
  //     });
  // }, [])


  return (
   <AddBolik/>
  )
}

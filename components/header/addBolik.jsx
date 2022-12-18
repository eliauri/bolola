import React from 'react'
import Image from 'next/image';
import add from '../../public/add-bolik.svg'

const addBolik = () => {
  return (
  <button>
    <Image
      src={add}
      alt='add bolik'
    />
  </button>
  )
}

export default addBolik
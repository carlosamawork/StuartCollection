'use client'

import Image from 'next/image'

type Props = {
  name: string
  alt: string
  size?: number
}

export default function Icon({name, alt, size = 20}: Props) {
  if (!name) return <></>

  return (
    <Image
      src={`/assets/svg/${name}.svg`}
      alt={alt ?? 'Icon'}
      width={size}
      height={size}
      style={{width: size, height: size}}
    />
  )
}

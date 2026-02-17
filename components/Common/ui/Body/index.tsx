'use client'

import {Roboto} from 'next/font/google'
import {usePathname} from 'next/navigation'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export default function Body({children}: any) {
  const pathname = usePathname()

  const isArtwork = pathname.includes('collection/artwork')
  const backgroundColor = isArtwork ? '#E7ECF2' : undefined

  return (
    <body className={roboto.className} style={backgroundColor ? {backgroundColor} : {}}>
      {children}
    </body>
  )
}

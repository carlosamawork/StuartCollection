'use client'
import {useCallback, useEffect, useState} from 'react'
import {useRouter, usePathname} from 'next/navigation'

// Nota: no usar useSearchParams() aquí — fuerza CSR bailout y el contenido de
// las páginas que lo consumen desaparece del HTML prerenderizado (SEO).
// La query string solo se necesita en cliente, así que se lee de window.location.
export function useUrlHash(): UseUrlHashReturn {
  const router = useRouter()
  const pathname = usePathname()

  const [hash, setHash] = useState<string | null>(null)

  // Se ejecuta cada vez que Next cambia la URL
  useEffect(() => {
    const readHash = () => {
      const newHash = window.location.hash.replace(/^#/, '')
      setHash((current) => (newHash === current ? current : newHash))
    }

    readHash()
    window.addEventListener('hashchange', readHash)
    return () => window.removeEventListener('hashchange', readHash)
  }, [pathname])

  const setUrlHash = useCallback(
    (value: string) => {
      const cleanValue = value.replace(/^#/, '')
      if (cleanValue === hash) return

      const query = window.location.search.replace(/^\?/, '')
      const url = `${pathname}${query ? `?${query}` : ''}${cleanValue ? `#${cleanValue}` : ''}`

      router.push(url)
      setHash(cleanValue)
    },
    [router, pathname, hash],
  )

  return {hash, setHash: setUrlHash}
}

type UseUrlHashReturn = {
  hash: string | null
  setHash: (value: string) => void
}

'use client'
import {useCallback, useEffect, useState} from 'react'
import {useRouter, usePathname, useSearchParams} from 'next/navigation'

export function useUrlHash(): UseUrlHashReturn {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [hash, setHash] = useState<string | null>(null)

  // Se ejecuta cada vez que Next cambia la URL
  useEffect(() => {
    if (typeof window === 'undefined') return

    const newHash = window.location.hash.replace(/^#/, '')
    if (newHash === hash) return

    setHash(newHash)
  }, [pathname, searchParams])

  const setUrlHash = useCallback(
    (value: string) => {
      const cleanValue = value.replace(/^#/, '')
      if (cleanValue === hash) return

      const query = searchParams.toString()
      const url = `${pathname}${query ? `?${query}` : ''}${cleanValue ? `#${cleanValue}` : ''}`

      router.push(url)
      setHash(cleanValue)
    },
    [router, pathname, searchParams],
  )

  return {hash, setHash: setUrlHash}
}

type UseUrlHashReturn = {
  hash: string | null
  setHash: (value: string) => void
}

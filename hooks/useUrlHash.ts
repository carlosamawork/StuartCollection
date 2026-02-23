import {useCallback, useEffect, useState} from 'react'

export function useUrlHash(): UseUrlHashReturn {
  const [hash, setHashState] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const readHash = () => {
      const currentHash = window.location.hash.replace(/^#/, '')
      setHashState(currentHash)
    }

    // Leer hash inicial
    readHash()

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', readHash)

    return () => {
      window.removeEventListener('hashchange', readHash)
    }
  }, [])

  const setHash = useCallback((value: string) => {
    if (typeof window === 'undefined') return

    const cleanValue = value.replace(/^#/, '')
    const newHash = cleanValue ? `#${cleanValue}` : ''

    // 1️⃣ Actualizamos state inmediatamente
    setHashState(cleanValue)

    // 2️⃣ Actualizamos URL
    if (newHash) {
      window.location.hash = newHash
    } else {
      // Quitar hash completamente sin recargar
      const {pathname, search} = window.location
      window.history.replaceState(null, '', pathname + search)
    }
  }, [])

  return {hash, setHash}
}

type UseUrlHashReturn = {
  hash: string | null
  setHash: (value: string) => void
}

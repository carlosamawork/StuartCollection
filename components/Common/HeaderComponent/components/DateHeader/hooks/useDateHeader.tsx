'use client'

import {useEffect, useState} from 'react'

async function fetchLaJollaTempF(signal?: AbortSignal): Promise<number | null> {
  // UCSD La Jolla: 32.8801, -117.2340
  const url =
    'https://api.open-meteo.com/v1/forecast?latitude=32.8801&longitude=-117.2340&current=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles'

  const res = await fetch(url, {signal, cache: 'no-store'})
  if (!res.ok) return null

  const json = await res.json()
  const t = json?.current?.temperature_2m
  return typeof t === 'number' ? t : null
}

// TEMPERATURE AT UCSD LA JOLLA — the collection is open 24/7, no hours logic

export default function useDateHeader() {
  const [tempF, setTempF] = useState<number | null>(null)
  const [tempLoading, setTempLoading] = useState(true)

  useEffect(() => {
    const ac = new AbortController()
    setTempLoading(true)

    fetchLaJollaTempF(ac.signal)
      .then((t) => setTempF(t))
      .catch(() => setTempF(null))
      .finally(() => setTempLoading(false))

    return () => ac.abort()
  }, [])

  return {
    tempF,
    tempLoading,
  }
}

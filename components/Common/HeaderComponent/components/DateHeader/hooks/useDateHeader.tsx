'use client'

import {useEffect, useMemo, useState} from 'react'

type DayHours = {day: string; open: string | null; close: string | null}

const SAN_DIEGO_TZ = 'America/Los_Angeles'

function getWeekdayInTimeZone(timeZone: string) {
  // Ej: "Monday", "Tuesday", ...
  return new Intl.DateTimeFormat('en-US', {weekday: 'long', timeZone}).format(new Date())
}

function isClosedToday(
  openValue: string | null | undefined,
  closeValue: string | null | undefined,
) {
  // Con tu data: Sunday => open: "Closed", close: null
  return !openValue || openValue.toLowerCase() === 'closed' || !closeValue
}

function formatTodayLabel(
  openValue: string | null | undefined,
  closeValue: string | null | undefined,
) {
  if (isClosedToday(openValue, closeValue)) return 'Closed'
  return `${openValue} – ${closeValue}`
}

async function fetchSanDiegoTempF(signal?: AbortSignal): Promise<number | null> {
  // San Diego aprox: 32.7157, -117.1611
  const url =
    'https://api.open-meteo.com/v1/forecast?latitude=32.7157&longitude=-117.1611&current=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles'

  const res = await fetch(url, {signal, cache: 'no-store'})
  if (!res.ok) return null

  const json = await res.json()
  const t = json?.current?.temperature_2m
  return typeof t === 'number' ? t : null
}

// CALCULATE IF IS OPEN AND TEMPERATURE OF SAN DIEGO

export default function useDateHeader({data}: any) {
  const [tempF, setTempF] = useState<number | null>(null)
  const [tempLoading, setTempLoading] = useState(true)

  const hours: DayHours[] = data ?? [] // <-- ajusta aquí

  const today = useMemo(() => {
    const todayName = getWeekdayInTimeZone(SAN_DIEGO_TZ) // "Monday"...
    console.log('Today in San Diego:', todayName)

    const todayHours = hours.find((h) => h.day === todayName) ?? null

    const open = todayHours?.open ?? null
    const close = todayHours?.close ?? null
    const closed = isClosedToday(open, close)

    return {
      dayName: todayName,
      isOpen: !closed,
      label: closed ? 'Closed' : 'Open today',
      timeLabel: formatTodayLabel(open, close),
    }
  }, [hours])

  useEffect(() => {
    const ac = new AbortController()
    setTempLoading(true)

    fetchSanDiegoTempF(ac.signal)
      .then((t) => setTempF(t))
      .catch(() => setTempF(null))
      .finally(() => setTempLoading(false))

    return () => ac.abort()
  }, [])

  return {
    tempF,
    tempLoading,
    today,
  }
}

'use client'

import {CollectionThemeData} from '@/sanity/queries/queries/collection'
import {useState} from 'react'

interface ThemeTag {
  label: string
  value: string
  active: boolean
  onClick: () => void
}

export default function useThemesSelection(availableThemes: CollectionThemeData[]) {
  const [themeTags, setThemeTags] = useState<ThemeTag[]>(
    // create initial themes tags
    availableThemes.map((theme) => ({
      label: theme.title,
      value: theme._id,
      active: false,
      onClick: () => toggleTheme(theme._id),
    })),
  )

  const toggleTheme = (value: string) => {
    setThemeTags((tags) =>
      [...tags].map((tag) =>
        tag.value !== value
          ? tag
          : {
              ...tag,
              active: !tag.active,
            },
      ),
    )
  }

  const allThemesIds = themeTags.map((theme) => theme.value)
  const activeThemes = themeTags.filter((theme) => theme.active)

  const selectedThemesList = activeThemes.reduce(
    (acc, theme) => (acc === '' ? theme.label : `${acc}, ${theme.label}`),
    '',
  )

  const activeThemesIds = activeThemes.map((theme) => theme.value)
  const selectedThemesIds = activeThemesIds.length === 0 ? allThemesIds : activeThemesIds

  return {
    themeTags,
    selectedThemesIds,
    selectedThemesList,
  }
}

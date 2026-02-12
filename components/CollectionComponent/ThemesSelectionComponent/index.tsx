'use client'

import {Tags} from '@/components/Common/ui/Tags/Tags'
import {useEffect, useState} from 'react'

export default function ThemesSelectionComponent({themes}: {themes: {title: string}[]}) {
  const [tags, setTags] = useState<{label: string; active: boolean; onClick: () => void}[]>(
    themes.map((theme, i) => ({
      label: theme.title,
      active: false,
      onClick: () => toggleTag(i),
    })),
  )

  const toggleTag = (i: number) => {
    const newTags = [...tags]
    newTags[i].active = !newTags[i].active
    setTags(newTags)
  }

  useEffect(() => {
    console.log('tag was clicked ', tags)
  }, [tags])

  return <Tags tags={tags} />
}

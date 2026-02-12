'use client'

import s from './Tags.module.scss'
import {Tag, TagProps} from '@/components/Common/ui/Tags/Tag'

interface TagsProps {
  tags: Omit<TagProps, 'className'>[]
}

export function Tags({tags}: TagsProps) {
  return (
    <div className={s.tagsContainer}>
      {tags.map((tagProps, i) => (
        <Tag {...tagProps} className={s.item} key={i} />
      ))}
    </div>
  )
}

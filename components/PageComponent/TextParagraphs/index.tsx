'use client'
import s from './TextParagraphs.module.scss'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'

export default function TextParagraphsComponent({data, noMargin}: {data: any; noMargin?: boolean}) {
  return (
    <div
      className={`${s.textParagraphs} ${s[data.width]} ${s[noMargin ? 'textParagraphs--noMargin' : '']}`}
    >
      <div className={s.bodyParagraphs}>
        {data.body &&
          data.body.map((textRow: any, index: number) => {
            return (
              <PortableText
                key={textRow._key}
                value={[textRow]}
                components={portableBodyComponents()}
              />
            )
          })}
      </div>
    </div>
  )
}

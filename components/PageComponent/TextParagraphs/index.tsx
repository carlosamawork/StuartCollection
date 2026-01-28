'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './TextParagraphs.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'

export default function TextParagraphsComponent({data}: {data: any}) {
  return (
    <div className={`${s.textParagraphs} ${s[data.width]}`}>
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
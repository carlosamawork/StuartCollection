'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './TitleParagraphs.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBlockComponents} from '@/utils/portableText'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'

export default function TitleParagraphsComponent({data}: {data: any}) {
  return (
    <div className={`${s.titleParagraphs} ${s[data.width]}`}>
        {data.body &&
        data.body.map((textRow: any, index: number) => {
            return (
            <PortableText
                key={textRow._key}
                value={[textRow]}
                components={portableBlockComponents()}
            />
            )
        })}
    </div>
  )
}
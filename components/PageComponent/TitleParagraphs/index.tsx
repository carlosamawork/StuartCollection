'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './TextParagraphs.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBlockComponents} from '@/utils/portableText'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'

export default function TitleParagraphsComponent({data}: {data: any}) {
    console.log('TextParagraphs data:', data)
  return (
    <>
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
    </>
  )
}
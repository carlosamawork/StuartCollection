'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './CalloutComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'

export default function CalloutComponent({data}: {data: any}) {
    console.log('Callout data:', data)
  return (
    <div className={s.callOut}>
        <div className={s.bodyCallOut}>
            {data.text &&
            data.text.map((textRow: any, index: number) => {
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
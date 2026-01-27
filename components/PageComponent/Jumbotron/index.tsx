'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './JumbotronComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'
import TextParagraphsComponent from '../TextParagraphs'
import CalloutComponent from '../Callout'
import ImageComponent from '../Image'

export default function JumbotronComponent({data}: {data: any}) {
  return (
    <>
        <div className={`${s.jumbotron} ${s[data.color]} ${s[data.size]}`}>
            <div className={s.title}>
                {data.title && (
                    <h2>{data.title}</h2>
                )}
            </div>
            <div className={s.body}>
                {data.body &&
                data.body.map((mod: any, index: number) => {
                    return (
                        <div key={index} className={s.paragraph}>
                            {mod._type === 'module.textParagraphs' && <TextParagraphsComponent data={mod} />}
                            {mod._type === 'module.callout' && <CalloutComponent data={mod} />}
                            {mod._type === 'module.image' && <ImageComponent data={mod} />}
                        </div>
                    )
                }
                )}
            </div>
        </div>
    </>
  )
}
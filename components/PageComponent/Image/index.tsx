'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './ImageComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'

export default function ImageComponent({data}: {data: any}) {
  return (
    <>
        <div 
            className={`${s.imageWrapper} ${data.width ? s[data.width] : ''}`}
        >
            {data.image && (
                <LazyImage
                    src={data.image.imageUrl}
                    alt={data.image.filename || 'Image'}
                    width={data.image.metadata.dimensions.width || 800}
                    height={data.image.metadata.dimensions.height || 600}
                />
            )}
        </div>
        {data.caption && <div className={s.caption}>
            {data.caption &&
            data.caption.map((textRow: any, index: number) => {
                return (
                <PortableText
                    key={textRow._key}
                    value={[textRow]}
                    components={portableBodyComponents()}
                />
                )
            })} 

        </div>}
    </>
  )
}
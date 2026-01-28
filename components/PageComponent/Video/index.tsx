'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './VideoComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'

export default function VideoComponent({data}: {data: any}) {
  return (
    <>
        <div 
            className={`${s.videoWrapper} ${data.width ? s[data.width] : ''}`}
        >
            {data.type === 'internal-video' ? 
                <LazyVideo
                    src={data.videoUrl}
                    alt={data.title || 'Visit Video'}
                    thumbnail={data.image ? data.image.imageUrl : undefined}
                    muted={false}
                    autoplay={false}
                /> : 
                data.type === 'youtube-vimeo-video' ?
                <VideoEmbed url={data.videoUrl} /> : null
            }
        </div>
        {data.title && <div className={`${s.caption} ${data.width ? s[data.width] : ''}`}>
            <p>{data.title}</p>
        </div>}
    </>
  )
}
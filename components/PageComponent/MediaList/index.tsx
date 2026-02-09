'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './MediaList.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'

export default function MediaListComponent({data}: {data: any}) {
    return (
        <div className={`${s.mediaList}`}>
            {data.title && <h2 className={s.title}>{data.title}</h2>}
            <div className={`${s.itemsGrid} ${s[`columns-${data.columns || 2}`]}`}>
                {data.items && data.items.map((item: any, index: number) => (
                    <div key={index} className={`${s.mediaItem} ${s[item.width]}`}>
                        {item.type === 'internal-video' ? 
                            <LazyVideo
                                src={item.videoUrl}
                                alt={item.title || 'Visit Video'}
                                thumbnail={item.image ? item.image.imageUrl : undefined}
                                muted={false}
                                autoplay={false}
                            /> : 
                            item.type === 'youtube-vimeo-video' ?
                            <VideoEmbed url={item.videoUrl} /> : null
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}
'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './AnnouncementComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'

export default function AnnouncementComponent({data}: {data: any}) {

  return (
    <div className={s.announcement}>
        <div className={s.announcementContent}>
            <div className={s.titleAnnouncement}>
                <h2>{data.title}</h2>
            </div>
            <div className={s.bodyAnnouncement}>
                {data.subtitle &&
                data.subtitle.map((textRow: any, index: number) => {
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
    </div>
  )
}

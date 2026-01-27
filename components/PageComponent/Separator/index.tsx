'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './SeparatorComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'

export default function SeparatorComponent({data}: {data: any}) {
    console.log('Separator data:', data)
  return (
    <>
    <div 
        className={`${s.separator} ${s[data.variant]} ${s[data.width]}`}
         id={data.anchorId ? data.anchorId : undefined}>
            
    </div>
    {data.anchorOnMenu && (
        <h2 className={s.anchorMenu}>
            {data.anchorOnMenu}
        </h2>
    )}
    </>
  )
}
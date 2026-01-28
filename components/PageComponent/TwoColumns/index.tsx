'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './TwoColumns.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'

export default function TwoColumnsComponent({data}: {data: any}) {
    console.log('TwoColumnsComponent data:', data);
  return (
    <div className={s.twoColumns}>
        <div className={s.title}>
            {data.title && <h2>{data.title}</h2>}
        </div>
        <div className={s.columns}>
            <div className={`${s.leftColumn} ${s[data.textAlignY || 'top']}`}>
                {data.imageSide == 'left' &&
                    data.image && (
                    <div className={s.imageWrapper}>
                        <LazyImage
                            src={data.image.imageUrl}
                            alt={data.image.filename || 'Image'}
                            width={data.image.metadata.dimensions.width || 800}
                            height={data.image.metadata.dimensions.height || 600}
                        />
                    </div>
                )}
                {data.imageSide == 'right' && data.body && 
                    <div className={`${s.bodyParagraphs}`}>
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
                }
            </div>
            <div className={`${s.rightColumn} ${s[data.textAlignY || 'top']}`}>
                {data.imageSide == 'right' &&
                    data.image && (
                    <div className={s.imageWrapper}>
                        <LazyImage
                            src={data.image.imageUrl}
                            alt={data.image.filename || 'Image'}
                            width={data.image.metadata.dimensions.width || 800}
                            height={data.image.metadata.dimensions.height || 600}
                        />
                    </div>
                )}
                {data.imageSide == 'left' && data.body && 
                    <div className={`${s.bodyParagraphs} `}>
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
                }
            </div>
        </div>  
    </div>
  )
}
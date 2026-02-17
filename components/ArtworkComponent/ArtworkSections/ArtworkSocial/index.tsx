'use client'

import {ArtworkSocialSectionData} from '@/sanity/queries/modules/artwork/socialSection'
import s from './ArtworkSocial.module.scss'
import Container from '@/components/Common/ui/Container'
import TextBody from '@/components/Common/ui/TextBody'
import Image from 'next/image'

export default function ArtworkSocial({section}: {section: ArtworkSocialSectionData}) {
  if (!section) return <></>

  return (
    <Container>
      <div className={s.section}>
        <div className={s.left}>
          <h2>{section.title}</h2>
          <div className={s.leftBottom}>
            <TextBody body={section.description} />
            {section.links && (
              <div className={s.links}>
                <h6>Connect</h6>
                <ul className={s.linksList}>
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href}>{link.label ?? 'Link'}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className={s.itemsContainer}>
          {section.items?.map((item, i) => (
            <a className={s.item} key={i} href={item.href}>
              {/* <LazyImage
                  src={image.imageUrl}
                  alt={image.filename || 'Image'}
                  width={280}
                  height={280}
                  objectFit="cover"
                /> */}
              <div className={s.image}>
                <Image
                  src={item.image.imageUrl}
                  alt={item.image.filename || 'Image'}
                  fill
                  style={{objectFit: 'cover'}}
                />
              </div>
              <div className={s.caption}>
                <p className={'p-small'}>{item.caption}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Container>
  )
}

'use client'
import s from './ArtworkArtist.module.scss'
import Container from '@/components/Common/ui/Container'
import Image from 'next/image'
import TextBody from '@/components/Common/ui/TextBody'
import AccordeonComponent from '@/components/PageComponent/Accordeon/AccordeonComponent'
import {ArtworkArtistSectionData} from '@/sanity/queries/modules/artwork/artistSection'
import LazyImage from '@/components/Common/LazyImage'

interface ArtworkArtistProps {
  section: ArtworkArtistSectionData
}

export default function ArtworkArtist({section}: ArtworkArtistProps) {
  if (!section) return <></>

  return (
    <Container>
      <div className={s.section}>
        <h2>{section.title}</h2>
        <div className={s.imageContainer}>
          {section.images?.map((image, i) => (
            <div className={s.image} key={i}>
              <LazyImage
                src={image.imageUrl}
                alt={image.filename || 'Image'}
                width={280}
                height={280}
                objectFit="cover"
                fill
              />
            </div>
          ))}
        </div>
        <div>
          <TextBody body={section.text} />
        </div>
        <div>{section.accordeon && <AccordeonComponent data={section.accordeon} small />}</div>
      </div>
    </Container>
  )
}

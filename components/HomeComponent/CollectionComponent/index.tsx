'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './CollectionComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import Container from '@/components/Common/ui/Container'

export default function CollectionComponent({data}: {data: any}) {

  return (
    <Container>
      <div className={s.collection}>
        <div className={s.collectionContent}>
          <div className={s.titleCollection}>
            {data.titleLink ? (
              <h2>
                <Link
                  href={data.titleLink.href}
                  target={data.titleLink.blank ? '_blank' : '_self'}
                  rel={data.titleLink.blank ? 'noopener noreferrer' : undefined}
                >
                  {data.title}
                </Link>
              </h2>
            ) : (
              <h2>{data.title}</h2>
            )}
            {data.subtitle && (
              <div className={s.subtitle}>
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
            )}
          </div>
          <div className={s.featuredArtwork}>
            {data.description && (
              <div className={s.description}>
                {data.description &&
                  data.description.map((textRow: any, index: number) => {
                    return (
                      <PortableText
                        key={textRow._key}
                        value={[textRow]}
                        components={portableBodyComponents()}
                      />
                    )
                  })}
              </div>
            )}
            <div className={s.artwork}>
              <h3>{data.featuredArtwork.title}</h3>
              {data.featuredArtwork && data.featuredArtwork.thumbnail && (
                <div className={s.artworkImage}>
                  <LazyImage
                    src={data.featuredArtwork.thumbnail.imageUrl}
                    alt={
                      data.featuredArtwork.thumbnail.alt ||
                      data.featuredArtwork.title ||
                      'Featured Artwork Image'
                    }
                    width={data.featuredArtwork.thumbnail.metadata.dimensions.width}
                    height={data.featuredArtwork.thumbnail.metadata.dimensions.height}
                    filename={data.featuredArtwork.thumbnail.filename}
                  />
                </div>
              )}
              <div className={s.artworkInfo}>
                {data.featuredArtwork.visitDescription &&
                  data.featuredArtwork.visitDescription.map((textRow: any, index: number) => {
                    return (
                      <PortableText
                        key={textRow._key}
                        value={[textRow]}
                        components={portableBodyComponents()}
                      />
                    )
                  })}
              </div>
              <div className={`ctaButton ${s.ctaButton}`}>
                <Link href={`/collection/artwork/${data.featuredArtwork.slug.current}`}>
                  View Artwork
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

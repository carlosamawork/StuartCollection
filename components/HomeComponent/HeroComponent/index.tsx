'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './HeroComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Container from '@/components/Common/ui/Container'

export default function HeroComponent({data}: {data: any}) {
  console.log('Hero data:', data)
  return (
    <Container>
      <div className={s.hero}>
        <div className={s.media}>
          {data.videoUrl ? (
            <LazyVideo src={data.videoUrl} alt={'Hero Video'} muted={true} autoplay={true} />
          ) : (
            data.image && (
              <LazyImage
                src={data.image.imageUrl}
                alt={data.image.alt || 'Hero Image'}
                width={data.image.metadata.dimensions.width}
                height={data.image.metadata.dimensions.height}
                fill={true}
              />
            )
          )}
        </div>
        <div className={s.content}>
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
          {data.ctaButton && (
            <div className={`ctaButton ${s.ctaButton}`}>
              <a
                href={data.ctaButton.url}
                target={data.ctaButton.newWindow ? '_blank' : '_self'}
                rel={data.ctaButton.newWindow ? 'noopener noreferrer' : undefined}
              >
                {data.ctaButton.title}
              </a>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

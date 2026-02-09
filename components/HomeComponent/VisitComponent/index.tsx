'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './VisitComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'
import Container from '@/components/Common/ui/Container'

export default function VisitComponent({data}: {data: any}) {
  return (
    <Container>
      <div className={s.visit}>
        <div className={s.visitContent}>
          <div className={s.titleVisit}>
            <h2>{data.title}</h2>
            {data.meta && (
              <div className={s.subtitle}>
                {data.meta &&
                  data.meta.map((textRow: any, index: number) => {
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
            <div className={`ctaButton ${s.ctaButton}`}>
              <Link
                href={data.cta.url}
                target={data.cta.newWindow ? '_blank' : '_self'}
                rel={data.cta.newWindow ? 'noopener noreferrer' : undefined}
              >
                {data.cta.title}
              </Link>
            </div>
          </div>
          <div className={s.contentVisit}>
            {data.body && (
              <div className={s.body}>
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
            )}
            <div className={s.visitMedia}>
              {data.media.type === 'image' ? (
                <LazyImage
                  src={data.media.image.imageUrl}
                  alt={data.media.image.alt || 'Visit Image'}
                  width={data.media.image.metadata.dimensions.width}
                  height={data.media.image.metadata.dimensions.height}
                />
              ) : data.media.type === 'internal-video' ? (
                <LazyVideo
                  src={data.media.internalVideo.videoUrl}
                  alt={data.media.internalVideo.title || 'Visit Video'}
                  thumbnail={
                    data.media.internalVideo.thumbnail
                      ? data.media.internalVideo.thumbnail.imageUrl
                      : undefined
                  }
                  muted={false}
                  autoplay={false}
                />
              ) : data.media.type === 'youtube-vimeo-video' ? (
                <VideoEmbed url={data.media.externalVideoUrl} />
              ) : null}
            </div>
            <div className={s.caption}>
              <p className={'p-small'}>{data.media.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

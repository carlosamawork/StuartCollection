'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './SupportComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'

export default function SupportComponent({data}: {data: any}) {
  console.log('Support data:', data)
  return (
    <div className={s.support}>
      <div className={s.supportContent}>
        <div className={s.supportTop}>
            <div className={s.veil}></div>
          <div className={s.imageSupport}>
            {data.image && (
              <LazyImage
                src={data.image.imageUrl}
                alt={data.image.alt || 'Support Image'}
                width={data.image.metadata.dimensions.width}
                height={data.image.metadata.dimensions.height}
                fill={true}
              />
            )}
            <div className={s.supportText}>
              {data.title && <h3 className={s.title}>{data.title}</h3>}
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
          </div>
        </div>
        <div className={s.listOfCards}>
          {data.cards &&
            data.cards.map((card: any, index: number) => (
              <div key={index} className={s.card}>
                {card.title && <h4 className={s.title}>{card.title}</h4>}
                {card.description && (
                  <div className={s.description}>
                    {card.description &&
                      card.description.map((textRow: any, index: number) => {
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
                <div className={`${s.ctaButton}`}>
                  <Link
                    href={card.link.href}
                    target={card.link.blank ? '_blank' : '_self'}
                    rel={card.link.blank ? 'noopener noreferrer' : undefined}
                  >
                    <p>{card.link.label}</p>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.16667 10.8333L0 9.66667L8 1.66667L0.833333 1.66667L0.833333 0L10.8333 0L10.8333 10H9.16667L9.16667 2.83333L1.16667 10.8333Z" fill="white" fillOpacity="0.6"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

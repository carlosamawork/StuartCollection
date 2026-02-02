'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './PressComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import Container from '@/components/Common/ui/Container'

export default function PressComponent({data}: {data: any}) {
  console.log('Press data:', data)
  return (
    <Container>
      <div className={s.press}>
        <div className={s.topContent}>
          {data.title && <h2 className={s.title}>{data.title}</h2>}
          {data.cta && (
            <div className={`${s.ctaButton}`}>
              <Link
                href={data.cta.href}
                className={s.ctaLink}
                target={data.cta.blank ? '_blank' : '_self'}
                rel={data.cta.blank ? 'noopener noreferrer' : undefined}
              >
                <p className="p">{data.cta.label}</p>
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 1.41L4.58 6L4.0127e-07 10.59L1.41 12L7.41 6L1.41 0L0 1.41Z"
                    fill="#272728"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
        <div
          className={`${s.pressContent} ${data.options.columnsDesktop ? s[`columns${data.options.columnsDesktop}`] : ''}`}
        >
          {data.items &&
            data.items.map((item: any, index: number) => (
              <div key={index} className={s.pressItem}>
                {item.title && <h3 className={s.itemTitle}>{item.title}</h3>}
                {item.publication && <p className={s.itemPublication}>{item.publication}</p>}
                {item.image && (
                  <div className={s.image}>
                    <LazyImage
                      src={item.image.imageUrl}
                      alt={item.image.alt || `Press Image ${index + 1}`}
                      width={item.image.metadata.dimensions.width}
                      height={item.image.metadata.dimensions.height}
                      fill={true}
                    />
                    {item.url && (
                      <div className={`ctaButton ${s.ctaButton}`}>
                        <a href={item.url} className={s.itemLink}>
                          <svg
                            width="8"
                            height="12"
                            viewBox="0 0 8 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 1.41L4.58 6L4.0127e-07 10.59L1.41 12L7.41 6L1.41 0L0 1.41Z"
                              fill="#272728"
                            />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </Container>
  )
}

'use client'
import s from './SubmenuComponent.module.scss'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import Container from '../../../ui/Container'
import DirectionsComponent from '@/components/Common/DirectionsComponent/DirectionsComponent'

export default function SubmenuComponent({
  data,
  additionalContent,
}: {
  data: any
  additionalContent: any
}) {
  return (
    <>
      <Container>
        <div className={`${s.submenuWrapper}`}>
          <div className={s.submenuContent}>
            <h6>{data?.title}</h6>
            <nav className={s.sectionsWrapper}>
              <ul>
                {data?.sections?.map((section: any, index: number) => (
                  <li key={index} className={s.section}>
                    <Link href={'/' + data.slug + '#' + section.id} className={s.sectionLink}>
                      <span>{section.title}</span>
                      <svg
                        width="7"
                        height="10"
                        viewBox="0 0 7 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 1.175L3.81667 5L3.34392e-07 8.825L1.175 10L6.175 5L1.175 0L0 1.175Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className={s.submenuAdditionalContent}>
            {data?.title === 'About' && (
              <div className={s.element}>
                <h6>Connect</h6>
                <div className={s.connectContent}>
                  {additionalContent.connect &&
                    additionalContent.connect.map((textRow: any, index: number) => {
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
            )}
            {data?.title === 'Visit' && (
              <>
                <div className={s.element}>
                  <h6>Opening Hours</h6>
                  <p>Open 24/7</p>
                </div>
                <div className={s.element}>
                  <h6>Directions</h6>
                  <DirectionsComponent
                    directions={additionalContent.directions}
                    googleMapsUrl={additionalContent.googleMapsUrl}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
      <div className={s.submenuBottom}>
        <Container>
          <div className={s.contactInfo}>
            <p>
              <Link href={`mailto:${additionalContent.email}`}>{additionalContent.email}</Link>
            </p>
            <p>
              <Link href={`tel:${additionalContent.telephone}`}>{additionalContent.telephone}</Link>
            </p>
          </div>
        </Container>
      </div>
    </>
  )
}

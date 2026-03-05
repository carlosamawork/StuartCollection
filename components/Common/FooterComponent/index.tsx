'use client'
import React, {useRef} from 'react'
import s from './FooterComponent.module.scss' // Adjust the path as necessary
import {PortableText} from '@portabletext/react'
import Link from 'next/link'
import {motion} from 'framer-motion'
import Container from '@/components/Common/ui/Container'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import {ButtonLink} from '../ui/Buttons/components/ButtonLink'
import DirectionsComponent from '@/components/Common/DirectionsComponent/DirectionsComponent'
import SvgLogoUcSanDiego from '@/components/Common/HeaderComponent/components/SvgLogoUcSanDiego'

export default function FooterComponent({data}: any) {
  const footerRef = useRef<HTMLElement>(null)
  console.log('Footer data:', data) // Debugging line to check the structure of the data
  return (
    <motion.footer
      className={`${s.footer}`}
      ref={footerRef}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.3, delay: 0.5}}
    >
      <Container className={s.container}>
        <div className={s.topHeader}>
          <div className={s.logo}>
            <Link href="/">STUART COLLECTION</Link>
          </div>
          <div className={s.logoSanDiego}>
            <Link
              href="https://stuartcollection.ucsd.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SvgLogoUcSanDiego />
            </Link>
          </div>
        </div>
      </Container>
      <div className={s.textContainer}>
        <Container className={s.container}>
          <div className={s.text}>
            <h3>{data.footer.claim}</h3>
          </div>
        </Container>
      </div>
      <div className={s.footerSectionContainer}>
        <Container className={s.container}>
          <div className={`${s.gridLayout} ${s.visiting}`}>
            <h4>
              Visiting<br></br>Information
            </h4>
            <div>
              <h6>Directions</h6>
              <DirectionsComponent
                directions={data.directions}
                googleMapsUrl={data.googleMapsUrl}
                strong
              />
            </div>
            <div>
              <h6>Opening Hours</h6>
              <ul>
                {data.openingHours &&
                  data.openingHours.map((hour: any, index: number) => (
                    <li key={index}>
                      <span>{hour.day}:</span>{' '}
                      <span>
                        {hour.open}
                        {hour.close && ' - ' + hour.close}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <nav className={s.sectionsWrapper}>
                <ul>
                  {data?.visit.sections?.map((section: any, index: number) => (
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
                            fill="rgba(255, 255, 255, 0.6)"
                          />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </Container>
      </div>
      <div className={s.footerSectionContainer}>
        <Container className={s.container}>
          <div className={`${s.gridLayout} ${s.collection}`}>
            <h4>
              The Stuart<br></br>Collection
            </h4>
            <div>
              <h6>About</h6>
              <nav className={s.sectionsWrapper}>
                <ul>
                  {data?.about &&
                    data?.about.sections?.map((section: any, index: number) => (
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
                              fill="rgba(255, 255, 255, 0.6)"
                            />
                          </svg>
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
            <div>
              <h6>The Collection</h6>
              <nav className={s.sectionsWrapper}>
                <ul>
                  {data?.theCollection &&
                    data?.theCollection.sections?.map((section: any, index: number) => (
                      <li key={index} className={s.section}>
                        <Link
                          href={'/' + data?.theCollection.slug + '#' + section.id}
                          className={s.sectionLink}
                        >
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
                              fill="rgba(255, 255, 255, 0.6)"
                            />
                          </svg>
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
            <div>
              <h6>Support</h6>
              <nav className={s.sectionsWrapper}>
                <ul>
                  {data?.support.sections?.map((section: any, index: number) => (
                    <li key={index} className={s.section}>
                      <Link
                        href={'/' + data.support.slug + '#' + section.id}
                        className={s.sectionLink}
                      >
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
                            fill="rgba(255, 255, 255, 0.6)"
                          />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </Container>
      </div>
      <div className={s.footerSectionContainer}>
        <Container>
          <div className={`${s.gridLayout} ${s.contact}`}>
            <h4>Contact</h4>
            <div className={s.content}>
              <nav className={s.sectionsWrapper}>
                <ul>
                  <li className={s.section}>
                    <Link href={'/contact'} className={s.sectionLink}>
                      <span>Contact Page</span>
                      <svg
                        width="7"
                        height="10"
                        viewBox="0 0 7 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 1.175L3.81667 5L3.34392e-07 8.825L1.175 10L6.175 5L1.175 0L0 1.175Z"
                          fill="rgba(255, 255, 255, 0.6)"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link href={`mailto:${data.email}`}>{data.email}</Link>
                  </li>
                  <li>
                    <Link href={`tel:${data.telephone}`}>{data.telephone}</Link>
                  </li>
                </ul>
              </nav>
              <div className={s.element}>
                <h6>Connect</h6>
                <div className={s.connectContent}>
                  {data.connect &&
                    data.connect.map((textRow: any, index: number) => {
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
            </div>
            <div className={s.newsletter}>
              <h6>{data.footer.titleNewsletter}</h6>
              <div className={s.sectionsWrapper}>
                <p>{data.footer.descriptionNewsletter}</p>
              </div>
              <div className={s.buttonWrapper}>
                <ButtonLink href="#newsletter" className={s.button} size={`sm`} color={`inverted`}>
                  Sign Up Now
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container className={s.container}>
        <div className={s.footerBottom}>
          <p>
            Copyright © {new Date().getFullYear()} Regents of the University of California. All
            rights reserved.
          </p>
        </div>
      </Container>
    </motion.footer>
  )
}

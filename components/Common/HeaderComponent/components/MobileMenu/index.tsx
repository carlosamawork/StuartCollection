'use client'

import s from './MobileMenu.module.scss'
import {motion, AnimatePresence} from 'framer-motion'
import Container from '@/components/Common/ui/Container'
import {ButtonLink} from '@/components/Common/ui/Buttons/components/ButtonLink'
import DateHeader from '@/components/Common/HeaderComponent/components/DateHeader'
import AccordeonComponent from '@/components/PageComponent/Accordeon/AccordeonComponent'
import Link from 'next/link'
import DirectionsComponent from '@/components/Common/DirectionsComponent/DirectionsComponent'

export default function MobileMenu({data, isOpen, close, backgroundColor}: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={s.container}
          style={{backgroundColor}}
          initial={{opacity: 0, y: -8}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -8}}
          transition={{duration: 0.2}}
        >
          <Container className={s.mobileMenu}>
            <div className={s.top}>
              <DateHeader />
              <div onClick={() => close()}>
                <ButtonLink href="/support-us" size="lg">
                  Support
                </ButtonLink>
              </div>
            </div>
            <AccordeonComponent
              small
              data={{
                items:
                  data?.menu?.links?.map((link, i) => {
                    const isExternalLink = !!link.url

                    return {
                      key: i,
                      label: link.title,
                      labelUrl: isExternalLink ? link.url : undefined,
                      onLabelUrlClick: isExternalLink ? close : undefined,
                      content: [
                        {
                          _type: 'free-component',
                          component: isExternalLink ? null : (
                            <DefaultMenuItem
                              sections={link.sections}
                              slug={link.slug}
                              onClick={close}
                            />
                          ),
                        },
                      ],
                    }
                  }) ?? [],
              }}
            />
            <AdditionalData data={data} />
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface DefaultMenuItemProps {
  sections: any
  slug: string
  onClick: () => void
}

const DefaultMenuItem = ({sections, slug, onClick}: DefaultMenuItemProps) => {
  return (
    <ul>
      {sections?.map((section: any, index: number) => {
        return (
          <li key={index} className={s.section}>
            <Link
              href={'/' + slug + '#' + section.id}
              className={s.sectionLink}
              onClick={() => onClick()}
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
                  fill="#747678"
                />
              </svg>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

const AdditionalData = ({data}: {data: any}) => {
  return (
    <div className={s.additionalData}>
      <DirectionsComponent directions={data.directions} googleMapsUrl={data.googleMapsUrl} />
      <div className={s.contactInfo}>
        <p>
          <Link href={`mailto:${data.email}`}>{data.email}</Link>
        </p>
        <p>
          <Link href={`tel:${data.telephone}`}>{data.telephone}</Link>
        </p>
      </div>
    </div>
  )
}

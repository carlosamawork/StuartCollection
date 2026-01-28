'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './AccordeonComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'
import TitleParagraphsComponent from '../TitleParagraphs'
import TextParagraphsComponent from './TextAccordeonParagraphs'
import CalloutComponent from '../Callout'
import SeparatorComponent from '../Separator'
import TextAccordeonParagraphsComponent from './TextAccordeonParagraphs'
import ImageComponent from '../Image'
import JumbotronComponent from '../Jumbotron'

export default function AccordeonComponent({data}: {data: any}) {
  
    return (
    <div className={s.accordeon}>
      <div className={s.accordeonItems}>
        {data.items &&
          data.items.map((item: any, index: number) => {
            return (
              <details
                key={item._key || index}
                className={`${s.accordeonItem} ${data.title ? s.withTitle : s.noTitle}`}
                open={item.openByDefault}
              >
                <summary className={s.accordeonItemSummary}>
                  <h3>{item.label}</h3>
                  <span className={`${s.icon} ${data.fullWidth ? s.fullWidth : ''}`}>
                    <svg
                      className={s.iconClosed}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M23.3333 13.3333H13.3333V23.3333H10V13.3333H0V10H10V0H13.3333V10H23.3333V13.3333Z"
                        fill="#747678"
                      />
                    </svg>

                    <svg
                      className={s.iconOpen}
                      width="14"
                      height="2"
                      viewBox="0 0 14 2"
                      fill="none"
                    >
                      <path d="M14 2H0V0H14V2Z" fill="#747678" />
                    </svg>
                  </span>
                </summary>
                <div className={s.accordeonItemContent}>
                  {item.content &&
                    item.content.map((mod: any, index: number) => {
                      return (
                        <div key={mod.id || index} className={s.moduleItem}>
                          {mod._type === 'module.titleParagraphs' && <TitleParagraphsComponent data={mod} />}
                          {/* Render module content based on its type */}
                          {mod._type === 'module.textParagraphs' && <TextAccordeonParagraphsComponent data={mod} fullWidth={mod.fullWidth} />}
                          {/* Add other module types as needed */}
                          {mod._type === 'module.callout' && <CalloutComponent data={mod} />}
                          {/* Add other module types as needed */}
                          {mod._type === 'module.separator' && <SeparatorComponent data={mod} />}
                          {/* Add other module types as needed */}
                          {mod._type === 'module.image' && <ImageComponent data={mod} />}
                          {/* Add other module types as needed */}
                          {mod._type === 'module.jumbotron' && <JumbotronComponent data={mod} />}
                        </div>
                      )
                    })}
                </div>
              </details>
            )
          })}
      </div>
    </div>
  )
}

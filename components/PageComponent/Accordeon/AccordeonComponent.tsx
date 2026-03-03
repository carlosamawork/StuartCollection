'use client'
import s from './AccordeonComponent.module.scss'
import TitleParagraphsComponent from '../TitleParagraphs'
import CalloutComponent from '../Callout'
import SeparatorComponent from '../Separator'
import TextAccordeonParagraphsComponent from './TextAccordeonParagraphs'
import ImageComponent from '../Image'
import JumbotronComponent from '../Jumbotron'
import Link from 'next/link'

type AccordeonItem = {
  _key: string
  label: string
  content: {
    _type: string
    id?: string
    fullWidth?: boolean
    component?: any
  }[]
  openByDefault?: boolean
  labelUrl?: string
  onLabelUrlClick?: string
}

interface AccordeonComponentProps {
  data: {
    items: AccordeonItem[]
    title?: string
    fullWidth?: boolean
  }
  small?: boolean
}

export default function AccordeonComponent({data, small}: AccordeonComponentProps) {
  return (
    <div className={`${s.accordeon} ${small ? s['accordeon--small'] : ''}`}>
      <div className={s.accordeonItems}>
        {data.items &&
          data.items.map((item: any, index: number) => {
            const noContent =
              item.content.length === 1 &&
              item.content[0]._type === 'free-component' &&
              !item.content[0].component

            return (
              <details
                key={item._key || index}
                className={`${s.accordeonItem} ${data.title ? s.withTitle : s.noTitle}`}
                open={item.openByDefault}
              >
                <summary className={s.accordeonItemSummary}>
                  <AccordeonLabel item={item} small={small} onClick={item.onLabelUrlClick} />
                  {!noContent && <AccordeonIcon fullWidth={data.fullWidth} />}
                </summary>
                <div className={s.accordeonItemContent}>
                  {item.content &&
                    item.content.map((mod: any, index: number) => {
                      return (
                        <div key={mod.id || index} className={s.moduleItem}>
                          {mod._type === 'module.titleParagraphs' && (
                            <TitleParagraphsComponent data={mod} />
                          )}
                          {/* Render module content based on its type */}
                          {mod._type === 'module.textParagraphs' && (
                            <TextAccordeonParagraphsComponent
                              data={mod}
                              fullWidth={mod.fullWidth}
                            />
                          )}
                          {/* Add other module types as needed */}
                          {mod._type === 'module.callout' && <CalloutComponent data={mod} />}
                          {/* Add other module types as needed */}
                          {mod._type === 'module.separator' && <SeparatorComponent data={mod} />}
                          {/* Add other module types as needed */}
                          {mod._type === 'module.image' && <ImageComponent data={mod} />}
                          {/* Add other module types as needed */}
                          {mod._type === 'module.jumbotron' && <JumbotronComponent data={mod} />}
                          {/* Add other module types as needed */}
                          {mod._type === 'free-component' && mod.component}
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

const AccordeonLabel = ({
  item,
  small,
  onClick,
}: {
  item: AccordeonItem
  small?: boolean
  onClick?: () => void
}) => {
  const content = small ? <h5>{item.label}</h5> : <h3>{item.label}</h3>

  if (item.labelUrl) {
    return (
      <Link href={item.labelUrl} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return content
}

const AccordeonIcon = ({fullWidth}: {fullWidth?: boolean}) => {
  return (
    <span className={`${s.icon} ${fullWidth ? s.fullWidth : ''}`}>
      <svg className={s.iconClosed} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M23.3333 13.3333H13.3333V23.3333H10V13.3333H0V10H10V0H13.3333V10H23.3333V13.3333Z"
          fill="#747678"
        />
      </svg>

      <svg className={s.iconOpen} width="14" height="2" viewBox="0 0 14 2" fill="none">
        <path d="M14 2H0V0H14V2Z" fill="#747678" />
      </svg>
    </span>
  )
}

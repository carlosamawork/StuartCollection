'use client'
import React, {useEffect, useState} from 'react'
import s from './PageComponent.module.scss'
import LazyImage from '../Common/LazyImage'
import Link from 'next/link'
import TextParagraphsComponent from './TextParagraphs'
import CalloutComponent from './Callout'
import SeparatorComponent from './Separator'
import TitleParagraphsComponent from './TitleParagraphs'
import AccordeonComponent from './Accordeon/AccordeonComponent'
import ImageComponent from './Image'
import JumbotronComponent from './Jumbotron'
import PeopleComponent from './People'
import TileGroupComponent from './TileGroup'
import VideoComponent from './Video'
import IframeComponent from './Iframe'
import TwoColumnsComponent from './TwoColumns'
import Container from '@/components/Common/ui/Container'
import {m} from 'framer-motion'
import SliderComponent from './Slider'
import MediaListComponent from './MediaList'
import TabsComponent from './Tabs'
import Breadcrumbs from '@/components/Common/ui/Breadcrumbs'
import {HeroCover} from '@/components/Common/ui/HeroCover'

export default function PageComponent({data}: {data: any}) {
  const [activeSection, setActiveSection] = useState<any | null>(null)
  const [topImage, setTopImage] = useState(false)
  const [separatorsMenu, setSeparatorsMenu] = useState<any | null>(null)
  console.log('PageComponent DATA', data)

  useEffect(() => {
    const defaultModule =
      data?.modules?.find((m: any) => m.defaultOpen === true) || data?.modules?.[0] || null

    setActiveSection(defaultModule)
    setTopImage(!!defaultModule?.topImage)
  }, [data])

  useEffect(() => {
    setSeparatorsMenu(
      activeSection?.modules?.filter(
        (mod: any) => mod._type === 'module.separator' && mod.anchorOnMenu,
      ) || [],
    )
  }, [activeSection])

  return (
    <div className={`${s.pageComponent}`}>
      <Container size="fullWidth">
        <HeroCover
          image={topImage ? activeSection?.topImage : undefined}
          height={`${(100 * 320) / 720}vh`}
        />
      </Container>
      <Container>
        <div className={`${s.content} ${!data.asideMenu ? s.noAsideMenu : ''}`}>
          {data.asideMenu && (
            <aside className={s.asideMenuContainer}>
              <nav className={s.menuNav}>
                <ul className={s.menuList}>
                  {data.modules?.map((module: any, index: number) => (
                    <li key={module.id || index}>
                      <Link
                        href={`#${module.id}`}
                        className={`${activeSection?.id === module.id ? s.active : ''} ${s.menuLink}`}
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveSection(module)
                          setTopImage(!!module?.topImage)
                        }}
                      >
                        <p>{module.title}</p>
                        <svg
                          width="7"
                          height="10"
                          viewBox="0 0 7 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 1.175L3.81667 5L0 8.825L1.175 10L6.175 5L1.175 0L0 1.175Z"
                            fill={
                              activeSection?.id === module.id ? '#000000' : 'rgba(39, 39, 40, 1)'
                            }
                          />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          <article className={s.contentContainer}>
            <Breadcrumbs
              breadcrumbs={[
                {label: 'Home', href: '/'},
                {label: data.title, href: `/${data.slug}/`},
                ...(activeSection?.title
                  ? [
                      {
                        label: activeSection?.title,
                        href: `#${activeSection?.id}`,
                      },
                    ]
                  : []),
              ]}
              showLastSlash={false}
            />
            <div className={s.moduleTitle}>
              <h1>{activeSection?.title}</h1>
              {separatorsMenu && separatorsMenu.length > 0 && (
                <nav className={s.separatorMenu}>
                  {separatorsMenu.map((sep: any, index: number) => (
                    <Link
                      key={sep.id || index}
                      href={`#${sep.anchorId}`}
                      className={s.separatorLink}
                    >
                      {sep.anchorOnMenu}
                    </Link>
                  ))}
                </nav>
              )}
            </div>
            <div className={s.moduleContent}>
              {activeSection &&
                activeSection?.modules &&
                activeSection?.modules.map((mod: any, index: number) => (
                  <div key={mod.id || index} className={s.moduleItem}>
                    {mod._type === 'module.textTitles' && (
                      <TitleParagraphsComponent data={mod} key={activeSection?.id} />
                    )}
                    {/* Render module content based on its type */}
                    {mod._type === 'module.textParagraphs' && (
                      <TextParagraphsComponent data={mod} key={activeSection?.id} />
                    )}
                    {/* Add other module types as needed */}
                    {mod._type === 'module.callout' && (
                      <CalloutComponent data={mod} key={activeSection?.id} />
                    )}
                    {/* Add other module types as needed */}
                    {mod._type === 'module.separator' && (
                      <SeparatorComponent data={mod} key={activeSection?.id} />
                    )}
                    {/* Add other module types as needed */}
                    {mod._type === 'module.accordion' && (
                      <AccordeonComponent data={mod} key={activeSection?.id} />
                    )}
                    {/* Add other module types as needed */}
                    {mod._type === 'module.image' && (
                      <ImageComponent data={mod} key={activeSection?.id} />
                    )}
                    {/* Add other module types as needed */}
                    {mod._type === 'module.jumbotron' && (
                      <JumbotronComponent data={mod} key={activeSection?.id} />
                    )}
                    {/* Add other module types as needed */}
                    {mod._type === 'module.people' && (
                      <PeopleComponent data={mod} key={activeSection?.id} />
                    )}
                    {/* Add other module types as needed */}
                    {mod._type === 'module.tileGroup' && (
                      <TileGroupComponent data={mod} key={activeSection?.id} />
                    )}
                    {/* Add other module types as needed */}
                    {mod._type === 'module.video' && (
                      <VideoComponent data={mod} key={activeSection?.id} />
                    )}
                    {/* Add other module types as needed */}
                    {mod._type === 'module.iframe' && (
                      <IframeComponent data={mod} key={activeSection?.id} />
                    )}
                    {/* Add other module types as needed */}
                    {mod._type === 'module.twoColumns' && (
                      <TwoColumnsComponent data={mod} key={activeSection?.id} />
                    )}
                    {mod._type === 'module.slider' && (
                      <SliderComponent data={mod} key={activeSection?.id} />
                    )}
                    {mod._type === 'module.mediaList' && (
                      <MediaListComponent data={mod} key={activeSection?.id} />
                    )}
                    {mod._type === 'module.tabs' && (
                      <TabsComponent data={mod} key={activeSection?.id} />
                    )}
                  </div>
                ))}
            </div>
          </article>
        </div>
      </Container>
    </div>
  )
}

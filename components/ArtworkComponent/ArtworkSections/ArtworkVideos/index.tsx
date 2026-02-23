'use client'

import {ArtworkVideosSectionData} from '@/sanity/queries/modules/artwork/videosSection'
import s from './ArtworkVideos.module.scss'
import Container from '@/components/Common/ui/Container'
import Slider from '@/components/Common/ui/Slider'
import SliderPagination from '@/components/Common/ui/SliderPagination'
import {useId} from 'react'
import VideoEmbed from '@/components/Common/VideoEmbed'

const TARGET_HEIGHT = 506 // PX

export default function ArtworkVideos({section}: {section: ArtworkVideosSectionData}) {
  const uid = useId()
  const id = uid.replace(/:/g, '')

  if (!section) return <></>

  const SlidesComponent = section.items.map((item: any, i: number) => (
    <div className={s.videoCard} key={`video-${i}`}>
      <VideoEmbed url={item.videoUrl} />
      <p className="p-small">{item.title}</p>
    </div>
  ))

  return (
    <div className={s.section}>
      <Container>
        <div className={s.top}>
          <h2>{section.title}</h2>
          <div className={s.topRight}>
            <p className="p-small">{section.description}</p>
            <SliderPagination id={id} />
          </div>
        </div>
      </Container>
      <Slider
        id={id}
        containerClassName={s.slider}
        slideClassName={s.slide}
        slides={SlidesComponent}
        swiperProps={{
          // centeredSlides: true,
          // loop: true, // si hay pocas slides, mejor no forzar loop
          speed: 700,
          slidesPerView: 'auto', // mobile con "peek"
          // spaceBetween: 32,
          // watchSlidesProgress: true,
          // autoHeight: false,
        }}
      />
    </div>
  )
}

const getImageWidth = (height: number) => {
  return (16 / 9) * height
}

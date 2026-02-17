'use client'

import Slider from '@/components/Common/ui/Slider'
import s from './ArtworkImages.module.scss'
import Image from 'next/image'
import {sanitizeFilename} from '@/utils/sanitizeFilename'
import Container from '@/components/Common/ui/Container'
import {ArtworkImagesSectionData} from '@/sanity/queries/modules/artwork/imagesSection'
import {useId} from 'react'
import SliderPagination from '@/components/Common/ui/SliderPagination'

interface ArtworkImagesProps {
  section: ArtworkImagesSectionData
}

const TARGET_HEIGHT = 491 // PX

export default function ArtworkImages({section}: ArtworkImagesProps) {
  const uid = useId()
  const id = uid.replace(/:/g, '')

  if (!section) return <></>

  return (
    <div className={s.section}>
      <Container>
        <div className={s.topContent}>
          <h2>{section.title}</h2>
          <SliderPagination id={id} />
        </div>
      </Container>
      <Slider
        id={id}
        containerClassName={s.slider}
        slideClassName={s.slide}
        slides={section.items.map((item, i, arr) => {
          const height = TARGET_HEIGHT
          const width = getImageWidth(item.metadata.dimensions, height)
          const isLastSlide = i === arr.length - 1

          return (
            <Image
              alt={sanitizeFilename(item.filename)}
              src={item.imageUrl}
              width={width}
              height={height}
              placeholder={'blur'}
              blurDataURL={'/blur.png'}
              style={{
                position: 'relative',
                width,
                height,
                maxWidth: 'unset',
              }}
            />
          )
        })}
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

const getImageWidth = (originalDimensions: {width: number; height: number}, height: number) => {
  return (originalDimensions.width / originalDimensions.height) * height
}

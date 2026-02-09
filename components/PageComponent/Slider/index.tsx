'use client'

import s from './Slider.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import LazyImage from '@/components/Common/LazyImage'

type SliderOptions = {
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean
  showArrows?: boolean
  showDots?: boolean
}

type SlideItem = {
  _key: string
  image?: any
  // si en el futuro añades video, url, link, etc.
}

type SliderData = {
  options?: SliderOptions
  slides?: SlideItem[]
}

export default function SliderComponent({ data }: { data: SliderData }) {
  const options = data?.options ?? {}
  const slides = data?.slides ?? []

  if (!slides.length) return null

  const swiperModules = [
    A11y,
    options.showArrows ? Navigation : null,
    options.showDots ? Pagination : null,
    options.autoplay ? Autoplay : null,
  ].filter(Boolean) as any[]

  return (
    <div className={s.slider}>
      <Swiper
        modules={swiperModules}
        loop={!!options.loop}
        navigation={!!options.showArrows}
        autoHeight={true}
        pagination={options.showDots ? { clickable: true } : false}
        autoplay={
          options.autoplay
            ? {
                delay: options.autoplayDelay ?? 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        slidesPerView={1}
        spaceBetween={0}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._key}>
            <div className={s.slide}>
              {slide?.image ? (
                <LazyImage
                    src={slide.image.imageUrl}
                    alt={slide.image.filename}
                    width={slide.image.metadata.dimensions.width}
                    height={slide.image.metadata.dimensions.height}
                    // si tu LazyImage soporta fill:
                    // fill
                    // sizes="100vw"
                    // priority={false}
                />
              ) : null}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
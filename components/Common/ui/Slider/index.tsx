'use client'

import React, {useState} from 'react'
import s from './Slider.module.scss'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination} from 'swiper/modules'

// Swiper styles (obligatorios)
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface SliderProps {
  id: string
  slides: React.ReactNode[]
  swiperProps?: React.ComponentProps<typeof Swiper>
  containerClassName?: string
  swiperClassName?: string
  slideClassName?: string
}

export default function Slider({
  id,
  slides,
  swiperProps,
  containerClassName,
  swiperClassName,
  slideClassName,
}: SliderProps) {
  const [ready, setReady] = useState(false)

  const paginationClasses = {
    prevClass: `sliderPrev_${id}`,
    nextClass: `sliderNext_${id}`,
    paginationClass: `sliderPagination_${id}`,
  }

  return (
    <div
      className={`${s.sliderComponent} ${!ready ? s['sliderComponent--idle'] : ''} ${containerClassName}`}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: `.${paginationClasses.prevClass}`,
          nextEl: `.${paginationClasses.nextClass}`,
        }}
        pagination={{
          el: `.${paginationClasses.paginationClass}`,
          clickable: true,
          bulletClass: 'bullet',
          bulletActiveClass: 'bulletActive',
        }}
        {...swiperProps}
        onInit={() => setReady(true)}
        className={`${s.swiper} ${swiperClassName}`}
      >
        {slides?.map((slide: React.ReactNode, index: number) => (
          <SwiperSlide key={index} className={`${s.swiperSlide} ${slideClassName}`}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

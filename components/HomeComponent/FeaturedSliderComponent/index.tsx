'use client'

import {useId} from 'react'
import LazyImage from '@/components/Common/LazyImage'
import s from './FeaturedSliderComponent.module.scss'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import {useRef} from 'react'
import type {Swiper as SwiperType} from 'swiper'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination} from 'swiper/modules'

// Swiper styles (obligatorios)
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import Container from '@/components/Common/ui/Container'

function applySecondClasses(swiper: any, total: number, s: Record<string, string>) {
  if (!total) return

  const wrap = (i: number) => ((i % total) + total) % total

  const activeReal = swiper.realIndex // índice real (0..total-1)
  const prev2Real = wrap(activeReal - 2)
  const next2Real = wrap(activeReal + 2)

  // 1) reset: quita clases de todos los slides (incluye clones)
  swiper.slides.forEach((el: HTMLElement) => {
    el.classList.remove(s.prev2, s.next2)
  })

  // 2) aplica a los que correspondan por data-swiper-slide-index
  swiper.slides.forEach((el: HTMLElement) => {
    const idxAttr = el.getAttribute('data-swiper-slide-index')
    if (idxAttr == null) return

    const real = Number(idxAttr)
    if (Number.isNaN(real)) return

    if (real === prev2Real) el.classList.add(s.prev2)
    if (real === next2Real) el.classList.add(s.next2)
  })
}

export default function FeaturedSliderComponent({data}: {data: any}) {
  const uid = useId()
  const swiperRef = useRef<SwiperType | null>(null)

  const dotsDesktopRef = useRef<HTMLDivElement | null>(null)
  const dotsMobileRef = useRef<HTMLDivElement | null>(null)

  const prevClass = `featuredPrev_${uid.replace(/:/g, '')}`
  const nextClass = `featuredNext_${uid.replace(/:/g, '')}`
  const paginationClass = `featuredPagination_${uid.replace(/:/g, '')}`

  return (
    <div className={s.featuredSlider}>
      <Container>
        <div className={s.topContent}>
          {data.title && <h2 className={s.title}>{data.title}</h2>}

          {/* Arrows + dots fuera del Swiper */}
          <div className={`${s.arrowsAndDots} desktopOnly`}>
            <button className={`${s.arrow} ${s.prev} ${prevClass}`} aria-label="Previous slide">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z" fill="#272728" />
              </svg>
            </button>

            <div className={`${s.dots} ${paginationClass}`} ref={dotsDesktopRef}/>

            <button className={`${s.arrow} ${s.next} ${nextClass}`} aria-label="Next slide">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1.41L4.58 6L4.0127e-07 10.59L1.41 12L7.41 6L1.41 0L0 1.41Z"
                  fill="#272728"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <div className={s.slider}>
        <Swiper
          modules={[Navigation, Pagination]}
          centeredSlides
          loop={true} // si hay pocas slides, mejor no forzar loop
          speed={700}
          slidesPerView={1.2} // mobile con "peek"
          spaceBetween={32}
          navigation={{
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
          }}
          pagination={{
            el: dotsDesktopRef.current, // 👈 solo uno (el “source of truth”)
            clickable: true,
            bulletClass: s.bullet,
            bulletActiveClass: s.bulletActive,
            renderBullet: (index, className) => `<span class="${className}"></span>`,
          }}
          watchSlidesProgress
          onInit={(swiper) => applySecondClasses(swiper, data.slides.length, s)}
          onSlideChange={(swiper) => applySecondClasses(swiper, data.slides.length, s)}
          onSetTranslate={(swiper) => applySecondClasses(swiper, data.slides.length, s)} // opcional, más “en vivo”
          onSwiper={(swiper) => {
            swiperRef.current = swiper

            const syncDots = () => {
              const src = dotsDesktopRef.current
              const dst = dotsMobileRef.current
              if (!src || !dst) return
              dst.innerHTML = src.innerHTML
            }

            // montar paginación cuando ya hay DOM
            swiper.params.pagination = {
              ...(swiper.params.pagination as any),
              el: dotsDesktopRef.current,
            }
            swiper.pagination.init()
            swiper.pagination.render()
            swiper.pagination.update()

            // sincroniza el segundo contenedor
            requestAnimationFrame(syncDots)

            swiper.on('paginationUpdate', () => requestAnimationFrame(syncDots))
            swiper.on('realIndexChange', () => requestAnimationFrame(syncDots))
            swiper.on('slideChangeTransitionEnd', () => requestAnimationFrame(syncDots))
          }}
          className={s.swiper}
          breakpoints={{
            768: {
              slidesPerView: 3.5,
              spaceBetween: 0,
            }
          }
          }
        >
          {data?.slides?.map((slide: any, index: number) => (
            <SwiperSlide key={index} className={s.swiperSlide}>
              <Link
                href={slide.link.href}
                target={slide.link.blank ? '_blank' : '_self'}
                rel={slide.link.blank ? 'noopener noreferrer' : undefined}
              >
                {/* Wrap para poder escalar fácil el "card" */}
                <div className={s.slideCard}>
                  <div className={s.media}>
                    <LazyImage
                      src={slide.image.imageUrl}
                      alt={slide.image.alt || `Slide Image ${index + 1}`}
                      width={slide.image.metadata.dimensions.width}
                      height={slide.image.metadata.dimensions.height}
                      fill={true}
                      objectFit="cover"
                    />
                  </div>

                  <div className={s.content}>
                    {slide.title && <h3 className={s.slideTitle}>{slide.title}</h3>}
                    {slide.subtitle && <h4 className={s.slideSubtitle}>{slide.subtitle}</h4>}

                    {slide.description && <p className={s.slideDescription}>{slide.description}</p>}

                    {slide.link?.href && (
                      <div className={`ctaButton ${s.ctaButton}`}>
                        <svg
                          width="8"
                          height="12"
                          viewBox="0 0 8 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 1.41L4.58 6L4.0127e-07 10.59L1.41 12L7.41 6L1.41 0L0 1.41Z"
                            fill="#272728"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={`${s.arrowsAndDots} mobileOnly`}>
            <button className={`${s.arrow} ${s.prev} ${prevClass}`} aria-label="Previous slide">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z" fill="#272728" />
              </svg>
            </button>

            <div className={`${s.dots} ${paginationClass}`} ref={dotsMobileRef}/>

            <button className={`${s.arrow} ${s.next} ${nextClass}`} aria-label="Next slide">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1.41L4.58 6L4.0127e-07 10.59L1.41 12L7.41 6L1.41 0L0 1.41Z"
                  fill="#272728"
                />
              </svg>
            </button>
          </div>
    </div>
  )
}

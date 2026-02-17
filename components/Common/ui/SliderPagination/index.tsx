'use client'

import s from './SliderPagination.module.scss'

interface SliderPaginationProps {
  id: string
}

export default function SliderPagination({id}: SliderPaginationProps) {
  const paginationClasses = {
    prevClass: `sliderPrev_${id}`,
    nextClass: `sliderNext_${id}`,
    paginationClass: `sliderPagination_${id}`,
  }

  return (
    <div className={s.sliderPagination}>
      <button
        className={`${s.arrow} ${s.prev} ${paginationClasses.prevClass}`}
        aria-label="Previous slide"
      >
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

      <div className={`${s.dots} ${paginationClasses.paginationClass}`} />

      <button
        className={`${s.arrow} ${s.next} ${paginationClasses.nextClass}`}
        aria-label="Next slide"
      >
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 1.41L4.58 6L4.0127e-07 10.59L1.41 12L7.41 6L1.41 0L0 1.41Z" fill="#272728" />
        </svg>
      </button>
    </div>
  )
}

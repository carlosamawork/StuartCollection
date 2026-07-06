'use client'

import { useMemo, useState, useEffect } from 'react'
import s from './TileGroup.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import Link from 'next/link'

const PAGE_SIZE = 10

export default function TileGroupComponent({ data }: { data: any }) {
  const tiles = data?.tiles ?? []

  const totalPages = Math.max(1, Math.ceil(tiles.length / PAGE_SIZE))
  const [page, setPage] = useState(1)

  // Si cambia el contenido (filtros, idioma, etc.), volvemos a la página 1
  useEffect(() => {
    setPage(1)
  }, [tiles.length])

  const pageTiles = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return tiles.slice(start, start + PAGE_SIZE)
  }, [tiles, page])

  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages))

  return (
    <div className={s.tileGroup}>
      {data.title && <h2 className={s.groupTitle}>{data.title}</h2>}

      <div
        className={`${data.layout === 'list' ? s.tileList : s.tileGrid} ${s[`col-${data.columns}`]}`}
      >
        {pageTiles.map((tile: any, index: number) => (
          <div
            key={tile._key || index}
            className={`${s.tileItem} ${!tile.image ? s.noImage : ''}`}
          >
            <Link href={tile.link ? tile.link : '#'} className={s.tileLink}>
              {tile.image && (
                <div className={s.tileImage}>
                  <LazyImage
                    src={tile.image.imageUrl}
                    alt={tile.image.filename || 'Tile Image'}
                    width={tile.image.metadata.dimensions.width}
                    height={tile.image.metadata.dimensions.height}
                    fill={true}
                    objectFit="cover"
                  />
                </div>
              )}

              <div className={s.tileContent}>
                <div>
                  {tile.title && <h6 className={s.tileTitle}>{tile.title}</h6>}
                  {tile.subtitle && <p className={s.tileSubtitle}>{tile.subtitle}</p>}
                </div>

                <div>
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M-4.62904e-07 1.41L4.58 6L-6.16331e-08 10.59L1.41 12L7.41 6L1.41 -6.16331e-08L-4.62904e-07 1.41Z"
                      fill="#A2A4A5"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination bottom */}
      {totalPages > 1 && (
        <div className={s.pagination}>
          <button
            className={s.pageBtn}
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
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

          <div className={s.pageNumbers}>
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1
              return (
                <button
                  key={p}
                  className={`${s.pageNumber} ${p === page ? s.active : ''}`}
                  onClick={() => goTo(p)}
                  aria-current={p === page ? 'page' : undefined}
                >
                  {p}
                </button>
              )
            })}
          </div>

          <button
            className={s.pageBtn}
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
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
      )}
    </div>
  )
}
import LazyVideo from '@/components/Common/LazyVideo'
import s from './TileGroup.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBlockComponents} from '@/utils/portableText'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'

export default function TileGroupComponent({data}: {data: any}) {
    console.log('TileGroup data:', data);
  return (
    <div className={s.tileGroup}>
      {data.title && <h2 className={s.groupTitle}>{data.title}</h2>}
      <div
        className={`${data.layout === 'list' ? s.tileList : s.tileGrid} ${s[`col-${data.columns}`]}`}
      >
        {data.tiles &&
          data.tiles.map((tile: any, index: number) => {
            return (
              <div key={tile._key || index} className={s.tileItem}>
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
                      <svg
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M-4.62904e-07 1.41L4.58 6L-6.16331e-08 10.59L1.41 12L7.41 6L1.41 -6.16331e-08L-4.62904e-07 1.41Z"
                          fill="#A2A4A5"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

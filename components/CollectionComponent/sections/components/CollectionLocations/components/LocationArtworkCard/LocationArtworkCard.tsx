'use client'

import {CollectionArtworkData} from '@/sanity/queries/queries/collection'
import s from './LocationArtworkCard.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {pinString} from '@/components/Common/CustomMap/hooks/useGoogleMap'

type LocationPin = {index: number; isExterior: boolean; onClick: (event: any) => void}

interface LocationArtworkCardProps {
  artwork: CollectionArtworkData
  locationsPins: LocationPin[]
}

export default function LocationArtworkCard({artwork, locationsPins}: LocationArtworkCardProps) {
  if (!artwork) return <></>

  return (
    <div className={s.card}>
      <div className={s.left}>
        <p>{artwork.title}</p>
        <div className={s.artistsContainer}>
          {artwork.artists.map((artist: any, i: number) => (
            <span className={s.artist} key={i}>
              {artist.name}
            </span>
          ))}
        </div>
        <ul className={s.locationsContainer}>
          {locationsPins.map((pin: LocationPin, i: number) => (
            <li className={s.location} key={i}>
              <LocationPinComponent {...pin} />
            </li>
          ))}
        </ul>
      </div>
      <div className={s.imageContainer}>
        <div className={s.image}>
          {artwork.image?.imageUrl && (
            <LazyImage
              src={artwork.image.imageUrl}
              alt={artwork.image.filename || 'Artwork Thumbnail'}
              width={artwork.image.metadata.dimensions.width}
              height={artwork.image.metadata.dimensions.height}
              // fill
              // objectFit="cover"
            />
          )}
        </div>
      </div>
    </div>
  )
}

const LocationPinComponent = ({index, isExterior, onClick}: LocationPin) => {
  return (
    <button onClick={onClick}>
      <div dangerouslySetInnerHTML={{__html: pinString(index.toString(), isExterior)}} />
    </button>
  )
}

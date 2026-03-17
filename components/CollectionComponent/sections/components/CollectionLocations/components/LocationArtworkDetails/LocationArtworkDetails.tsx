'use client'

import {CollectionArtworkData} from '@/sanity/queries/queries/collection'
import s from './LocationArtworkDetails.module.scss'
import TextBody from '@/components/Common/ui/TextBody'
import {ButtonLink} from '@/components/Common/ui/Buttons/components/ButtonLink'
import LazyImage from '@/components/Common/LazyImage'
import Icon from '@/components/Common/ui/Icon'

export default function LocationArtworkDetails({
  artwork,
  handleClickBack,
}: {
  artwork: CollectionArtworkData
  handleClickBack: () => void
}) {
  if (!artwork) return <></>

  return (
    <div className={s.details}>
      <div className={s.backContainer}>
        <button onClick={() => handleClickBack()}>
          <Icon name="chevronLeft" size={16} />
          <p className="p-small">
            <strong>{'Back'}</strong>
          </p>
        </button>
      </div>
      <article className={s.content}>
        <div className={s.titleContainer}>
          <h5>{artwork.title}</h5>
          <div className={s.artistsContainer}>
            {artwork.artists.map((artist: any, i: number) => (
              <span className={s.artist} key={i}>
                {artist.name}
              </span>
            ))}
          </div>
        </div>
        <div className={s.imageContainer}>
          <div className={s.image}>
            {artwork.image?.imageUrl && (
              <LazyImage
                src={artwork.image.imageUrl}
                alt={artwork.image.filename || 'Artwork Thumbnail'}
                width={artwork.image.metadata.dimensions.width}
                height={artwork.image.metadata.dimensions.height}
              />
            )}
          </div>
        </div>
        <TextBody body={artwork.summary} />
        <div className={s.buttonContainer}>
          <ButtonLink href={`/collection/artwork/${artwork.slug}`}>{'View Artwork'}</ButtonLink>
        </div>
      </article>
    </div>
  )
}

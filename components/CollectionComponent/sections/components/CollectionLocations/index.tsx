'use client'

import {
  CollectionArtworkData,
  CollectionData,
  CollectionLocationData,
} from '@/sanity/queries/queries/collection'
import s from './CollectionLocations.module.scss'
import Container from '@/components/Common/ui/Container'
import CustomMap from '@/components/Common/CustomMap/CustomMap'
import {LocationsMap} from '@/utils/Locations.map'
import LocationArtworkCard from '@/components/CollectionComponent/sections/components/CollectionLocations/components/LocationArtworkCard/LocationArtworkCard'
import TextBody from '@/components/Common/ui/TextBody'
import {useRef, useState} from 'react'
import LocationArtworkDetails from '@/components/CollectionComponent/sections/components/CollectionLocations/components/LocationArtworkDetails/LocationArtworkDetails'

interface Props {
  artworks: CollectionArtworkData[]
  locations: CollectionLocationData[]
  copys: CollectionData['copys']
}

export default function CollectionLocations({artworks, locations, copys}: Props) {
  const [mapCenter, setMapCenter] = useState<google.maps.LatLng | null>(null)
  const [showArtworkDetail, setShowArtworkDetail] = useState<number | null>(null)
  const scrollableItemsRef = useRef({})

  const scrollToItem = (id: string) => {
    scrollableItemsRef.current[id]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest', // Scrolls only enough to bring into view
      inline: 'start',
    })
  }

  const handleClickBack = () => {
    setShowArtworkDetail(null)
  }

  const mapLocations = locations.map(LocationsMap.toCoordinates)
  const locationsIds = locations.map((location) => location._id)

  const ArtworkList = (
    <>
      <div className={s.intro}>
        <h4>{copys.locationsTitle}</h4>
        <TextBody body={copys.locationsText} />
      </div>

      <ul className={s.artworks}>
        {artworks.map((artwork, i) => (
          <li key={artwork._id} ref={(el) => (scrollableItemsRef.current[artwork._id] = el)}>
            <div onClick={() => setShowArtworkDetail(i)}>
              <LocationArtworkCard
                artwork={artwork}
                locationsPins={artwork.locations.map((location) => ({
                  index: locationsIds.findIndex((_id) => _id === location._id) + 1,
                  isExterior: location.isExterior,
                  onClick: (event) => {
                    event.stopPropagation()
                    setMapCenter(
                      new google.maps.LatLng(location.geopoint.lat, location.geopoint.lng),
                    )
                  },
                }))}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  )

  const ArtworkDetail = (
    <LocationArtworkDetails
      artwork={artworks[showArtworkDetail as number]}
      handleClickBack={handleClickBack}
    />
  )

  return (
    <Container>
      <div className={s.section}>
        <div className={s.grid}>
          <aside>{showArtworkDetail === null ? ArtworkList : ArtworkDetail}</aside>
          <div className={s.map}>
            <CustomMap
              locations={mapLocations}
              showNumbers
              onClick={(index) => {
                const location = locations[index - 1]
                scrollToItem(location?.firstArtwork?._id)
              }}
              centerOnClick
              mapCenter={mapCenter}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

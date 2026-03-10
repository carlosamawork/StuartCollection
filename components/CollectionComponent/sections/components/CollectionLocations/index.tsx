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
  const [showArtworkDetail, setShowArtworDetail] = useState<number | null>(null)
  const scrollableItemsRef = useRef({})

  const scrollToItem = (id: string) => {
    scrollableItemsRef.current[id]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleClickBack = () => {
    setShowArtworDetail(null)
  }

  const mapLocations = locations.map(LocationsMap.toCoordinates)
  const locationsIds = locations.map((location) => location._id)

  return (
    <Container>
      <div className={s.section}>
        <div className={s.grid}>
          {showArtworkDetail ? (
            <LocationArtworkDetails
              artwork={artworks[showArtworkDetail]}
              handleClickBack={handleClickBack}
            />
          ) : (
            <aside>
              <h2>{copys.locationsTitle}</h2>
              <TextBody body={copys.locationsText} />
              <ul className={s.artworks}>
                {artworks.map((artwork, i) => (
                  <li
                    key={artwork._id}
                    ref={(el) => (scrollableItemsRef.current[artwork._id] = el)}
                  >
                    <button onClick={() => setShowArtworDetail(i)}>
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
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}
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

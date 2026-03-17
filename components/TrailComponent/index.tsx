import s from './TrailComponent.module.scss'
import Container from '@/components/Common/ui/Container'
import {HeroCover} from '@/components/Common/ui/HeroCover'
import ShareComponent from '@/components/Common/ShareComponent'
import Breadcrumbs from '@/components/Common/ui/Breadcrumbs'
import {buildUrl} from '@/utils/seoHelper'
import {TrailData} from '@/sanity/queries/queries/trail'
import TextBody from '@/components/Common/ui/TextBody'
import TrailArtworksComponent from '@/components/TrailComponent/TrailArtworksComponent+'
import CustomMap from '@/components/Common/CustomMap/CustomMap'
import {LocationsMap} from '@/utils/Locations.map'

export default function TrailComponent({data}: {data: TrailData}) {
  if (!data) return <></>

  console.log(getLocations(data))

  return (
    <div className={s.component}>
      <Container className={s.hero}>
        <HeroCover {...data.hero} flat />
      </Container>
      <Container>
        <div className={s.top}>
          <Breadcrumbs
            breadcrumbs={[
              {label: 'Home', href: '/'},
              {label: 'The Collection', href: '/collection'},
              {label: 'Trails', href: '/collection#trails'},
            ]}
          />
          <div className={s.title}>
            <h1>{data.title}</h1>
            <div className={s.shareDesktop}>
              <ShareComponent
                url={buildUrl(`/collection/trail/${data.slug}/`)}
                pageTitle={data.title}
              />
            </div>
          </div>
        </div>
        <article className={s.article}>
          {data.body && (
            <div className={s.text}>
              <div className={s.textInner}>
                <TextBody body={data.body} />
              </div>
              <div className={s.shareMobile}>
                <ShareComponent
                  url={buildUrl(`/collection/trail/${data.slug}/`)}
                  pageTitle={data.title}
                />
              </div>
            </div>
          )}
          <div className={s.mapContainer}>
            <div className={s.map}>
              <CustomMap locations={getLocations(data)} showTrail showNumbers />
            </div>
          </div>
        </article>
      </Container>
      <TrailArtworksComponent data={data.artworks} />
    </div>
  )
}

const getLocations = (data: TrailData) => {
  let counter = 0

  return data.artworks.flatMap((artwork) => {
    const artworkLocations = [
      ...artwork.locations.map((location, i, array) => {
        const coordinates = {...LocationsMap.toCoordinates(location, counter)}
        console.log(artwork.title, coordinates, array)
        if (i + 1 !== array.length) {
          console.log('add counter inside', counter)
          counter++
        }
        return coordinates
      }),
    ]
    console.log('add counter outside')
    counter++
    return artworkLocations
  })
}

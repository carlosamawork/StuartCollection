import ArtworkBodyModules from '@/components/ArtworkComponent/ArtworkBodyModules'
import s from './ArtworkComponent.module.scss'
import SpecsComponent from '@/components/ArtworkComponent/SpecsComponent'
import Container from '@/components/Common/ui/Container'
import {HeroCover} from '@/components/Common/ui/HeroCover'
import ShareComponent from '@/components/Common/ShareComponent'
import {buildUrl} from '@/utils/seoHelper'
import ArtworkSections from '@/components/ArtworkComponent/ArtworkSections'
import {ArtworkData} from '@/sanity/queries/queries/artwork'
import RelatedArtworksComponent from '@/components/ArtworkComponent/RelatedArtworksComponent'

export default function ArtworkComponent({data}: {data: ArtworkData}) {
  return (
    <div className={s.artworkComponent}>
      <Container variant="fullWidth">
        <HeroCover
          {...data.hero}
          height={`85vh`}
          // height={`${(100 * (632 - 2 * 32)) / 720}vh`}
          marginBottom="32px"
        />
      </Container>
      <Container>
        <div className={s.introSection}>
          <SpecsComponent data={data} />
          <article className={s.body}>
            <ArtworkBodyModules modules={data.body_modules} />
            <ShareComponent
              url={buildUrl(`/collection/artwork/${data.slug}/`)}
              pageTitle={data.title}
            />
          </article>
        </div>
      </Container>
      <ArtworkSections data={data} />
      <RelatedArtworksComponent data={data.related} />
    </div>
  )
}

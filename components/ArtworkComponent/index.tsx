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
      <Container className={s.hero}>
        <HeroCover {...data.hero} />
      </Container>
      <Container>
        <div className={s.introSection}>
          <div className={s.leftStickyContainer}>
            <SpecsComponent data={data} />
          </div>
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

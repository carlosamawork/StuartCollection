import ArtworkBodyModules from '@/components/ArtworkComponent/ArtworkBodyModules'
import s from './ArtworkComponent.module.scss'
import SpecsComponent from '@/components/ArtworkComponent/SpecsComponent'
import Container from '@/components/Common/ui/Container'
import {HeroCover} from '@/components/Common/ui/HeroCover'
import ShareComponent from '@/components/Common/ShareComponent'
import {BASE_URL, buildUrl} from '@/utils/seoHelper'
import ArtworkSections from '@/components/ArtworkComponent/ArtworkSections'

export default function ArtworkComponent({data}: {data: ArtworkData}) {
  return (
    <div className={s.artworkComponent}>
      <Container size="fullWidth">
        <HeroCover
          imageSrc={data.featuredImage}
          height={`85vh`}
          // height={`${(100 * (632 - 2 * 32)) / 720}vh`}
        />
      </Container>
      <Container>
        <div className={s.introSection}>
          <SpecsComponent data={data} />
          <article className={s.body}>
            <ArtworkBodyModules modules={data.body_modules} />
            <ShareComponent url={buildUrl(`/collection/${data.slug}/`)} pageTitle={data.title} />
          </article>
        </div>
      </Container>
      <ArtworkSections data={data} />
    </div>
  )
}

export type ArtworkData = {
  title: string
  slug: string
  artists: {name: string}[]
  featuredImage: any
  specs: {
    themes: {title: string}[]
    year: number
    visitDescription: any
    location: {name: string; href: string; iframe: string}
  }
  body_modules: any[]
  sections: any[]
}

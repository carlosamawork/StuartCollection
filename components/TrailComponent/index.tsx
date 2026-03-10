import s from './TrailComponent.module.scss'
import Container from '@/components/Common/ui/Container'
import {HeroCover} from '@/components/Common/ui/HeroCover'
import ShareComponent from '@/components/Common/ShareComponent'
import Breadcrumbs from '@/components/Common/ui/Breadcrumbs'
import {buildUrl} from '@/utils/seoHelper'
import {TrailData} from '@/sanity/queries/queries/trail'
import TextBody from '@/components/Common/ui/TextBody'
import TrailArtworksComponent from '@/components/TrailComponent/TrailArtworksComponent+'
import IframeComponent from '@/components/PageComponent/Iframe'

export default function TrailComponent({data}: {data: TrailData}) {
  if (!data) return <></>

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
          {/* // TODO ADD MAP */}
        </article>
      </Container>
      <TrailArtworksComponent data={data.artworks} />
    </div>
  )
}

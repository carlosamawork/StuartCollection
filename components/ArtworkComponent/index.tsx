import s from './ArtworkComponent.module.scss'
import SpecsComponent from '@/components/ArtworkComponent/SpecsComponent'
import Container from '@/components/Common/ui/Container'

export default function ArtworkComponent({data}: {data: ArtworkData}) {
  // console.log('ARTWORK DATA', data)
  // console.log('ARTWORK DATA', data.featuredImage)
  // console.log('ARTWORK DATA', data.specs)
  // console.log('ARTWORK DATA', data.body_modules[1])
  // console.log('ARTWORK DATA', data.sections)
  return (
    <Container>
      <div className={s.artworkComponent}>
        <SpecsComponent data={data} />
      </div>
    </Container>
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

import s from './ArtworkComponent.module.scss'

export default function ArtworkComponent({data}: {data: any}) {
  // console.log('ARTWORK DATA', data)
  // console.log('ARTWORK DATA', data.featuredImage)
  // console.log('ARTWORK DATA', data.details)
  // console.log('ARTWORK DATA', data.body_modules[1])
  // console.log('ARTWORK DATA', data.sections)
  return <div className={`${s.artworkComponent}`}>Artwork Component {data.slug}</div>
}

import s from './ArtworkComponent.module.scss'

export default function ArtworkComponent({data}: {data: any}) {
  console.log('ARTWORK DATA', data)
  return <div className={`${s.artworkComponent}`}>Artwork Component {data.slug}</div>
}

import {PortableText} from 'next-sanity'
import s from './DirectionsComponent.module.scss'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Icon from '@/components/Common/ui/Icon'

export default function DirectionsComponent({directions, googleMapsUrl, strong}: any) {
  return (
    <div className={s.component}>
      {directions &&
        directions.map((textRow: any, index: number) => {
          return (
            <PortableText
              key={textRow._key}
              value={[textRow]}
              components={portableBodyComponents()}
            />
          )
        })}
      <a href={googleMapsUrl} target="_blank" className={s.link}>
        {strong ? <strong> {'View on Google Maps'}</strong> : 'View on Google Maps'}
        <Icon name="externalLink" />
      </a>
    </div>
  )
}

import s from './TextBody.module.scss'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'

interface TextBodyProps {
  body: any
  size?: 'default' | 'sm' | 'md'
}

export default function TextBody({body, size = 'default'}: TextBodyProps) {
  return (
    <div className={`${s.text} ${s[`text--${size}`]}`}>
      {body &&
        body.map((textRow: any) => {
          return (
            <PortableText
              key={textRow._key}
              value={[textRow]}
              components={portableBodyComponents()}
            />
          )
        })}
    </div>
  )
}

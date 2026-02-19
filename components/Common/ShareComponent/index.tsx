'use client'

import s from './ShareComponent.module.scss'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailIcon,
  EmailShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
} from 'next-share'

interface ShareComponentProps {
  url: string
  pageTitle: string
  quote?: string
  hastag?: string
  size?: number
}

export default function ShareComponent({url, size = 28, ...shareProps}: ShareComponentProps) {
  if (!url) return <></>

  const emailSubject: string = 'Check out Stuart Collection!'
  const emailBody: string = `Check this in Stuart Collection webpage: ${shareProps.pageTitle}.${shareProps.quote ? `Quote: "${shareProps.quote}"` : ''}`

  return (
    <div className={s.shareComponent}>
      <p>
        <strong>Share</strong>
      </p>
      <div className={s.icons}>
        <div className={s.icon}>
          <FacebookShareButton
            url={url}
            quote={shareProps.quote ?? shareProps.pageTitle}
            hashtag={shareProps.hastag ?? '#stuart-collection'}
          >
            <FacebookIcon size={size} round iconFillColor="#E7ECF2" bgStyle={{fill: '#4d4f50ff'}} />
          </FacebookShareButton>
        </div>
        <div className={s.icon}>
          <TwitterShareButton url={url} title={shareProps.pageTitle}>
            <TwitterIcon size={size} round iconFillColor="#E7ECF2" bgStyle={{fill: '#4d4f50ff'}} />
          </TwitterShareButton>
        </div>
        <div className={s.icon}>
          <WhatsappShareButton url={url} title={shareProps.pageTitle} separator=":: ">
            <WhatsappIcon size={size} round iconFillColor="#E7ECF2" bgStyle={{fill: '#4d4f50ff'}} />
          </WhatsappShareButton>
        </div>
        <div className={s.icon}>
          <EmailShareButton url={url} subject={emailSubject} body={emailBody}>
            <EmailIcon size={size} round iconFillColor="#E7ECF2" bgStyle={{fill: '#4d4f50ff'}} />
          </EmailShareButton>
        </div>
      </div>
    </div>
  )
}

import '../../styles/common/tailwind.css'
import '../../styles/main.scss'

import React, {Suspense} from 'react' // adjust the path accordingly
import WebProvider from '../../context/webContext'
import HeaderComponent from '../../components/Common/HeaderComponent'
import FooterComponent from '../../components/Common/FooterComponent'

import NewsletterComponent from '@/components/Common/NewsletterComponent'

import CookieConsent from '@/components/Common/CookieConsent/CookieConsent'
import ConsentGate from '@/components/Common/Analytics/consentGate'

import Analytics from '@/components/Common/Analytics/google'
import FacebookPixel from '@/components/Common/Analytics/facebook'
import PinterestTag from '@/components/Common/Analytics/pinterest'
import Hotjar from '@/components/Common/Analytics/hotjar'
import {get} from 'http'
import {getHeader} from '@/sanity/queries/common/header'
import Body from '@/components/Common/ui/Body'

const RawHTML = ({html}: any) => (
  <div className="credits" dangerouslySetInnerHTML={{__html: html}} />
)

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const headerData = await getHeader()

  return (
    <html lang="en">
      <Body>
        <RawHTML
          html="<!-- ----------------------------------------------------- -->
        <!-- Code by Cacho Salvador, http://cachosalvador.com (2026) -->
        <!-- ----------------------------------------------------- -->"
        />
        <WebProvider>
          <div
            style={{
              position: 'relative',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <HeaderComponent data={headerData} />
            <div style={{flexGrow: 1}}>{children}</div>

            {/* Cookie Consent */}
            <CookieConsent />
            {process.env.NODE_ENV === 'production' && (
              <>
                <ConsentGate category="analytics">
                  <Analytics />
                  {/* <Hotjar /> */}
                </ConsentGate>

                {/* <ConsentGate category="marketing">
                <FacebookPixel />
                <PinterestTag />
              </ConsentGate> */}
              </>
            )}
            {/* Cookie Consent */}

            <FooterComponent />
          </div>
        </WebProvider>
      </Body>
    </html>
  )
}

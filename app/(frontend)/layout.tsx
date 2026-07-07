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
import {getHeader} from '@/sanity/queries/common/header'
import Body from '@/components/Common/ui/Body'
import {getFooter} from '@/sanity/queries/common/footer'
import type {Viewport} from 'next'
import {jsonLdScript} from '@/utils/metadata'
import {BASE_URL, BASE_IMAGE_URL, linkInstagram, siteDescription, siteTitle} from '@/utils/seoHelper'

const RawHTML = ({html}: any) => (
  <div className="credits" dangerouslySetInnerHTML={{__html: html}} />
)

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteTitle,
  url: BASE_URL.origin,
  description: siteDescription,
  logo: BASE_IMAGE_URL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'La Jolla',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  parentOrganization: {
    '@type': 'CollegeOrUniversity',
    name: 'University of California San Diego',
  },
  sameAs: [linkInstagram],
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const headerData = await getHeader()
  const footerData = await getFooter()

  return (
    <html lang="en">
      <Body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: jsonLdScript(organizationSchema)}}
        />
        <RawHTML
          html="<!-- ----------------------------------------------------- -->
        <!-- Code by MGTZM Studio, http://magatzem.studio (2026) -->
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
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <HeaderComponent data={headerData} />
            <div id="main-content" tabIndex={-1} style={{flexGrow: 1}}>
              {children}
            </div>

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

            <FooterComponent data={footerData} />
          </div>
        </WebProvider>
      </Body>
    </html>
  )
}

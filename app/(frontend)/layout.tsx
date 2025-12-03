import '../../styles/common/tailwind.css';
import "../../styles/main.scss";

import React, { Suspense } from 'react'; // adjust the path accordingly
import WebProvider from '../../context/webContext';
import HeaderComponent from '../../components/Common/HeaderComponent';
import FooterComponent from '../../components/Common/FooterComponent';

import NewsletterComponent from '@/components/Common/NewsletterComponent';

import CookieConsent from '@/components/Common/CookieConsent/CookieConsent';
import ConsentGate from '@/components/Common/Analytics/consentGate';

import Analytics from '@/components/Common/Analytics/google';
import FacebookPixel from '@/components/Common/Analytics/facebook';
import PinterestTag from '@/components/Common/Analytics/pinterest';
import Hotjar from '@/components/Common/Analytics/hotjar';


const RawHTML = ({ html }: any) => <div className="credits" dangerouslySetInnerHTML={{ __html: html }} />;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <RawHTML html="<!-- ----------------------------------------------------- -->
        <!-- Code by AMA, http://ama.work (2025) -->
        <!-- ----------------------------------------------------- -->" />
        <WebProvider>
          <HeaderComponent />

          {children}
          
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
        </WebProvider>
      </body>
    </html>
  )
}

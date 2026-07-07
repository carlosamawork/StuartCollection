const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 2592000, // 30 days = 24*60*60*30
    deviceSizes: [768, 1024, 1280, 1440, 2560], // Screens sizes
    imageSizes: [], // Prevents small image sizes from being generated
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    domains: ['localhost', 'cdn.sanity.io'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  async redirects() {
    // 301s from the legacy stuartcollection.ucsd.edu site (see its /sitemap.xml)
    // to the new URL structure. Specific rules first, catch-alls last.
    const artistToArtwork = {
      adams: 'the-wind-garden',
      allen: 'trees',
      asher: 'untitled',
      baldessari: 'read-write-think-dream',
      bradford: 'what-hath-god-wrought',
      'de-saint-phalle': 'sun-god',
      ferrara: 'terrace',
      finlay: 'unda',
      fleischner: 'la-jolla-project',
      hamilton: 'kahnop-to-tell-a-story',
      hawkinson: 'bear',
      hein: 'breathe-with-me',
      holzer: 'green-table',
      irwin: 'two-running-violet-v-forms',
      kruger: 'another',
      murray: 'red-shoe',
      nauman: 'vices-and-virtues',
      paik: 'something-pacific',
      'smith-a': 'snake-path',
      'smith-a2': 'same-old-paradise',
      'smith-k': 'standing',
      suh: 'fallen-star',
      wegman: 'la-jolla-vista-view',
    }

    return [
      ...Object.entries(artistToArtwork).map(([artist, artwork]) => ({
        source: `/artist/${artist}.html`,
        destination: `/collection/artwork/${artwork}/`,
        permanent: true,
      })),
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/sitemap.html', destination: '/', permanent: true },
      { source: '/artist/index.html', destination: '/collection/', permanent: true },
      { source: '/contact/index.html', destination: '/contact/', permanent: true },
      // Media — cada sección del PageComponent es una subpágina real
      { source: '/media/index.html', destination: '/media/', permanent: true },
      { source: '/media/photos.html', destination: '/media/high-res-photo/', permanent: true },
      { source: '/media/press.html', destination: '/media/press/', permanent: true },
      { source: '/media/videos.html', destination: '/media/videos/', permanent: true },
      { source: '/media/stuart-collection-brochure.html', destination: '/media/brochure/', permanent: true },
      { source: '/media/field-notes.html', destination: '/media/publications/', permanent: true },
      // Map (antiguo "Visit")
      { source: '/map/index.html', destination: '/visit/', permanent: true },
      { source: '/map/visit-fallen-star.html', destination: '/visit/visit-fallen-star/', permanent: true },
      { source: '/map/visit-via-trolley.html', destination: '/visit/visit-via-trolley/', permanent: true },
      { source: '/map/stuart-collection-public-programs.html', destination: '/visit/public-programs/', permanent: true },
      { source: '/map/digital-guide.html', destination: '/visit/bloomber-connects/', permanent: true },
      { source: '/map/inscape-audio-tour.html', destination: '/visit/inscape/', permanent: true },
      // About
      { source: '/about/index.html', destination: '/about/', permanent: true },
      { source: '/about/stuart-collection-staff.html', destination: '/about/stuart-collection-team/', permanent: true },
      { source: '/about/program-advisory-board.html', destination: '/about/program-advisory-board/', permanent: true },
      { source: '/about/international-advisory-board.html', destination: '/about/internation-advisory-board/', permanent: true },
      { source: '/about/membership.html', destination: '/support-us/', permanent: true },
      { source: '/_archive/index.html', destination: '/collection/', permanent: true },
      // Catch-alls for any legacy page not listed above
      { source: '/artist/:page.html', destination: '/collection/', permanent: true },
      { source: '/media/:page.html', destination: '/media/', permanent: true },
      { source: '/map/:page.html', destination: '/visit/', permanent: true },
      { source: '/about/:page.html', destination: '/about/', permanent: true },
      { source: '/_archive/:page.html', destination: '/collection/', permanent: true },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig

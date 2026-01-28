'use client'

import s from './IframeComponent.module.scss'

export default function IframeComponent({ data }: { data: any }) {
  const raw = (data?.iframe ?? '').trim()
  if (!raw) return null

  const wrapperClass = `${s.iframeWrapper} ${data?.width ? s[data.width] : ''}`

  const isUrl = /^https?:\/\//i.test(raw) || raw.startsWith('//')
  const src = raw.startsWith('//') ? `https:${raw}` : raw

  // 1) Caso URL
  if (isUrl) {
    return (
      <div className={wrapperClass}>
        <iframe
          src={src}
          title={data?.title ?? 'Embedded content'}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // 2) Caso HTML: aceptamos SOLO un iframe completo
  const isJustIframe = /^<iframe[\s\S]*<\/iframe>$/i.test(raw)
  if (!isJustIframe) return null

  // fuerza algunos atributos útiles (sin “validar” URLs)
  const withSandbox = raw.match(/\ssandbox\s*=/i)
    ? raw
    : raw.replace(/^<iframe/i, `<iframe sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"`)

  const withReferrerPolicy = withSandbox.match(/\sreferrerpolicy\s*=/i)
    ? withSandbox
    : withSandbox.replace(/^<iframe/i, `<iframe referrerpolicy="no-referrer-when-downgrade"`)

  return (
    <div className={wrapperClass}>
      <div dangerouslySetInnerHTML={{ __html: withReferrerPolicy }} />
    </div>
  )
}
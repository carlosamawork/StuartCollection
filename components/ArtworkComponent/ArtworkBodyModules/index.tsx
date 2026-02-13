'use client'

import {ArtworkData} from '@/components/ArtworkComponent'
import TextParagraphsComponent from '@/components/PageComponent/TextParagraphs'
import IframeComponent from '@/components/PageComponent/Iframe'
import AccordeonComponent from '@/components/PageComponent/Accordeon/AccordeonComponent'

export default function ArtworkBodyModules({modules}: {modules: ArtworkData['body_modules']}) {
  if (!modules) return <></>

  return modules.map((module: any, i: number) => {
    return (
      <div key={module.id || i}>
        {module._type === 'module.textParagraphs' && (
          <TextParagraphsComponent data={module} noMargin />
        )}
        {module._type === 'module.accordion' && <AccordeonComponent data={module} small />}
        {module._type === 'module.iframe' && <IframeComponent data={module} />}
      </div>
    )
  })
}

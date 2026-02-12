'use client'

import {ArtworkData} from '@/components/ArtworkComponent'
import s from './SpecsComponent.module.scss'
import Breadcrumbs from '@/components/Common/ui/Breadcrumbs'
import TextBody from '@/components/Common/ui/TextBody'
import {ButtonLink} from '@/components/Common/ui/Buttons/components/ButtonLink'
import Image from 'next/image'
import {Tags} from '@/components/Common/ui/Tags/Tags'
import {useEffect, useState} from 'react'

export default function SpecsComponent({data}: {data: ArtworkData}) {
  return (
    <aside className={s.specsComponent}>
      <Breadcrumbs
        breadcrumbs={[
          {label: 'Home', href: '/'},
          {label: 'The Collection', href: '/collection'},
        ]}
      />
      <div className={s.titleContainer}>
        <div className={s.artistContainer}>
          {data.artists.map((artist: any, i: number, array: any[]) => {
            return (
              <h1 className={`${s.artist}`} key={i}>
                {artist.name}
              </h1>
            )
          })}
        </div>
        <h1>{data.title}</h1>
      </div>
      <div className={s.specsDetails}>
        <div className={s.item}>
          <div className={s.label}>Year:</div>
          <div className={s.content}>{data.specs.year}</div>
        </div>
        <div className={s.item}>
          <div className={s.label}>Visit:</div>
          <div className={s.content}>
            <TextBody body={data.specs.visitDescription} size="sm" />
            <ButtonLink href="// TO-DO">Sign up to visit</ButtonLink>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.label}>Location:</div>
          <div className={s.content}>
            <p>{data.specs.location.name}</p>
            <a href="#visit" className={s.locationLink}>
              <strong>View on Map </strong>
              <Image
                src="/assets/svg/arrow-down.svg"
                alt="↓"
                width={11}
                height={11}
                style={{width: 11, height: 11}}
              />
            </a>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.label}>Themes:</div>
          <div className={s.content}>
            <Tags
              tags={data.specs.themes.map((theme, i) => ({
                label: theme.title,
              }))}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

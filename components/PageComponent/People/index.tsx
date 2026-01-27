'use client'
import LazyVideo from '@/components/Common/LazyVideo'
import s from './PeopleComponent.module.scss'
import LazyImage from '@/components/Common/LazyImage'
import {PortableText} from 'next-sanity'
import {portableBodyComponents} from '@/utils/portableTextParagraphs'
import Link from 'next/link'
import VideoEmbed from '@/components/Common/VideoEmbed'
import {useEffect, useRef, useState} from 'react'

export default function PeopleComponent({data}: {data: any}) {
  const [activePerson, setActivePerson] = useState<any | null>(null)
    const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (activePerson && modalRef.current) {
        modalRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        })
    } 
    }, [activePerson])

  return (
    <>
      {activePerson && (
        <div className={s.personDetailModal} ref={modalRef}>
          <div className={s.modalContent}>
            <button className={s.closeButton} onClick={() => setActivePerson(null)}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6667 1.175L10.4917 0L5.83333 4.65833L1.175 0L0 1.175L4.65833 5.83333L0 10.4917L1.175 11.6667L5.83333 7.00833L10.4917 11.6667L11.6667 10.4917L7.00833 5.83333L11.6667 1.175Z"
                  fill="#272728"
                />
              </svg>
            </button>
            <div className={s.personDetail}>
                <div className={s.personDetailHeader}>
                    <div className={s.personDetailText}>
                        {activePerson.name && <h2 className={s.personDetailName}>{activePerson.name}</h2>}
                        {activePerson.role && <p className={s.personDetailRole}>{activePerson.role}</p>}
                    </div>
                    {activePerson.featuredImage && (
                    <div className={s.personDetailImage}>
                        <LazyImage
                        src={activePerson.featuredImage.imageUrl}
                        alt={activePerson.featuredImage.filename || activePerson.name || 'Person Image'}
                        width={activePerson.featuredImage.metadata.dimensions.width}
                        height={activePerson.featuredImage.metadata.dimensions.height}
                        fill={true}
                        objectFit="cover"
                        />
                    </div>
                )}
                </div>
                <div className={s.personDetailInfo}>
                    {activePerson.body &&
                    activePerson.body.map((textRow: any, index: number) => {
                        return (
                        <PortableText
                            key={textRow._key}
                            value={[textRow]}
                            components={portableBodyComponents()}
                        />
                        )
                    })}
                </div>
            </div>
          </div>
        </div>
      )}
      <div className={`${s.people}`}>
        {data.listOfPeople &&
          data.listOfPeople.map((person: any, index: number) => (
            <div key={index} className={`${s.personCard} ${activePerson === person ? s.active : ''}`} onClick={() =>  activePerson === person ? setActivePerson(null) : setActivePerson(person)}>
              {person.featuredImage && (
                <div className={s.personImage}>
                  <LazyImage
                    src={person.featuredImage.imageUrl}
                    alt={person.featuredImage.filename || person.name || 'Person Image'}
                    width={person.featuredImage.metadata.dimensions.width}
                    height={person.featuredImage.metadata.dimensions.height}
                    fill={true}
                    objectFit="cover"
                  />
                </div>
              )}
              <div className={s.personInfo}>
                <div className={s.personNameRole} >
                {person.name && <h3 className={s.personName}>{person.name}</h3>}
                {activePerson === person && 
                <button className={s.closeButton}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M11.6667 1.175L10.4917 0L5.83333 4.65833L1.175 0L0 1.175L4.65833 5.83333L0 10.4917L1.175 11.6667L5.83333 7.00833L10.4917 11.6667L11.6667 10.4917L7.00833 5.83333L11.6667 1.175Z"
                        fill="#272728"
                        />
                    </svg>
                </button>}
                </div>
                {person.role && <p className={s.personRole}>{person.role}</p>}
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

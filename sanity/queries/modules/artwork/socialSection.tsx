import {image} from '../../fragments/image'

export const socialSectionQuery = `
    title,
    description,
    links[]{
        label,
        href
    },
    items[]{
        caption,
        href,
        image{
            ${image}
        },
    } 
`

export type ArtworkSocialSectionData = {
  title: string
  description: any
  links: {
    label: string
    href: string
  }[]
  items: {
    caption: string
    href: string
    image: any
  }[]
}

import {image} from '../../fragments/image'

export const imagesSectionQuery = `
    title,
    items[]{
        ${image}
    }
`

export type ArtworkImagesSectionData = {
  title: string
  items: any[]
}

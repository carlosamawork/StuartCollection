import {image} from '../../fragments/image'

export const socialQuery = `
    title,
    description,
    links[]{
        type,
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

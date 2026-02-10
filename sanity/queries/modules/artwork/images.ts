import {image} from '../../fragments/image'

export const imagesQuery = `
    title,
    images[]{
        ${image}
    }
`

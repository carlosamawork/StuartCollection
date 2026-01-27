import { image } from "../../fragments/image";

export const imageQuery = `
    image{
        ${image}
    },
    caption,
    enableLightbox
`
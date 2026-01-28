import { image } from "../../fragments/image";

export const videoQuery = `
    type,
    image{
        ${image}
    },
    title,
    videoUrl,
    width
`
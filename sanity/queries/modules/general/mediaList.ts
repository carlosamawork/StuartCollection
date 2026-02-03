import { image } from "../../fragments/image";

export const mediaListQuery = `
    title,
    columns,
    items[]{
        type,
        width,
        title,
        image{
            ${image}
        },
        videoUrl  
    },
`;
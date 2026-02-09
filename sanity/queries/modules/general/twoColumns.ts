import { image } from "../../fragments/image";

export const twoColumnsQuery = `
    title,
    imageSide,
    textAlignY,
    image{
        ${image}
    },
    body
`;
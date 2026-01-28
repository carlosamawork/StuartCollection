import { image } from "../../fragments/image";

export const tileGroupQuery = `
    title,
    layout,
    tiles[]{
      image{
        ${image}
        },
        title,
        subtitle,
        link,
        newWindow
    },
    columns
`;
import { calloutQuery } from "./callout";
import { imageQuery } from "./image";
import { textParagraphsQuery } from "./textParagraphs";

export const jumbotronQuery = `
    title,
    body[]{
        ...,
        _type == "module.textParagraphs" => {
            ${textParagraphsQuery}
        },
        _type == "module.callout" => {
            ${calloutQuery}
        },
        _type == "module.image" => {
            ${imageQuery}
        },
    },
    size,
    color
`;
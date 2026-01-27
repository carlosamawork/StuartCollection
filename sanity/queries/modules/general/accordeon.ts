import jumbotron from "@/sanity/schemas/objects/module/general/jumbotron";
import { calloutQuery } from "./callout";
import { imageQuery } from "./image";
import { separatorQuery } from "./separator";
import { textParagraphsQuery } from "./textParagraphs";
import { textTitlesQuery } from "./textTitles";
import { jumbotronQuery } from "./jumbotron";

export const accordeonQuery = `
    fullWidth,
    items[]{
        label,
        content[]{
            ...,
            _type == "module.image" => {
                ${imageQuery}
            },
            _type == "module.textParagraphs" => {
                ${textParagraphsQuery}
            },
            _type == "module.textTitles" => {
                ${textTitlesQuery}
            },
            _type == "module.separator" => {
                ${separatorQuery}
            },
            _type == "module.callout" => {
                ${calloutQuery}
            },
            _type == "module.jumbotron" => {
                ${jumbotronQuery}
            },
        }
    },
    options{
        allowMultipleOpen,
        openfirst
    }
`
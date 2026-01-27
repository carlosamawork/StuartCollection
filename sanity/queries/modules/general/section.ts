import section from "@/sanity/schemas/objects/module/general/section"
import { image } from "../../fragments/image"
import { textParagraphsQuery } from "./textParagraphs"
import { textTitlesQuery } from "./textTitles"
import { separatorQuery } from "./separator"
import { calloutQuery } from "./callout"
import { imageQuery } from "./image"
import jumbotron from "@/sanity/schemas/objects/module/general/jumbotron"
import { jumbotronQuery } from "./jumbotron"
import { accordeonQuery } from "./accordeon"
import { peopleQuery } from "./people"

export const sectionQuery = `
    title,
    id,
    topImage{
        ${image}
    },
    defaultOpen,
    modules[]{
        ...,
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
        _type == "module.image" => {
            ${imageQuery}
        },
        _type == "module.jumbotron" => {
            ${jumbotronQuery}
        },
        _type == "module.accordion" => {
            ${accordeonQuery}
        },
        _type == "module.people" => {
            ${peopleQuery}
        },

    }
`
import section from "@/sanity/schemas/objects/module/general/section"
import { image } from "../../fragments/image"
import { textParagraphsQuery } from "./textParagraphs"
import { textTitlesQuery } from "./textTitles"
import { separatorQuery } from "./separator"
import { calloutQuery } from "./callout"
import { imageQuery } from "./image"
import { jumbotronQuery } from "./jumbotron"
import { accordeonQuery } from "./accordeon"
import { peopleQuery } from "./people"
import { tileGroupQuery } from "./tileGroup"
import { videoQuery } from "./video"
import { iframQuery } from "./iframe"
import { twoColumnsQuery } from "./twoColumns"
import { sliderQuery } from "./slider"
import { mediaListQuery } from "./mediaList"
import { tabsQuery } from "./tabs"

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
        _type == "module.tileGroup" => {
            ${tileGroupQuery}
        },
        _type == "module.video" => {
            ${videoQuery}
        },
        _type == "module.iframe" => {
            ${iframQuery}
        },
        _type == "module.twoColumns" => {
            ${twoColumnsQuery}
        },
        _type == "module.slider" => {
            ${sliderQuery}
        },
        _type == "module.mediaList" => {
            ${mediaListQuery}
        },
        _type == "module.tabs" => {
            ${tabsQuery}
        },
        // 👇 aquí metes TODOS los módulos que quieras permitir dentro de una sección
    }
`
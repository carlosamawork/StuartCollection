import { image } from "../../fragments/image";
import { accordeonQuery } from "./accordeon";
import { calloutQuery } from "./callout";
import { iframQuery } from "./iframe";
import { imageQuery } from "./image";
import { jumbotronQuery } from "./jumbotron";
import { mediaListQuery } from "./mediaList";
import { peopleQuery } from "./people";
import { separatorQuery } from "./separator";
import { sliderQuery } from "./slider";
import { textParagraphsQuery } from "./textParagraphs";
import { textTitlesQuery } from "./textTitles";
import { tileGroupQuery } from "./tileGroup";
import { twoColumnsQuery } from "./twoColumns";
import { videoQuery } from "./video";

export const tabsQuery = `
  title,
  "tabs": tabs[]{
    label,
    imageTab{
      ${image}
    },
    "content": content[]{
        _type,
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
    }
  }

`
    